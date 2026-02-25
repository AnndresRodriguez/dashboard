import { map, Observable } from 'rxjs';
import { SalesRegionPort } from '../../domain/ports/sales-region.port';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SaleRegion } from '../../domain/models/sales-region';
import { SalesRegionDTO } from '../dtos/api.response';

const MOCK_URL = '/mocks/sales-region.mock.json';

export class SalesRegionAdapter implements SalesRegionPort {
  private readonly http = inject(HttpClient);

  getSalesRegion(): Observable<SaleRegion[]> {
    return this.http
      .get<SalesRegionDTO>(MOCK_URL)
      .pipe(map((response) => response.regionStats));
  }
}
