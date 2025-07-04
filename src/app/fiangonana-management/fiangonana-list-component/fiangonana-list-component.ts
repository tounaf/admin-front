import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../http-client/api-service';

interface Fiangonana {
  id?: number;
  nom: string;
  adresse?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
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
    RouterModule
  ],
  templateUrl: './fiangonana-list-component.html',
  styleUrls: ['./fiangonana-list-component.scss']
})
export class FiangonanaListComponent implements OnInit {
  fiangonanas: Fiangonana[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['nom', 'adresse', 'latitude', 'longitude', 'createdAt', 'actions'];

  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchFiangonanas();
  }

  fetchFiangonanas(): void {
    const apiUrl = 'fiangonanas';
    this.apiService.get<Fiangonana[]>(apiUrl).subscribe({
      next: (data) => {
        this.fiangonanas = data;
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