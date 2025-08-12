import { Observable } from 'rxjs';
import { SalesOverviewResponse } from '../interfaces/overview.interface';

export abstract class OverviewPort {
  abstract getOverview(): Observable<SalesOverviewResponse>;
}
