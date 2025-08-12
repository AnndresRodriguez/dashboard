import { Observable } from 'rxjs';
import { Integration } from '../models/integration';

export abstract class IntegrationPort {
  abstract getIntegrations(): Observable<Integration[]>;
}
