import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CardMetric } from '../shared/card-metric/card-metric';
import { SalesMetricResponse } from '../../../domain/interfaces/sales-metric.interface';
import { GetSalesMetricsUseCase } from '../../../application/use-case/get-sales-metrics.usecase';

@Component({
  selector: 'app-sales-metrics',
  imports: [CardMetric],
  templateUrl: './sales-metrics.html',
  styleUrl: './sales-metrics.scss',
})
export class SalesMetrics implements AfterViewInit {
  private readonly getStatsUseCase = inject(GetSalesMetricsUseCase);
  protected readonly stats = signal<SalesMetricResponse[]>([]);

  ngAfterViewInit(): void {
    this.getStatsUseCase.execute().subscribe({
      next: (stats) => this.stats.set(stats),
      error: (error) => console.error(error),
    });
  }
}
