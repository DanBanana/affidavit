import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AppState, User } from '../models/interfaces';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppState>({
    user: null,
    globalLoading: false,
  }),
  withComputed((store) => ({
    isLoggedIn: computed(() => store.user() != null),
  })),
  withMethods((store) => ({
    setUser(user: User | null) {
      patchState(store, { user });
    },
    setGlobalLoading(globalLoading: boolean) {
      patchState(store, { globalLoading });
    },
  }))
);
