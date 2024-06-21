import {
  Directive,
  Input,
  OnDestroy,
  WritableSignal,
  inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DocumentGeneratorStore } from '../document-generator-store';

@Directive()
export abstract class BaseDocFields implements OnDestroy {
  protected form!: FormGroup;

  private unsub = new Subject<void>();
  private readonly store = inject(DocumentGeneratorStore);

  constructor() {}

  ngOnDestroy(): void {
    this.unsub.next();
  }

  initForm(formGroup: FormGroup): void {
    this.form = formGroup;
    this.store.setDataSrouce(this.form.getRawValue());
    this.setSignalOnFormChanges();
  }

  setCurrentField(field?: string | null): void {
    this.store.setCurrentField(field);
  }

  private setSignalOnFormChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.unsub))
      .subscribe((val: unknown) => this.store.setDataSrouce(val));
  }
}
