import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { GetSalesMetricsUseCase } from '../app/dashboard/application/use-case/get-sales-metrics.usecase';
import { GetSalesRegionUseCase } from '../app/dashboard/application/use-case/get-sales-region.usecase';
import { GetSalesOverviewUseCase } from '../app/dashboard/application/use-case/get-sales-overview.usecase';
import { GetRegisteredUsersUseCase } from '../app/dashboard/application/use-case/get-registered-users.usecase';
import { GetIntegrationsUseCase } from '../app/dashboard/application/use-case/get-integrations.usecase';
import { jest } from '@jest/globals';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';

// Mock para ngx-echarts
export const mockEchartsConfig = {
  echarts: () => import('echarts'),
};

// Mock para los use cases
export const mockGetSalesMetricsUseCase = {
  execute: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
  }),
};

export const mockGetSalesRegionUseCase = {
  execute: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
  }),
};

export const mockGetSalesOverviewUseCase = {
  execute: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
  }),
};

export const mockGetRegisteredUsersUseCase = {
  execute: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
  }),
};

export const mockGetIntegrationsUseCase = {
  execute: jest.fn().mockReturnValue({
    subscribe: jest.fn(),
  }),
};

// Configuración común para TestBed
export const createTestingModule = (
  imports: Type<unknown>[],
  providers: { provide: Type<unknown> | string; useValue: unknown }[] = [],
) => {
  return TestBed.configureTestingModule({
    imports,
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: NGX_ECHARTS_CONFIG, useValue: mockEchartsConfig },
      { provide: GetSalesMetricsUseCase, useValue: mockGetSalesMetricsUseCase },
      { provide: GetSalesRegionUseCase, useValue: mockGetSalesRegionUseCase },
      {
        provide: GetSalesOverviewUseCase,
        useValue: mockGetSalesOverviewUseCase,
      },
      {
        provide: GetRegisteredUsersUseCase,
        useValue: mockGetRegisteredUsersUseCase,
      },
      { provide: GetIntegrationsUseCase, useValue: mockGetIntegrationsUseCase },
      ...providers,
    ],
  });
};
