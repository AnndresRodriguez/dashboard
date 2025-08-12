import { SalesOverviewData } from '../../domain/interfaces/sales-overview.interface';
import { SaleMetric } from '../../domain/models/sales-metrics';

export interface SalesMetricsDTO {
  stats: SaleMetric[];
}

export interface SalesOverviewDTO {
  salesOverview: SalesOverviewData;
}
