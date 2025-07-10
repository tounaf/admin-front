import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../http-client/api-service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    // BrowserAnimationsModule
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
    this.searchForm = this.fb.group({
      fiangonanaIds: [[]],
      dateDebut: [null],
      dateFin: [null],
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
        this.fiangonanas = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des fiangonanas: ' + err.message;
        this.cdr.detectChanges();
      },
    });
  }

  fetchOfferings(fiangonanaIds: number[] = [], dateDebut?: string, dateFin?: string): void {
    let queryParams: string[] = [];

    if (fiangonanaIds.length > 0) {
      queryParams.push(...fiangonanaIds.map(id => `fiangonana[]=${id}`));
    }

    if (dateDebut) {
      queryParams.push(`date[after]=${dateDebut}`);
    }

    if (dateFin) {
      queryParams.push(`date[before]=${dateFin}`);
    }

    const apiUrl = queryParams.length > 0 ? `offerings?${queryParams.join('&')}` : 'offerings';

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
    const formValue = this.searchForm.value;
    const fiangonanaIds = formValue.fiangonanaIds || [];
    const dateDebut = formValue.dateDebut
      ? this.formatDateToYMD(formValue.dateDebut)
      : undefined;

    const dateFin = formValue.dateFin
      ? this.formatDateToYMD(formValue.dateFin)
      : undefined;

    this.fetchOfferings(fiangonanaIds, dateDebut, dateFin);
  }


  resetSearch(): void {
    this.searchForm.reset({ fiangonanaIds: [] });
    this.fetchOfferings();
  }

  private formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // mois = 0-11
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}