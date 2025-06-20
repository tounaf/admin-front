import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Fiangonana {
  id: number;
  nom: string;
  adresse: string;
  latitude: number | null;
  longitude: number | null;
}

interface ApiResponse {
  'hydra:member': Fiangonana[];
}

@Component({
  selector: 'app-fiangonana-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './fiangonana-management.html',
  styleUrl: './fiangonana-management.scss'
})
export class FiangonanaManagement implements OnInit {
  displayedColumns: string[] = ['id', 'nom', 'adresse', 'latitude', 'longitude', 'actions'];
  dataSource = new MatTableDataSource<Fiangonana>();
  fiangonanaForm: FormGroup;
  isEditMode = false;
  selectedFiangonana: Fiangonana | null = null;
  filterValue: string = '';

  private apiUrl = 'http://localhost:8000/api/fiangonanas';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.fiangonanaForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(255)]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      latitude: [null, [Validators.min(-90), Validators.max(90)]],
      longitude: [null, [Validators.min(-180), Validators.max(180)]]
    });
  }

  ngOnInit(): void {
    this.loadFiangonanas();
  }

  loadFiangonanas(): void {
    this.http.get<ApiResponse>(this.apiUrl).subscribe({
      next: (data) => {
        this.dataSource.data = data['hydra:member'] || [];
        this.applyFilter(this.filterValue);
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des Fiangonana', 'Fermer', { duration: 3000 });
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
    this.dataSource.filterPredicate = (data: Fiangonana, filter: string) => {
      return data.nom.toLowerCase().includes(filter) || 
             data.adresse.toLowerCase().includes(filter);
    };
  }

  onSubmit(): void {
    if (this.fiangonanaForm.valid) {
      const fiangonanaData = this.fiangonanaForm.value;
      if (this.isEditMode && this.selectedFiangonana) {
        this.http.put(`${this.apiUrl}/${this.selectedFiangonana.id}`, fiangonanaData).subscribe({
          next: () => {
            this.loadFiangonanas();
            this.resetForm();
            this.snackBar.open('Fiangonana mis à jour avec succès', 'Fermer', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', { duration: 3000 });
          }
        });
      } else {
        this.http.post(this.apiUrl, fiangonanaData).subscribe({
          next: () => {
            this.loadFiangonanas();
            this.resetForm();
            this.snackBar.open('Fiangonana ajouté avec succès', 'Fermer', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 3000 });
          }
        });
      }
    }
  }

  editFiangonana(fiangonana: Fiangonana): void {
    this.isEditMode = true;
    this.selectedFiangonana = fiangonana;
    this.fiangonanaForm.patchValue(fiangonana);
  }

  deleteFiangonana(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette Fiangonana ?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.loadFiangonanas();
          this.snackBar.open('Fiangonana supprimé avec succès', 'Fermer', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.fiangonanaForm.reset();
    this.isEditMode = false;
    this.selectedFiangonana = null;
  }
}