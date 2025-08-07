import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../http-client/api-service';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';


interface Fiangonana {
  id?: number;
  nom: string;
  code: string;
  adresse?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface HydraCollection<T> {
  'member': T[];
  'totalItems'?: number;
}

@Component({
  selector: 'app-fiangonana-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    LeafletModule
  ],
  templateUrl: './fiangonana-list-component.html',
  styleUrls: ['./fiangonana-list-component.scss']
})
export class FiangonanaListComponent implements OnInit {
  fiangonanas: Fiangonana[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['nom', 'adresse', 'latitude', 'longitude', 'createdAt', 'actions'];
  totalItems: number = 0;

  map: L.Map | null = null;

  baseLayers: { [name: string]: L.TileLayer } = {
    'Plan (OSM)': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }),
    'Satellite (Esri)': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    })
  };


  options: L.MapOptions = {
    center: L.latLng(-18.8792, 47.5079),
    zoom: 6,
    layers: [ // Default layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      })
    ]
  };

  layers: L.Layer[] = [];

  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchFiangonanas();
  }

  onGeocoder() {
    if (!this.map) return;

    // Ajouter le contrôle de géocodage
    (L.Control as any).geocoder({
      defaultMarkGeocode: true
    })
    .on('markgeocode', (e: any) => {
    const bbox = e.geocode.bbox;
    const poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]);
    this.map!.fitBounds(poly.getBounds());
    })
    .addTo(this.map);
  }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.refreshMapMarkers();
    this.onGeocoder();
  }

  refreshMapMarkers(): void {
    const markers = this.fiangonanas
      .filter(f => f.latitude !== undefined && f.longitude !== undefined)
      .map(f => {
        const marker = L.marker([f.latitude!, f.longitude!])
          .bindPopup(`<b>${f.nom}</b><br>${f.adresse ?? ''}`);
        marker.options.icon = L.icon({
            iconUrl: 'assets/leaflet/marker-icon.png',
            iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowUrl: 'assets/leaflet/marker-shadow.png',
            shadowSize: [41, 41],
            shadowAnchor: [12, 41],
            popupAnchor: [12, 41],
            tooltipAnchor: [16, -28],
          });
        return marker;
      });

    this.layers = [...markers];

    if (this.map && markers.length > 0) {
      const group = L.featureGroup(markers);
      this.map.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
  }

  fetchFiangonanas(): void {
    const apiUrl = 'fiangonanas';
    this.apiService.get<HydraCollection<Fiangonana>>(apiUrl).subscribe({
      next: (response) => {
        this.fiangonanas = response['member'] || [];
        this.totalItems = response['totalItems'] ?? this.fiangonanas.length;
        this.refreshMapMarkers();
        this.error = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des données: ' + err.message;
        this.cdr.detectChanges();
      }
    });
  }

  deleteFiangonana(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette fiangonana ?')) {
      const apiUrl = `fiangonanas/${id}`;
      this.apiService.delete(apiUrl).subscribe({
        next: () => {
          this.fiangonanas = this.fiangonanas.filter(f => f.id !== id);
          this.refreshMapMarkers();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression: ' + err.message;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
