import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GeneratorStore } from './models';

export const DocumentGeneratorStore = signalStore(
  withState<GeneratorStore>({ dataSource: null, currentField: '' }),
  withMethods((store) => ({
    setDataSrouce(dataSource: unknown) {
      patchState(store, { dataSource });
    },
    setCurrentField(currentField?: string | null) {
      patchState(store, { currentField });
    },
  }))
);
