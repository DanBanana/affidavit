import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BaseDocGenerator } from '../../models/base-doc-generator';
import { CommonModule } from '@angular/common';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-affidavit-of-loss',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './affidavit-of-loss.component.html',
  styleUrl: './affidavit-of-loss.component.scss',
})
export class AffidavitOfLossComponent
  extends BaseDocGenerator
  implements AfterViewInit
{
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.widthReady.emit(this.wrapper.nativeElement.offsetWidth);
  }

  override async generatePDF(): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const canvas = await html2canvas(this.content.nativeElement);
    const contentDataURL = canvas.toDataURL('image/png');
    pdf.addImage(contentDataURL, 'PNG', 0, 0, this.pageWidth, this.pageHeight);
    pdf.save('MYPdf.pdf');

    this.completed.emit();
  }
}
