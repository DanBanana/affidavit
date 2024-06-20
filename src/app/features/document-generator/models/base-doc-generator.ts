import {
  Directive,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';

@Directive()
export abstract class BaseDocGenerator {
  pageWidth = 210;
  pageHeight = 297;

  @Output() widthReady = new EventEmitter<number>();
  @Output() completed = new EventEmitter<void>();
  @Input() formVal!: WritableSignal<unknown>;
  constructor() {}

  abstract generatePDF(): void;
}
