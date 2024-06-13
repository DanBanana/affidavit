import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IconType } from '../../models/enums';
import { AppStore, AuthService, NavigationService } from '../../services';
import { MatMenuModule } from '@angular/material/menu';
import { User } from '../../models/interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    LogoComponent,
    ButtonComponent,
    IconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly store = inject(AppStore);

  get iconTypes(): typeof IconType {
    return IconType;
  }

  get isLoggedIn(): boolean {
    return this.store.isLoggedIn();
  }

  get user(): User {
    return this.store.user()!;
  }

  get displayName(): string {
    const user = this.user;
    const fname = user.fname;
    const lname = user.lname;
    if (fname || lname)
      return `${this.user.fname}${fname && lname ? ' ' : ''}${this.user.lname}`;
    return user.displayName!;
  }

  constructor(private nav: NavigationService, private auth: AuthService) {}

  navigateToHome(): void {
    this.nav.navigateToHome();
  }

  navigateToLogin(): void {
    this.nav.navigateToLogin();
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.navigateToHome();
    } catch (e) {
      console.error(e);
    }
  }
}
