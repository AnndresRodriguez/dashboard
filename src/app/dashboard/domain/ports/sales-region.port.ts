import { Observable } from 'rxjs';
import { RegionStatsResponse } from '../interfaces/stats-region.interface';

export abstract class SalesRegionPort {
  abstract getSalesRegion(): Observable<RegionStatsResponse>;
}
