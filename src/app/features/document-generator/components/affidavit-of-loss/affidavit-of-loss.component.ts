import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseDocGenerator } from '../../models/base-doc-generator';
import { CommonModule } from '@angular/common';
import { DocumentWrapperComponent } from '../document-wrapper/document-wrapper.component';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-affidavit-of-loss',
  standalone: true,
  imports: [CommonModule, DocumentWrapperComponent],
  templateUrl: './affidavit-of-loss.component.html',
  styleUrl: './affidavit-of-loss.component.scss',
})
export class AffidavitOfLossComponent
  extends BaseDocGenerator
  implements AfterViewInit
{
  @ViewChild('document') document!: DocumentWrapperComponent;
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.widthReady.emit(this.document.wrapper.nativeElement.offsetWidth);
  }

  override async generatePDF(): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const canvas = await html2canvas(this.document.content.nativeElement);
    const contentDataURL = canvas.toDataURL('image/png');
    pdf.addImage(contentDataURL, 'PNG', 0, 0, this.pageWidth, this.pageHeight);
    pdf.save('MYPdf.pdf');

    this.completed.emit();
  }
}
