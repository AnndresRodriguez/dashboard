import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { GetIntegrationsUseCase } from '../use-case/get-integrations.usecase';
import { Integration } from '../../domain/models/integration';

interface ListIntegrationState {
  listIntegration: Integration[];
  loading: boolean;
  error: string | null;
}

const ListIntegrationState: ListIntegrationState = {
  listIntegration: [],
  loading: false,
  error: null,
};

export const ListIntegrationStore = signalStore(
  { providedIn: 'root' },
  withState(ListIntegrationState),
  withComputed((state) => ({
    hasData: computed(() => state.listIntegration().length > 0),
    hasError: computed(() => state.error() !== null),
    isEmpty: computed(
      () => state.listIntegration().length === 0 && !state.loading(),
    ),
  })),
  withMethods(
    (state, getIntegrationsUseCase = inject(GetIntegrationsUseCase)) => ({
      loadListIntegration() {
        patchState(state, { loading: true, error: null });
        getIntegrationsUseCase.execute().subscribe({
          next: (listIntegration) => {
            patchState(state, { listIntegration: [...listIntegration] });
          },
          error: (error) => {
            patchState(state, { error: error.message });
          },
          complete: () => {
            patchState(state, { loading: false });
          },
        });
      },
    }),
  ),
);
