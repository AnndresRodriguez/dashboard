import { SalesRegionPort } from '../../domain/ports/sales-region.port';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleRegion } from '../../domain/models/sales-region';

export class GetSalesRegionUseCase {
  private readonly salesRegionPort = inject(SalesRegionPort);

  execute(): Observable<SaleRegion[]> {
    return this.salesRegionPort.getSalesRegion();
  }
}
