import { FormControlStatus } from '@angular/forms';

export interface GeneratorStore {
  dataSource: unknown;
  formStatus?: FormControlStatus | null;
  currentField?: string | null;
}
