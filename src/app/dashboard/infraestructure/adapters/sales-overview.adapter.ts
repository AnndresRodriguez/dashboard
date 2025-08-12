import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '../../../core/providers';
import { SalesOverviewPort } from '../../domain/ports/sales-overview.port';
import { SalesOverviewData } from '../../domain/interfaces/sales-overview.interface';
import { map, Observable } from 'rxjs';
import { SalesOverviewDTO } from '../dtos/api.response';

export class SalesOverviewAdapter implements SalesOverviewPort {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);
  private readonly ID_JSON_SALES_OVERVIEW = '66ff-e4d9-4d77-80c1';

  getSalesOverview(): Observable<SalesOverviewData> {
    return this.http
      .get<SalesOverviewDTO>(
        `${this.env.apiUrl}/c/${this.ID_JSON_SALES_OVERVIEW}`,
      )
      .pipe(map((response) => response.salesOverview));
  }
}
