import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IconType } from '../../models/enums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, ButtonComponent, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  get iconTypes(): typeof IconType {
    return IconType;
  }
}
