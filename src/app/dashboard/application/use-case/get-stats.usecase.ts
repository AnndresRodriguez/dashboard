import { inject } from '@angular/core';
import { SalesMetricsPort } from '../../domain/ports/sales-metrics.port';
import { Observable } from 'rxjs';
import { SalesMetricResponse } from '../../domain/interfaces/sales-metric.interface';

export class GetStatsUseCase {
  private readonly salesMetricsPort = inject(SalesMetricsPort);

  execute(): Observable<SalesMetricResponse[]> {
    return this.salesMetricsPort.getSalesMetrics();
  }
}
