import { AfterViewInit, Component } from '@angular/core';
import { BaseDocGenerator } from '../../models/base-doc-generator';
import { CommonModule } from '@angular/common';
import { DocumentWrapperComponent } from '../document-wrapper/document-wrapper.component';

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
  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.widthReady.emit(this.document.wrapper.nativeElement.offsetWidth);
  }
}
