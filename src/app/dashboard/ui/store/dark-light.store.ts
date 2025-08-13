import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface DarkLightState {
  darkMode: boolean;
}

const initialState: DarkLightState = {
  darkMode: false,
};

export const DarkLightStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((state) => ({
    setDarkMode(isDark: boolean) {
      patchState(state, { darkMode: isDark });
    },
    toggleDarkMode() {
      patchState(state, { darkMode: !state.darkMode() });
    },
  })),
);
