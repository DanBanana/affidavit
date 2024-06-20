import {
  Directive,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';

@Directive()
export abstract class BaseDocGenerator {
  @Output() widthReady = new EventEmitter<number>();
  @Output() completed = new EventEmitter<void>();
  @Input() formVal!: WritableSignal<unknown>;
  constructor() {}

  abstract generatePDF(): void;
}
