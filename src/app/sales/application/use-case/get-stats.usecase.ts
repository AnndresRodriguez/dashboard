import { inject } from '@angular/core';
import { StatsPort } from '../../domain/ports/stats.port';
import { Observable } from 'rxjs';
import { StatsResponse } from '../../domain/interfaces/stats.interface';

export class GetStatsUseCase {
  private readonly statsPort = inject(StatsPort);

  execute(): Observable<StatsResponse[]> {
    return this.statsPort.getStats();
  }
}
