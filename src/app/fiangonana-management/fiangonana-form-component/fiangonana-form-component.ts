import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
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
  selector: 'app-fiangonana-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './fiangonana-form-component.html',
  styleUrls: ['./fiangonana-form-component.scss']
})
export class FiangonanaFormComponent implements OnInit {
  fiangonanaForm: FormGroup;
  error: string | null = null;
  isEditMode = false;
  fiangonanaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.fiangonanaForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
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

  fetchFiangonana(id: number): void {
    const apiUrl = `fiangonanas/${id}`;
    this.apiService.get<Fiangonana>(apiUrl).subscribe({
      next: (data) => {
        this.fiangonanaForm.patchValue({
          nom: data.nom,
          adresse: data.adresse,
          latitude: data.latitude,
          longitude: data.longitude
        });
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
      ? this.apiService.patch<Fiangonana>(apiUrl, fiangonana)
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