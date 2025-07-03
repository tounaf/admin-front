import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

interface Offerings {
  id: number;
  type: string;
  quantities: { [key: string]: number };
  total: number;
}

@Component({
  selector: 'app-offering',
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './offering.html',
  styleUrl: './offering.scss'
})
export class Offering implements OnInit {
  offerings: Offerings[] = [];
  error: string | null = null;
  displayedColumns: string[] = ['type', 'quantities', 'total'];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('Offering component initialized');
    this.fetchOfferings();
  }

  fetchOfferings(): void {
    const apiUrl = 'http://localhost:8000/api/offerings';
    this.http
      .get<Offerings[]>(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer your_token_here' // Uncomment and add token if required
        },
      })
      .subscribe({
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
}