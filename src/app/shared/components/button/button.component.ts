import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

  constructor() {}
}
