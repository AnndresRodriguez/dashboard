import { Observable } from 'rxjs';
import { SaleMetric } from '../models/sales-metrics';

export abstract class SalesMetricsPort {
  abstract getSalesMetrics(): Observable<SaleMetric[]>;
}
