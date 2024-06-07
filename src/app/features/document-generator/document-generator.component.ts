import { Component } from '@angular/core';
import { BgWrapperComponent } from '../../shared/components';

@Component({
  selector: 'app-document-generator',
  standalone: true,
  imports: [BgWrapperComponent],
  templateUrl: './document-generator.component.html',
  styleUrl: './document-generator.component.scss',
})
export class DocumentGeneratorComponent {}
