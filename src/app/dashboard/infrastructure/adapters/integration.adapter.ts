import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IntegrationPort } from '../../domain/ports/integration.port';
import { Integration } from '../../domain/models/integration';
import { map, Observable } from 'rxjs';
import { IntegrationDTO } from '../dtos/api.response';

const MOCK_URL = '/mocks/integration.mock.json';

export class IntegrationAdapter implements IntegrationPort {
  private readonly http = inject(HttpClient);

  getIntegrations(): Observable<Integration[]> {
    return this.http
      .get<IntegrationDTO>(MOCK_URL)
      .pipe(map((response) => response.integrations));
  }
}
