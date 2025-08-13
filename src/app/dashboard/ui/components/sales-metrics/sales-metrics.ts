import { AfterViewInit, Component, inject } from '@angular/core';
import { CardMetric } from '../shared/card-metric/card-metric';
import { SalesMetricStore } from '../../../application/store/sales-metric.store';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DEFAULT_NUMBER_SKELETONS } from '../../enums/constants';

@Component({
  selector: 'app-sales-metrics',
  imports: [CardMetric, NgxSkeletonLoaderModule],
  templateUrl: './sales-metrics.html',
  styleUrl: './sales-metrics.scss',
})
export class SalesMetrics implements AfterViewInit {
  protected readonly store = inject(SalesMetricStore);
  protected skeletonsMetrics = DEFAULT_NUMBER_SKELETONS;

  ngAfterViewInit(): void {
    this.store.loadSalesMetrics();
  }
}
