import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatRippleModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  private _secondary = false;
  private _darkBg = false;

  get primary(): boolean {
    return !this._secondary;
  }

  @Input()
  set secondary(value: boolean | string) {
    this._secondary = value !== null && `${value}` !== 'false';
  }
  get secondary(): boolean {
    return this._secondary;
  }

  @Input()
  set darkBg(value: boolean | string) {
    this._darkBg = value !== null && `${value}` !== 'false';
  }
  get darkBg(): boolean {
    return this._darkBg;
  }

  @Input() type: 'button' | 'reset' | 'submit' = 'button';

  @Input() disabled = false;

  @Output() click = new EventEmitter<void>();

  constructor() {}

  onClick(): void {
    if (this.disabled) return;
    this.click.emit();
  }
}
