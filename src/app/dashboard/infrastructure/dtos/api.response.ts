import { SalesOverviewData } from '../../domain/interfaces/sales-overview.interface';
import { Integration } from '../../domain/models/integration';
import { Users } from '../../domain/models/registered-users';
import { SaleMetric } from '../../domain/models/sales-metrics';
import { SaleRegion } from '../../domain/models/sales-region';

export interface SalesMetricsDTO {
  stats: SaleMetric[];
}

export interface SalesOverviewDTO {
  salesOverview: SalesOverviewData;
}

export interface SalesRegionDTO {
  regionStats: SaleRegion[];
}

export interface RegisteredUsersDTO {
  users: Users;
}

export interface IntegrationDTO {
  integrations: Integration[];
}
