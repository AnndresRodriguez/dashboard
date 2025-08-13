import { InjectionToken } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

import { routes } from '../../app.routes';
import { environment } from '../../../environments/environment';
import { provideEchartsCore } from 'ngx-echarts';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';
import { domainProviders } from './domain-providers';

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
  provideNgxSkeletonLoader({
    animation: 'pulse',
    appearance: 'line',
    theme: {
      extendsFromRoot: true,
    },
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
// ALL PROVIDERS (Combined)
// ============================================================================

export const allProviders = [
  ...angularCoreProviders,
  ...thirdPartyProviders,
  ...applicationProviders,
  ...domainProviders,
];
