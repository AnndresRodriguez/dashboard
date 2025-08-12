import { Observable } from 'rxjs';
import { StatsResponse } from '../interfaces/stats.interface';

export abstract class StatsPort {
  abstract getStats(): Observable<StatsResponse[]>;
}
