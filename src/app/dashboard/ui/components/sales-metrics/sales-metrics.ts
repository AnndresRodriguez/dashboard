import { AfterViewInit, Component, inject } from '@angular/core';
import { CardMetric } from '../shared/card-metric/card-metric';
import { SalesMetricStore } from '../../../application/store/sales-metric.store';

@Component({
  selector: 'app-sales-metrics',
  imports: [CardMetric],
  templateUrl: './sales-metrics.html',
  styleUrl: './sales-metrics.scss',
})
export class SalesMetrics implements AfterViewInit {
  // Inyectar el store
  protected readonly store = inject(SalesMetricStore);

  ngAfterViewInit(): void {
    // Cargar datos usando el store
    this.store.loadSalesMetrics();
  }
}
