export interface SalesDataPoint {
  month: string;
  revenue: number;
  target: number;
}

export interface SalesOverviewData {
  totalRevenue: number;
  totalTarget: number;
  data: SalesDataPoint[];
}

export interface SalesOverviewResponse {
  salesOverview: SalesOverviewData;
}
