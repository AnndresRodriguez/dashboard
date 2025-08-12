import { inject } from '@angular/core';
import { SalesOverviewPort } from '../../domain/ports/sales-overview.port';
import { Observable } from 'rxjs';
import { SalesOverviewData } from '../../domain/interfaces/sales-overview.interface';

export class GetSalesOverviewUseCase {
  private readonly salesOverviewPort = inject(SalesOverviewPort);

  execute(): Observable<SalesOverviewData> {
    return this.salesOverviewPort.getSalesOverview();
  }
}
