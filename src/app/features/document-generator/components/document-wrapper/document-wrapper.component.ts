import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-wrapper.component.html',
  styleUrl: './document-wrapper.component.scss',
})
export class DocumentWrapperComponent {
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  constructor() {}
}
