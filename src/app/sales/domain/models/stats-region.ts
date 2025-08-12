import { RegionStat } from '../interfaces/stats-region.interface';

export class StatsRegion {
  constructor(
    public region: string,
    public value: number,
  ) {}

  getRegion(): string {
    return this.region;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }

  setRegion(region: string): void {
    this.region = region;
  }

  static fromApiResponse(stat: RegionStat): StatsRegion {
    return new StatsRegion(stat.region, stat.value);
  }
}
