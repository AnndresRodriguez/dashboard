import { HttpClient } from '@angular/common/http';
import { APP_ENV } from '../../../core/providers';
import { inject } from '@angular/core';
import { IntegrationPort } from '../../domain/ports/integration.port';
import { Integration } from '../../domain/models/integration';
import { map, Observable } from 'rxjs';
import { IntegrationDTO } from '../dtos/api.response';

export class IntegrationAdapter implements IntegrationPort {
  private readonly http = inject(HttpClient);
  private readonly env = inject(APP_ENV);
  private readonly ID_JSON_INTEGRATIONS = '3bde-f00f-4eb3-a567';

  getIntegrations(): Observable<Integration[]> {
    return this.http
      .get<IntegrationDTO>(`${this.env.apiUrl}/c/${this.ID_JSON_INTEGRATIONS}`)
      .pipe(map((response) => response.integrations));
  }
}
