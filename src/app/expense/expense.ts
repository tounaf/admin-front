import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../http-client/api-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface Expenses {
  id?: number;
  amount: string;
  description: string;
  dateSabbat?: string;
}

interface Fiangonana {
  id: number;
  nom: string;
}

interface HydraCollection<T> {
  'member': T[];
  'totalItems'?: number;
}

@Component({
  selector: 'app-fiangonana-list',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './expense.html',
  styleUrls: ['./expense.scss']
})
export class Expense implements OnInit {
  expenses: Expenses[] = [];
  fiangonanas: Fiangonana[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['amount', 'description', 'dateSabbat', 'fiangonana'];
  totalItems: number = 0;
  searchForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService, private fb: FormBuilder) 
  {
        this.searchForm = this.fb.group({
                            fiangonanaIds: [[]],
                            dateDebut: [null],
                            dateFin: [null],
                          });
  }

  ngOnInit(): void {
    this.fetchExpenses();
    this.fetchFiangonanas();
  }

  fetchFiangonanas(): void {
      this.apiService.get<HydraCollection<Fiangonana>>('fiangonanas').subscribe({
        next: (data) => {
          this.fiangonanas = data['member'] || [];
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Erreur lors de la récupération des fiangonanas: ' + err.message;
          this.cdr.detectChanges();
        },
      });
  }

  fetchExpenses(fiangonanaIds: number[] = [], dateDebut?: string, dateFin?: string): void {
    let queryParams: string[] = [];

    if (fiangonanaIds.length > 0) {
      queryParams.push(...fiangonanaIds.map(id => `fiangonana[]=${id}`));
    }

    if (dateDebut) {
      queryParams.push(`dateSabbat[after]=${dateDebut}`);
    }

    if (dateFin) {
      queryParams.push(`dateSabbat[before]=${dateFin}`);
    }

    const apiUrl = queryParams.length > 0 ? `expenses?${queryParams.join('&')}` : 'expenses';
    this.apiService.get<HydraCollection<Expenses>>(apiUrl).subscribe({
      next: (response) => {
        this.expenses = response['member'] || [];
        this.totalItems = response['totalItems'] ?? this.expenses.length;
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
          this.expenses = this.expenses.filter(f => f.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Erreur lors de la suppression: ' + err.message;
          this.cdr.detectChanges();
        }
      });
    }
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

    this.fetchExpenses(fiangonanaIds, dateDebut, dateFin);
  }


  resetSearch(): void {
    this.searchForm.reset({ fiangonanaIds: [] });
    this.fetchExpenses();
  }

  private formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // mois = 0-11
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}