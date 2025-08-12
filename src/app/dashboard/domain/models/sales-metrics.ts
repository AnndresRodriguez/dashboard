import { SalesMetricResponse } from '../interfaces/sales-metric.interface';

export class SaleMetric {
  constructor(
    public title: string,
    public value: number,
    public currency: string,
    public percentageChange: number,
    public changeType: 'up' | 'down' | 'equal',
    public description: string,
  ) {
    this.title = title;
    this.value = value;
    this.currency = currency;
    this.percentageChange = percentageChange;
    this.changeType = changeType;
    this.description = description;
  }

  getTitle(): string {
    return this.title;
  }

  getValue(): number {
    return this.value;
  }

  getCurrency(): string {
    return this.currency;
  }

  getPercentageChange(): number {
    return this.percentageChange;
  }

  getChangeType(): 'up' | 'down' | 'equal' {
    return this.changeType;
  }

  getDescription(): string {
    return this.description;
  }

  setTitle(title: string): void {
    this.title = title;
  }
  setValue(value: number): void {
    this.value = value;
  }
  setCurrency(currency: string): void {
    this.currency = currency;
  }
  setPercentageChange(percentageChange: number): void {
    this.percentageChange = percentageChange;
  }
  setChangeType(changeType: 'up' | 'down' | 'equal'): void {
    this.changeType = changeType;
  }
  setDescription(description: string): void {
    this.description = description;
  }

  static fromApiResponse(response: SalesMetricResponse): SaleMetric {
    return new SaleMetric(
      response.title,
      response.value,
      response.currency,
      response.percentageChange,
      response.changeType,
      response.description,
    );
  }
}
