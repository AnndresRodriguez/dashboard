import { SalesOverview } from '../../domain/models/sales-overview';
import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { computed } from '@angular/core';
import { GetSalesOverviewUseCase } from '../use-case/get-sales-overview.usecase';
import { inject } from '@angular/core';

interface SalesOverviewState {
  salesOverview: SalesOverview | null;
  loading: boolean;
  error: string | null;
}

const SalesOverviewState: SalesOverviewState = {
  salesOverview: null,
  loading: false,
  error: null,
};

export const SalesOverviewStore = signalStore(
  { providedIn: 'root' },
  withState(SalesOverviewState),
  withComputed((state) => ({
    // Computed signals para derivar datos
    hasData: computed(() => state.salesOverview() !== null),
    hasError: computed(() => state.error() !== null),
    isEmpty: computed(() => state.salesOverview() === null && !state.loading()),
  })),
  withMethods(
    (state, getSalesOverviewUseCase = inject(GetSalesOverviewUseCase)) => ({
      // Métodos para manejar el estado
      loadSalesOverview() {
        patchState(state, { loading: true, error: null });

        getSalesOverviewUseCase.execute().subscribe({
          next: (overviewData) => {
            const overview = new SalesOverview(
              overviewData.totalRevenue,
              overviewData.totalTarget,
              overviewData.data,
            );
            patchState(state, { salesOverview: overview, loading: false });
          },
          error: (error) => {
            patchState(state, {
              error: error.message || 'Error al cargar resumen de ventas',
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
          salesOverview: null,
          loading: false,
          error: null,
        });
      },
    }),
  ),
);
