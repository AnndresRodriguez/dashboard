import { SalesMetricsPort } from '../../dashboard/domain/ports/sales-metrics.port';
import { GetSalesMetricsUseCase } from '../../dashboard/application/use-case/get-sales-metrics.usecase';
import { SalesMetricsAdapter } from '../../dashboard/infraestructure/adapters/sales-metric.adapter';
import { GetSalesOverviewUseCase } from '../../dashboard/application/use-case/get-sales-overview.usecase';
import { SalesOverviewPort } from '../../dashboard/domain/ports/sales-overview.port';
import { SalesOverviewAdapter } from '../../dashboard/infraestructure/adapters/sales-overview.adapter';
import { SalesRegionPort } from '../../dashboard/domain/ports/sales-region.port';
import { SalesRegionAdapter } from '../../dashboard/infraestructure/adapters/sales-region.adapter';
import { GetSalesRegionUseCase } from '../../dashboard/application/use-case/get-sales-region.usecase';
import { GetRegisteredUsersUseCase } from '../../dashboard/application/use-case/get-registered-users.usecase';
import { RegisteredUsersPort } from '../../dashboard/domain/ports/registered-users.port';
import { RegisteredUsersAdapter } from '../../dashboard/infraestructure/adapters/registered-users.adapter';
import { IntegrationPort } from '../../dashboard/domain/ports/integration.port';
import { GetIntegrationsUseCase } from '../../dashboard/application/use-case/get-integrations.usecase';
import { IntegrationAdapter } from '../../dashboard/infraestructure/adapters/integration.adapter';

// ============================================================================
// DOMAIN PROVIDERS (Clean Architecture)
// ============================================================================

export const domainProviders = [
  // Sales Metrics
  {
    provide: SalesMetricsPort,
    useClass: SalesMetricsAdapter,
  },
  {
    provide: GetSalesMetricsUseCase,
    useFactory: () => new GetSalesMetricsUseCase(),
    deps: [SalesMetricsPort],
  },
  // Sales Overview
  {
    provide: SalesOverviewPort,
    useClass: SalesOverviewAdapter,
  },
  {
    provide: GetSalesOverviewUseCase,
    useFactory: () => new GetSalesOverviewUseCase(),
    deps: [SalesOverviewPort],
  },
  // Sales Region
  {
    provide: SalesRegionPort,
    useClass: SalesRegionAdapter,
  },
  {
    provide: GetSalesRegionUseCase,
    useFactory: () => new GetSalesRegionUseCase(),
    deps: [SalesRegionPort],
  },
  // Registered Users
  {
    provide: RegisteredUsersPort,
    useClass: RegisteredUsersAdapter,
  },
  {
    provide: GetRegisteredUsersUseCase,
    useFactory: () => new GetRegisteredUsersUseCase(),
    deps: [RegisteredUsersPort],
  },
  // Integration
  {
    provide: IntegrationPort,
    useClass: IntegrationAdapter,
  },
  {
    provide: GetIntegrationsUseCase,
    useFactory: () => new GetIntegrationsUseCase(),
    deps: [IntegrationPort],
  },
];
