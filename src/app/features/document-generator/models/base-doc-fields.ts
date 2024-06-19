import { Directive, Input, OnDestroy, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive()
export abstract class BaseDocFields implements OnDestroy {
  protected form!: FormGroup;
  private unsub = new Subject<void>();

  @Input() formVal!: WritableSignal<unknown>;
  constructor() {}

  ngOnDestroy(): void {
    this.unsub.next();
  }

  initForm(formGroup: FormGroup): void {
    this.form = formGroup;
    this.formVal.set(this.form.getRawValue());
    this.setSignalOnFormChanges();
  }

  private setSignalOnFormChanges(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.unsub))
      .subscribe((val: unknown) => this.formVal.set(val));
  }
}
