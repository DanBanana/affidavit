import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { GeneratorStore } from './models';
import { FormControlStatus } from '@angular/forms';

export const DocumentGeneratorStore = signalStore(
  withState<GeneratorStore>({
    dataSource: null,
    currentField: '',
    formStatus: null,
  }),
  withMethods((store) => ({
    setDataSrouce(dataSource: unknown) {
      patchState(store, { dataSource });
    },
    setCurrentField(currentField?: string | null) {
      patchState(store, { currentField });
    },
    setFormStatus(formStatus: FormControlStatus) {
      patchState(store, { formStatus });
    },
  }))
);
