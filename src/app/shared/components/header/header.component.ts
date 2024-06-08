import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IconType } from '../../models/enums';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  navToHome(): void {
    this.router.navigateByUrl('home');
  }

  navToLogin(): void {
    this.router.navigateByUrl('auth/login');
  }
}
