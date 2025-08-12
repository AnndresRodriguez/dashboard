import { Region } from '../interfaces/stats-region.interface';

export class SaleRegion {
  constructor(
    public name: string,
    public value: number,
  ) {}

  getRegion(): string {
    return this.name;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }

  setRegion(region: string): void {
    this.name = region;
  }

  static fromApiResponse(stat: Region): SaleRegion {
    return new SaleRegion(stat.name, stat.value);
  }
}
