export interface SalesMetricResponse {
  title: string;
  value: number;
  currency: string;
  percentageChange: number;
  changeType: 'up' | 'down' | 'equal';
  description: string;
}
