import { Observable } from 'rxjs';
import { IntegrationApiResponse } from '../interfaces/integration.interface';

export abstract class IntegrationPort {
  abstract getIntegrations(): Observable<IntegrationApiResponse>;
}
