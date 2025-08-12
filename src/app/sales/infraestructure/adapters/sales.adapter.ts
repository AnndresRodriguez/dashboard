import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StatsPort } from '../../domain/ports/stats.port';
import { StatsResponse } from '../../domain/interfaces/stats.interface';
import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '../../../core/providers';
import { StatsDataResponse } from '../dtos/api.response';

@Injectable({
  providedIn: 'root',
})
export class SalesAdapter implements StatsPort {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);
  private readonly ID_JSON_STATS = '1dbe-8a86-4247-8d53';

  getStats(): Observable<StatsResponse[]> {
    return this.http
      .get<StatsDataResponse>(`${this.env.apiUrl}/c/${this.ID_JSON_STATS}`)
      .pipe(map((response) => response.stats));
  }
}
