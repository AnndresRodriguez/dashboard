import { computed, inject } from '@angular/core';
import { SaleRegion } from '../../domain/models/sales-region';
import {
  signalStore,
  withState,
  withComputed,
  patchState,
  withMethods,
} from '@ngrx/signals';
import { GetSalesRegionUseCase } from '../use-case/get-sales-region.usecase';

interface SalesRegionState {
  salesRegion: SaleRegion[];
  loading: boolean;
  error: string | null;
}

const SalesRegionState: SalesRegionState = {
  salesRegion: [],
  loading: false,
  error: null,
};

export const SalesRegionStore = signalStore(
  { providedIn: 'root' },
  withState(SalesRegionState),
  withComputed((state) => ({
    // Computed signals para derivar datos
    hasError: computed(() => state.error() !== null),
    isEmpty: computed(
      () => state.salesRegion().length === 0 && !state.loading(),
    ),
  })),
  withMethods(
    (state, getSalesRegionUseCase = inject(GetSalesRegionUseCase)) => ({
      // Métodos para manejar el estado
      loadSalesRegion() {
        patchState(state, { loading: true, error: null });

        getSalesRegionUseCase.execute().subscribe({
          next: (regionData) => {
            patchState(state, { salesRegion: regionData, loading: false });
          },
          error: (error) => {
            patchState(state, {
              error: error.message || 'Error al cargar regiones de ventas',
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
          salesRegion: [],
          loading: false,
          error: null,
        });
      },
    }),
  ),
);
