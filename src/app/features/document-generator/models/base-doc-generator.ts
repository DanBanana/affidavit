import {
  Directive,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { DocumentWrapperComponent } from '../components';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Directive()
export abstract class BaseDocGenerator {
  pageWidth = 210;
  pageHeight = 297;

  get data(): any {
    return this.formVal() as any;
  }

  @ViewChild('document') document!: DocumentWrapperComponent;
  @Output() widthReady = new EventEmitter<number>();
  @Output() completed = new EventEmitter<void>();
  @Input() formVal!: WritableSignal<unknown>;
  constructor() {}

  async generatePDF(): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const canvas = await html2canvas(this.document.content.nativeElement);
    const contentDataURL = canvas.toDataURL('image/png');
    pdf.addImage(contentDataURL, 'PNG', 0, 0, this.pageWidth, this.pageHeight);
    pdf.save('MYPdf.pdf');

    this.completed.emit();
  }
}
