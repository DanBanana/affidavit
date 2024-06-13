import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-login-with-providers',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './login-with-providers.component.html',
  styleUrl: './login-with-providers.component.scss',
})
export class LoginWithProvidersComponent {
  constructor(private auth: AuthService) {}

  signInWithGoogle(): void {
    this.auth.signInWithGooglePopup();
  }
}
