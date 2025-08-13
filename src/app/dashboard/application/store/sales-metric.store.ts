import { SaleMetric } from '../../domain/models/sales-metrics';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { GetSalesMetricsUseCase } from '../use-case/get-sales-metrics.usecase';
import { inject } from '@angular/core';

interface SalesMetricState {
  salesMetrics: SaleMetric[];
  loading: boolean;
  error: string | null;
}

const SalesMetricState: SalesMetricState = {
  salesMetrics: [],
  loading: false,
  error: null,
};

export const SalesMetricStore = signalStore(
  { providedIn: 'root' },
  withState(SalesMetricState),
  withComputed((state) => ({
    totalMetrics: computed(() => state.salesMetrics().length),
    hasError: computed(() => state.error() !== null),
    isEmpty: computed(
      () => state.salesMetrics().length === 0 && !state.loading(),
    ),
  })),
  withMethods(
    (state, getSalesMetricsUseCase = inject(GetSalesMetricsUseCase)) => ({
      loadSalesMetrics() {
        patchState(state, { loading: true, error: null });

        getSalesMetricsUseCase.execute().subscribe({
          next: (metricsResponse) => {
            const metrics = metricsResponse.map(SaleMetric.fromApiResponse);
            patchState(state, { salesMetrics: metrics, loading: false });
          },
          error: (error) => {
            patchState(state, {
              error: error.message || 'Error al cargar métricas de ventas',
              loading: false,
            });
          },
        });
      },

      clearError() {
        patchState(state, { error: null });
      },

      reset() {
        patchState(state, {
          salesMetrics: [],
          loading: false,
          error: null,
        });
      },
    }),
  ),
);
