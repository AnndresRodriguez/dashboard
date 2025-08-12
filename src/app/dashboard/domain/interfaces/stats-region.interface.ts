export interface Region {
  name: string;
  value: number;
}

export interface RegionStatsResponse {
  regionStats: Region[];
}
