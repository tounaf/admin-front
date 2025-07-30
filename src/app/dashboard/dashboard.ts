import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { of, catchError, finalize, map } from 'rxjs';
import { ApiService } from '../http-client/api-service';


interface OfferingTotal {
  fiangonanaName: string;
  totalOffering: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [    
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BaseChartDirective
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  isLoading = false;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 500 // Reduced animation duration for faster rendering
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif"
          },
          color: '#333'
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${value.toLocaleString('fr-MG', { style: 'currency', currency: 'MGA', minimumFractionDigits: 0 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#333',
          font: {
            size: 14,
            family: "'Roboto', sans-serif"
          }
        },
        ticks: {
          color: '#333'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Offering (MGA)',
          color: '#333',
          font: {
            size: 14,
            family: "'Roboto', sans-serif"
          }
        },
        ticks: {
          color: '#333',
          callback: (value) => Number(value).toLocaleString('fr-MG', { minimumFractionDigits: 0 })
        }
      }
    }
  };

  private colors = [
    '#3f51b5', // Indigo
    '#e91e63', // Pink
    '#009688', // Teal
    '#ff9800', // Orange
    '#4caf50'  // Green
  ];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchOfferings();
  }

  fetchOfferings(): void {
    this.isLoading = true;
    const apiUrl = 'offering_total_by_fiangonanas';
    this.apiService.get<OfferingTotal[]>(apiUrl)
            .pipe(
              map(data => this.processChartData(data)),
              catchError(error => {
                this.snackBar.open('Error fetching offerings: ' + error.message, 'Close', { duration: 5000 });
                return of({
                  labels: [],
                  datasets: []
                } as ChartData<'bar'>);
              }),
              finalize(() => {
                this.isLoading = false;
                this.cdr.markForCheck(); // OK avec OnPush
              })
            )
            .subscribe(chartData => {
              this.chartData = chartData;
              console.log('when is load');
              console.log('cdr:', this.cdr);
              if (!this.cdr) {
                console.warn('ChangeDetectorRef is undefined!');
                return;
              }
              // this.cdr.detectChanges();
            });

  }

  private processChartData(data: OfferingTotal[]): ChartData<'bar'> {
    // Create a map for faster lookup
    const dateMap = new Map<string, Map<string, number>>();
    
    // Group data by date and fiangonanaName
    data.forEach(item => {
      if (!dateMap.has(item.date)) {
        dateMap.set(item.date, new Map<string, number>());
      }
      dateMap.get(item.date)!.set(item.fiangonanaName, item.totalOffering);
    });

    // Get unique dates and fiangonanaNames
    const dates = [...dateMap.keys()].sort();
    const fiangonanaNames = [...new Set(data.map(item => item.fiangonanaName))];

    // Create datasets
    const datasets = fiangonanaNames.map((fiangonana, index) => ({
      label: fiangonana,
      data: dates.map(date => dateMap.get(date)?.get(fiangonana) || 0),
      backgroundColor: this.colors[index % this.colors.length],
      borderColor: this.colors[index % this.colors.length],
      borderWidth: 1
    }));
    return {
      labels: dates,
      datasets
    };
  }
}