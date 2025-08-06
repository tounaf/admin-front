import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../http-client/api-service';
import { LeafletModule } from '@bluehalo/ngx-leaflet';

import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

@Component({
  selector: 'app-fiangonana-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    LeafletModule
  ],
  templateUrl: './fiangonana-form-component.html',
  styleUrls: ['./fiangonana-form-component.scss']
})
export class FiangonanaFormComponent implements OnInit {
  fiangonanaForm: FormGroup;
  error: string | null = null;
  isEditMode = false;
  fiangonanaId: number | null = null;

  baseLayers: { [name: string]: L.TileLayer } = {
    'Plan (OSM)': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }),
    'Satellite (Esri)': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    }),
    'Plan Rue (OpenTopoMap)': L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
    })
  };

  options: L.MapOptions = {
    center: L.latLng(-18.8792, 47.5079), // Exemple : Antananarivo
    zoom: 6,
    layers: [this.baseLayers['Plan (OSM)']] // couche par défaut
  };

  marker: L.Marker = L.marker([-18.8792, 47.5079], { draggable: true });

  layers: L.Layer[] = [this.baseLayers['Plan (OSM)'], this.marker];
  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.fiangonanaForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      code: ['', [Validators.required, Validators.maxLength(20)]],
      adresse: ['', [Validators.maxLength(255)]],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.fiangonanaId = +id;
        this.fetchFiangonana(this.fiangonanaId);
      }
    });
  }

  onMapReady(map: L.Map): void {
      // Synchroniser position marker avec formulaire
      this.marker.on('dragend', () => {
        const position = this.marker.getLatLng();
        this.fiangonanaForm.patchValue({
          latitude: position.lat,
          longitude: position.lng
        });
      });

      // Positionner le marker si latitude/longitude disponibles
      const lat = this.fiangonanaForm.get('latitude')?.value;
      const lng = this.fiangonanaForm.get('longitude')?.value;
      if (lat !== null && lng !== null) {
        this.marker.setLatLng([lat, lng]);
        map.setView([lat, lng], 10);
      }
  }

  fetchFiangonana(id: number): void {
    const apiUrl = `fiangonanas/${id}`;
    this.apiService.get<Fiangonana>(apiUrl).subscribe({
      next: (data) => {
        this.fiangonanaForm.patchValue({
          nom: data.nom,
          code: data.code,
          adresse: data.adresse,
          latitude: data.latitude,
          longitude: data.longitude
        });

        // Déplacer le marker sur la carte si données présentes
        if (this.marker && data.latitude !== undefined && data.longitude !== undefined) {
          this.marker.setLatLng([data.latitude, data.longitude]);
          // Optionnel: recentrer la carte ici si nécessaire
        }
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des données: ' + err.message;
      }
    });
  }

  onSubmit(): void {
    if (this.fiangonanaForm.invalid) {
      return;
    }

    const fiangonana: Fiangonana = {
      nom: this.fiangonanaForm.value.nom,
      code: this.fiangonanaForm.value.code,
      adresse: this.fiangonanaForm.value.adresse || null,
      latitude: this.fiangonanaForm.value.latitude || null,
      longitude: this.fiangonanaForm.value.longitude || null,
      createdAt: this.isEditMode ? undefined : new Date().toISOString(),
      updatedAt: this.isEditMode ? new Date().toISOString() : undefined
    };

    const apiUrl = this.isEditMode
      ? `fiangonanas/${this.fiangonanaId}`
      : 'fiangonanas';

    const request = this.isEditMode
      ? this.apiService.put<Fiangonana>(apiUrl, fiangonana)
      : this.apiService.post<Fiangonana>(apiUrl, fiangonana);

    request.subscribe({
      next: () => {
        this.router.navigate(['/fiangonanas']);
      },
      error: (err) => {
        this.error = 'Erreur lors de la sauvegarde: ' + err.message;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fiangonanas']);
  }
}