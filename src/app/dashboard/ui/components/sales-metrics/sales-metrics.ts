import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CardMetric } from '../shared/card-metric/card-metric';
import { SalesMetricResponse } from '../../../domain/interfaces/sales-metric.interface';
import { GetStatsUseCase } from '../../../application/use-case/get-stats.usecase';

@Component({
  selector: 'app-sales-metrics',
  imports: [CardMetric],
  templateUrl: './sales-metrics.html',
  styleUrl: './sales-metrics.scss',
})
export class SalesMetrics implements AfterViewInit {
  private readonly getStatsUseCase = inject(GetStatsUseCase);
  protected readonly stats = signal<SalesMetricResponse[]>([]);

  ngAfterViewInit(): void {
    this.getStatsUseCase.execute().subscribe({
      next: (stats) => this.stats.set(stats),
      error: (error) => console.error(error),
    });
  }
}
