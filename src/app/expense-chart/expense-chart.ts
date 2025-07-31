import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, catchError, finalize, map } from 'rxjs';
import { ApiService } from '../http-client/api-service';

interface ExpenseTotal {
  fiangonanaName: string;
  totalAmount: number;
}

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    BaseChartDirective
  ],
  templateUrl: './expense-chart.html',
  styleUrl: './expense-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseChart implements OnInit {
  isLoading = false;
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            return `${context.label}: ${value.toLocaleString('fr-MG', {
              style: 'currency',
              currency: 'MGA',
              minimumFractionDigits: 0
            })}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fiangonana',
          color: '#333'
        },
        ticks: {
          color: '#333'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Dépenses (MGA)',
          color: '#333'
        },
        ticks: {
          color: '#333',
          callback: (value) => Number(value).toLocaleString('fr-MG', { minimumFractionDigits: 0 })
        }
      }
    }
  };

  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private apiService = inject(ApiService);

  private colors = ['#e53935', '#fb8c00', '#43a047', '#1e88e5', '#8e24aa'];

  ngOnInit(): void {
    this.fetchExpenses();
  }

  private fetchExpenses(): void {
    this.isLoading = true;
    this.apiService.get<ExpenseTotal[]>('expense_total_by_fiangonanas')
      .pipe(
        map(data => this.formatChartData(data)),
        catchError(error => {
          this.snackBar.open('Erreur lors du chargement des dépenses', 'Fermer', { duration: 5000 });
          return of({ labels: [], datasets: [] });
        }),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe(chartData => {
        this.chartData = chartData;
      });
  }

  private formatChartData(data: ExpenseTotal[]): ChartData<'bar'> {
    const labels = data.map(item => item.fiangonanaName);
    const values = data.map(item => item.totalAmount);
    return {
      labels,
      datasets: [
        {
          label: 'Total Dépenses',
          data: values,
          backgroundColor: this.colors,
          borderColor: this.colors,
          borderWidth: 1
        }
      ]
    };
  }
}

