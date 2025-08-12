import { Observable } from 'rxjs';
import { RegionStatsResponse } from '../interfaces/stats-region.interface';

export abstract class StatsRegionPort {
  abstract getStatsRegion(): Observable<RegionStatsResponse>;
}
