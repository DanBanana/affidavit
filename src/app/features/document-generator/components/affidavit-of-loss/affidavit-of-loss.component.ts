import { Component } from '@angular/core';
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
export class AffidavitOfLossComponent extends BaseDocGenerator {
  pageWidth = 210;
  pageHeight = 297;
  pagePadding = 24.4;
  pageFontSize = 5.64;

  constructor() {
    super();
  }

  override generatePDF(): void {
    const doc = new jsPDF('p', 'px', 'a4');
    setTimeout(() => this.completed.emit(), 1000);
  }
}
