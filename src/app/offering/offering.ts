import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../http-client/api-service';

interface Offerings {
  id: number;
  type: string;
  quantities: { [key: string]: number };
  total: number;
  date: string;
  fiangonana: { id: number; nom: string };
}

interface Fiangonana {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-offering',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './offering.html',
  styleUrl: './offering.scss',
})
export class Offering implements OnInit {
  offerings: Offerings[] = [];
  fiangonanas: Fiangonana[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['type', 'quantities', 'total', 'date', 'fiangonana'];
  searchForm: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    // Initialiser le formulaire de recherche
    this.searchForm = this.fb.group({
      fiangonanaIds: [[]], // Champ pour le select multiple
    });
  }

  ngOnInit(): void {
    console.log('Offering component initialized');
    this.fetchFiangonanas();
    this.fetchOfferings();
  }

  fetchFiangonanas(): void {
    this.apiService.get<Fiangonana[]>('fiangonanas').subscribe({
      next: (data) => {
        console.log(data);
        this.fiangonanas = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des fiangonanas: ' + err.message;
        this.cdr.detectChanges();
      },
    });
  }

  fetchOfferings(fiangonanaIds: number[] = []): void {
    let apiUrl = 'offerings';
    if (fiangonanaIds.length > 0) {
      const queryParams = fiangonanaIds.map((id) => `fiangonana[]=${id}`).join('&');
      apiUrl = `offerings?${queryParams}`;
    }
    this.apiService.get<Offerings[]>(apiUrl).subscribe({
      next: (data) => {
        this.offerings = data;
        this.error = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des données: ' + err.message;
        this.cdr.detectChanges();
      },
    });
  }

  getQuantities(quantities: { [key: string]: number }): [string, number][] {
    return Object.entries(quantities).filter(([_, count]) => count > 0);
  }

  onSearch(): void {
    const fiangonanaIds = this.searchForm.get('fiangonanaIds')?.value || [];
    this.fetchOfferings(fiangonanaIds);
  }

  resetSearch(): void {
    this.searchForm.reset({ fiangonanaIds: [] });
    this.fetchOfferings();
  }
}