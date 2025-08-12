import { Observable } from 'rxjs';
import { SalesMetricResponse } from '../interfaces/sales-metric.interface';

export abstract class SalesMetricsPort {
  abstract getSalesMetrics(): Observable<SalesMetricResponse[]>;
}
