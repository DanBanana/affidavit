import { Component, Input } from '@angular/core';
import { IconType } from '../../models/enums';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  get iconTypes(): typeof IconType {
    return IconType;
  }

  @Input() icon!: IconType;
  @Input() width: number = 12;
  @Input() height: number = 12;
  constructor() {}
}
