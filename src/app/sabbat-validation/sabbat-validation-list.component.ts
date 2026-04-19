import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../http-client/api-service';
import { HydraCollection } from '../type/hydra-collection';

@Component({
  selector: 'app-sabbat-validation-list',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, 
    MatDividerModule, MatFormFieldModule, MatSelectModule
  ],
  templateUrl: './sabbat-validation-list.component.html',
  styleUrls: ['./sabbat-validation-list.component.scss']
})
export class SabbatValidationListComponent implements OnInit {
  validations: any[] = [];
  fiangonanas: any[] = [];
  private readonly BASE_UPLOAD_URL = 'https://fva-vitaonyasany.mg/admin-api/public/uploads';

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadFiangonanas();
    this.loadValidations();
  }

  loadFiangonanas(): void {
    this.apiService.get<HydraCollection<any>>('fiangonanas').subscribe(data => {
      this.fiangonanas = data['member'] || [];
      this.cdr.detectChanges();
    });
  }

  loadValidations(fiangonanaId: number | null = null): void {
    let url = 'sabbat_validations?order[dateSabbat]=desc';
    if (fiangonanaId) {
      url += `&fiangonana=${fiangonanaId}`;
    }

    this.apiService.get<HydraCollection<any>>(url).subscribe(data => {
      this.validations = data['member'] || [];
      this.cdr.detectChanges();
    });
  }

  onFilterChange(fiangonanaId: number | null): void {
    this.loadValidations(fiangonanaId);
  }

  openBordereau(validation: any): void {
    window.open(`${this.BASE_UPLOAD_URL}${validation.imageName}`, '_blank');
  }

  validate(validation: any): void {
    if (confirm(`Confirmer la validation pour l'église ${validation.fiangonana?.nom} ?`)) {
      this.apiService.patch(`sabbat_validations/${validation.id}`, { status: 'VALIDATED' }).subscribe(() => {
        validation.status = 'VALIDATED';
        this.cdr.detectChanges();
      });
    }
  }
}