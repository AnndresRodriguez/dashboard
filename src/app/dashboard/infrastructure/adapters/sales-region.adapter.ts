import { map, Observable } from 'rxjs';
import { SalesRegionPort } from '../../domain/ports/sales-region.port';
import { APP_ENV } from '../../../core/providers';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaleRegion } from '../../domain/models/sales-region';
import { SalesRegionDTO } from '../dtos/api.response';

export class SalesRegionAdapter implements SalesRegionPort {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);
  private readonly ID_JSON_SALES_REGION = '7e36-14ca-4b32-a6b4';

  getSalesRegion(): Observable<SaleRegion[]> {
    return this.http
      .get<SalesRegionDTO>(`${this.env.apiUrl}/c/${this.ID_JSON_SALES_REGION}`)
      .pipe(map((response) => response.regionStats));
  }
}
