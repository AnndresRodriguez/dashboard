import {
  Component,
  signal,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { CardMetric } from './components/shared/card-metric/card-metric';
import { SalesOverview } from './components/sales-overview/sales-overview';
import { SalesByRegion } from './components/sales-by-region/sales-by-region';
import { DonutChart } from './components/shared/donut-chart/donut-chart';
import { RegisteredUsers } from './components/registered-users/registered-users';
import { ListIntegration } from './components/list-integration/list-integration';
import { GetStatsUseCase } from '../application/use-case/get-stats.usecase';
import { StatsResponse } from '../domain/interfaces/stats.interface';

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
  @ViewChild('trafficChart') trafficChart!: DonutChart;

  private readonly getStatsUseCase = inject(GetStatsUseCase);
  protected readonly stats = signal<StatsResponse[]>([]);

  ngAfterViewInit(): void {
    this.getStatsUseCase.execute().subscribe({
      next: (stats) => {
        if (Array.isArray(stats)) {
          this.stats.set(stats);
        } else {
          console.error('Stats response is not an array:', stats);
          this.stats.set([]);
        }
      },
      error: (error) => {
        console.error('Error fetching stats:', error);
        this.stats.set([]);
      },
    });
  }
}
