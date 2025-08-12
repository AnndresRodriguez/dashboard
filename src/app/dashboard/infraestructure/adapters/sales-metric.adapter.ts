import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SalesMetricsPort } from '../../domain/ports/sales-metrics.port';
import { SalesMetricResponse } from '../../domain/interfaces/sales-metric.interface';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '../../../core/providers';
import { SalesMetricsDTO } from '../dtos/api.response';

export class SalesMetricsAdapter implements SalesMetricsPort {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);
  private readonly ID_JSON_SALES_METRICS = '1dbe-8a86-4247-8d53';

  getSalesMetrics(): Observable<SalesMetricResponse[]> {
    return this.http
      .get<SalesMetricsDTO>(
        `${this.env.apiUrl}/c/${this.ID_JSON_SALES_METRICS}`,
      )
      .pipe(map((response) => response.stats));
  }
}
