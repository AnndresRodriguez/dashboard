export class Sales {
  private totalIncome: number;
  private totalProfit: number;
  private totalViews: number;
  private conversionRate: number;

  constructor(
    totalIncome: number,
    totalProfit: number,
    totalViews: number,
    conversionRate: number,
  ) {
    this.totalIncome = totalIncome;
    this.totalProfit = totalProfit;
    this.totalViews = totalViews;
    this.conversionRate = conversionRate;
  }

  getTotalIncome(): number {
    return this.totalIncome;
  }

  getTotalProfit(): number {
    return this.totalProfit;
  }

  getTotalViews(): number {
    return this.totalViews;
  }

  getConversionRate(): number {
    return this.conversionRate;
  }
}
