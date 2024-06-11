import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[toggle-button]',
  standalone: true,
})
export class ToggleButtonDirective {
  private _toggleVal: boolean = false;

  @Input()
  get toggleVal(): boolean {
    return this._toggleVal;
  }

  set toggleVal(val: boolean) {
    this._toggleVal = val;
    this.toggleValChange.emit(this._toggleVal);
  }

  @Output() toggleValChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('click') onClick() {
    this.toggleVal = !this.toggleVal;
  }
}
