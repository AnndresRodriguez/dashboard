import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SalesMetricsPort } from '../../domain/ports/sales-metrics.port';
import { HttpClient } from '@angular/common/http';
import { SalesMetricsDTO } from '../dtos/api.response';
import { SaleMetric } from '../../domain/models/sales-metrics';

const MOCK_URL = '/mocks/sales-metric.mock.json';

export class SalesMetricsAdapter implements SalesMetricsPort {
  private readonly http = inject(HttpClient);

  getSalesMetrics(): Observable<SaleMetric[]> {
    return this.http
      .get<SalesMetricsDTO>(MOCK_URL)
      .pipe(map((response) => response.stats));
  }
}
