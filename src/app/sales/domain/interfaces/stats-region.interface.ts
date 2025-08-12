export interface RegionStat {
  region: string;
  value: number;
}

export interface RegionStatsResponse {
  regionStats: RegionStat[];
}
