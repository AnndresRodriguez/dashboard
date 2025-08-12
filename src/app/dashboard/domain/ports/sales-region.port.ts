import { Observable } from 'rxjs';
import { SaleRegion } from '../models/sales-region';

export abstract class SalesRegionPort {
  abstract getSalesRegion(): Observable<SaleRegion[]>;
}
