import { inject } from '@angular/core';
import { IntegrationPort } from '../../domain/ports/integration.port';
import { Observable } from 'rxjs';
import { Integration } from '../../domain/models/integration';

export class GetIntegrationsUseCase {
  private readonly integrationPort = inject(IntegrationPort);

  execute(): Observable<Integration[]> {
    return this.integrationPort.getIntegrations();
  }
}
