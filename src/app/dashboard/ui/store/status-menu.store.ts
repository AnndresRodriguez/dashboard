import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface StatusMenuState {
  isExpanded: boolean;
}

const initialState: StatusMenuState = {
  isExpanded: false,
};

export const StatusMenuStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state) => ({
    setIsExpanded(isExpanded: boolean) {
      patchState(state, { isExpanded });
    },
    toggleIsExpanded() {
      patchState(state, { isExpanded: !state.isExpanded() });
    },
  })),
);
