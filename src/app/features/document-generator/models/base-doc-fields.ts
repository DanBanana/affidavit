import { Directive, OnDestroy, inject } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DocumentGeneratorStore } from '../document-generator-store';
import { FormFields } from './form-fields';

@Directive()
export abstract class BaseDocFields implements OnDestroy {
  formFields: FormFields[] = [];

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
    this.store.setFormStatus(this.form.status);
    this.setSignalOnFormChanges();
  }

  setCurrentField(field?: string | null): void {
    this.store.setCurrentField(field);
  }

  private setSignalOnFormChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.unsub))
      .subscribe((val: unknown) => this.store.setDataSrouce(val));
    this.form.statusChanges
      .pipe(takeUntil(this.unsub))
      .subscribe((val: FormControlStatus) => this.store.setFormStatus(val));
  }
}
