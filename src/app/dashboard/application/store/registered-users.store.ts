import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { GetRegisteredUsersUseCase } from '../use-case/get-registered-users.usecase';
import { Users } from '../../domain/models/registered-users';

interface RegisteredUsersState {
  registeredUsers: Users | null;
  loading: boolean;
  error: string | null;
}

const RegisteredUsersState: RegisteredUsersState = {
  registeredUsers: null,
  loading: false,
  error: null,
};

export const RegisteredUsersStore = signalStore(
  { providedIn: 'root' },
  withState(RegisteredUsersState),
  withComputed((state) => ({
    hasData: computed(() => state.registeredUsers() !== null),
    hasError: computed(() => state.error() !== null),
    isEmpty: computed(
      () => state.registeredUsers() === null && !state.loading(),
    ),
  })),
  withMethods(
    (state, getRegisteredUsersUseCase = inject(GetRegisteredUsersUseCase)) => ({
      loadRegisteredUsers() {
        patchState(state, { loading: true, error: null });

        getRegisteredUsersUseCase.execute().subscribe({
          next: (registeredUsers) => {
            patchState(state, {
              registeredUsers: new Users(
                registeredUsers.total,
                registeredUsers.premium,
                registeredUsers.basic,
              ),
            });
          },
          error: (error) => {
            patchState(state, { error: error.message });
          },
          complete: () => {
            patchState(state, { loading: false });
          },
        });
      },
      clearError() {
        patchState(state, { error: null });
      },
      reset() {
        patchState(state, {
          registeredUsers: null,
          loading: false,
          error: null,
        });
      },
    }),
  ),
);
