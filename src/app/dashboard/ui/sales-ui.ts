import { Component, signal, AfterViewInit, inject } from '@angular/core';
import { CardMetric } from './components/shared/card-metric/card-metric';
import { SalesOverview } from './components/sales-overview/sales-overview';
import { SalesByRegion } from './components/sales-by-region/sales-by-region';
import { RegisteredUsers } from './components/registered-users/registered-users';
import { ListIntegration } from './components/list-integration/list-integration';
import { GetStatsUseCase } from '../application/use-case/get-stats.usecase';
import { SalesMetricResponse } from '../domain/interfaces/sales-metric.interface';

@Component({
  selector: 'app-sales-ui',
  imports: [
    CardMetric,
    SalesOverview,
    SalesByRegion,
    RegisteredUsers,
    ListIntegration,
  ],
  templateUrl: './sales-ui.html',
  styleUrl: './sales-ui.scss',
})
export class SalesUi implements AfterViewInit {
  private readonly getStatsUseCase = inject(GetStatsUseCase);
  protected readonly stats = signal<SalesMetricResponse[]>([]);

  ngAfterViewInit(): void {
    this.getStatsUseCase.execute().subscribe({
      next: (stats) => this.stats.set(stats),
      error: (error) => console.error(error),
    });
  }
}
