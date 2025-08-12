import {
  SalesDataPoint,
  SalesOverviewResponse,
} from '../interfaces/sales-overview.interface';

export class SalesOverview {
  constructor(
    public totalRevenue: number,
    public totalTarget: number,
    public data: SalesDataPoint[],
  ) {}

  static fromApiResponse(response: SalesOverviewResponse): SalesOverview {
    const { salesOverview } = response;
    return new SalesOverview(
      salesOverview.totalRevenue,
      salesOverview.totalTarget,
      salesOverview.data,
    );
  }

  get revenueTargetRatio(): number {
    return this.totalRevenue / this.totalTarget;
  }

  get isTargetMet(): boolean {
    return this.totalRevenue >= this.totalTarget;
  }

  get targetGap(): number {
    return this.totalTarget - this.totalRevenue;
  }

  get targetGapPercentage(): number {
    return (this.targetGap / this.totalTarget) * 100;
  }

  setTotalRevenue(totalRevenue: number): void {
    this.totalRevenue = totalRevenue;
  }
  setTotalTarget(totalTarget: number): void {
    this.totalTarget = totalTarget;
  }
  setData(data: SalesDataPoint[]): void {
    this.data = data;
  }
}
