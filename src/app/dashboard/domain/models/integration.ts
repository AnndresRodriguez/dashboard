import { IntegrationApiResponse } from '../interfaces/integration.interface';

export class Integration {
  constructor(
    public id: string,
    public application: string,
    public logo: string,
    public type: string,
    public rate: number,
    public profit: number,
    public isSelected = false,
  ) {}

  static fromApiResponse(response: IntegrationApiResponse): Integration[] {
    return response.data.integrations.map(
      (integration) =>
        new Integration(
          integration.id,
          integration.application,
          integration.logo,
          integration.type,
          integration.rate,
          integration.profit,
          integration.isSelected || false,
        ),
    );
  }

  static fromIntegration(integration: Integration): Integration {
    return new Integration(
      integration.id,
      integration.application,
      integration.logo,
      integration.type,
      integration.rate,
      integration.profit,
      integration.isSelected || false,
    );
  }

  get formattedProfit(): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(this.profit);
  }

  get formattedRate(): string {
    return `${this.rate}%`;
  }

  get rateProgress(): number {
    return this.rate / 100;
  }

  toggleSelection(): void {
    this.isSelected = !this.isSelected;
  }

  setSelected(selected: boolean): void {
    this.isSelected = selected;
  }

  updateRate(newRate: number): void {
    this.rate = Math.max(0, Math.min(100, newRate));
  }

  updateProfit(newProfit: number): void {
    this.profit = Math.max(0, newProfit);
  }
}
