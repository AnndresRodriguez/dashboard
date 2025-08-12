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
import { SalesMetricsPort } from '../../dashboard/domain/ports/sales-metrics.port';
import { GetSalesMetricsUseCase } from '../../dashboard/application/use-case/get-sales-metrics.usecase';
import { SalesMetricsAdapter } from '../../dashboard/infraestructure/adapters/sales-metric.adapter';
import { GetSalesOverviewUseCase } from '../../dashboard/application/use-case/get-sales-overview.usecase';
import { SalesOverviewPort } from '../../dashboard/domain/ports/sales-overview.port';
import { SalesOverviewAdapter } from '../../dashboard/infraestructure/adapters/sales-overview.adapter';

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
    provide: SalesMetricsPort,
    useClass: SalesMetricsAdapter,
  },
  {
    provide: GetSalesMetricsUseCase,
    useFactory: () => new GetSalesMetricsUseCase(),
    deps: [SalesMetricsPort],
  },
  {
    provide: SalesOverviewPort,
    useClass: SalesOverviewAdapter,
  },
  {
    provide: GetSalesOverviewUseCase,
    useFactory: () => new GetSalesOverviewUseCase(),
    deps: [SalesOverviewPort],
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
