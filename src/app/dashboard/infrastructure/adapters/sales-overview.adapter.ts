import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalesOverviewPort } from '../../domain/ports/sales-overview.port';
import { SalesOverviewData } from '../../domain/interfaces/sales-overview.interface';
import { map, Observable } from 'rxjs';
import { SalesOverviewDTO } from '../dtos/api.response';

const MOCK_URL = '/mocks/sales-overview.mock.json';

export class SalesOverviewAdapter implements SalesOverviewPort {
  private readonly http = inject(HttpClient);

  getSalesOverview(): Observable<SalesOverviewData> {
    return this.http
      .get<SalesOverviewDTO>(MOCK_URL)
      .pipe(map((response) => response.salesOverview));
  }
}
