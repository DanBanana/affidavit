import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DocumentGeneratorStore } from '../../document-generator-store';

@Component({
  selector: 'app-text-spacer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-spacer.component.html',
  styleUrl: './text-spacer.component.scss',
})
export class TextSpacerComponent {
  private readonly store = inject(DocumentGeneratorStore);

  get dataSource(): any {
    return this.store.dataSource() as any;
  }

  get displayField(): string {
    return this.dataSource[this.field];
  }

  get isSelected(): boolean {
    return this.field === this.store.currentField!();
  }

  @Input() width!: number;
  @Input() field: string = 'empty';
  @Input() textAlign: 'left' | 'center' | 'right' | 'justify' = 'center';
  constructor() {}
}
