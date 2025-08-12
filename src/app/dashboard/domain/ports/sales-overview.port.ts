import { Observable } from 'rxjs';
import { SalesOverviewData } from '../interfaces/sales-overview.interface';

export abstract class SalesOverviewPort {
  abstract getSalesOverview(): Observable<SalesOverviewData>;
}
