import { InjectionToken } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEchartsCore } from 'ngx-echarts';
import {
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { routes } from '../../app.routes';
import { environment } from '../../../environments/environment';
import { StatsPort } from '../../sales/domain/ports/stats.port';
import { GetStatsUseCase } from '../../sales/application/use-case/get-stats.usecase';
import { SalesAdapter } from '../../sales/infraestructure/adapters/sales.adapter';

// ============================================================================
// INJECTION TOKENS
// ============================================================================

export const APP_ENV = new InjectionToken<{
  production: boolean;
  apiUrl: string;
}>('APP_ENV');

// ============================================================================
// ANGULAR CORE PROVIDERS
// ============================================================================

export const angularCoreProviders = [
  provideBrowserGlobalErrorListeners(),
  provideZonelessChangeDetection(),
  provideRouter(routes),
  provideHttpClient(),
];

// ============================================================================
// THIRD PARTY PROVIDERS
// ============================================================================

export const thirdPartyProviders = [
  provideEchartsCore({
    echarts: () => import('echarts'),
  }),
];

// ============================================================================
// APPLICATION PROVIDERS
// ============================================================================

export const applicationProviders = [
  {
    provide: APP_ENV,
    useValue: environment,
  },
];

// ============================================================================
// DOMAIN PROVIDERS (Clean Architecture)
// ============================================================================

export const domainProviders = [
  {
    provide: StatsPort,
    useClass: SalesAdapter,
  },
  {
    provide: GetStatsUseCase,
    useFactory: () => new GetStatsUseCase(),
    deps: [StatsPort],
  },
];

// ============================================================================
// ALL PROVIDERS (Combined)
// ============================================================================

export const allProviders = [
  ...angularCoreProviders,
  ...thirdPartyProviders,
  ...applicationProviders,
  ...domainProviders,
];
