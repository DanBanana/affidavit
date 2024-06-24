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
  private _fullWidth = false;
  private _fullHeight = false;
  private _wrapText = false;
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

  @Input()
  set fullWidth(value: boolean | string) {
    this._fullWidth = value !== null && `${value}` !== 'false';
  }
  get fullWidth(): boolean {
    return this._fullWidth;
  }

  @Input()
  set fullHeight(value: boolean | string) {
    this._fullHeight = value !== null && `${value}` !== 'false';
  }
  get fullHeight(): boolean {
    return this._fullHeight;
  }

  @Input()
  set wrapText(value: boolean | string) {
    this._wrapText = value !== null && `${value}` !== 'false';
  }
  get wrapText(): boolean {
    return this._wrapText;
  }

  @Input() width!: number;
  @Input() field: string = 'empty';
  @Input() textAlign: 'left' | 'center' | 'right' | 'justify' = 'center';
  constructor() {}
}
