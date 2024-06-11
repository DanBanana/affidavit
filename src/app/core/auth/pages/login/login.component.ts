import { Component, OnInit } from '@angular/core';
import { ButtonComponent, LogoComponent } from '../../../../shared/components';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService, NavigationService } from '../../../../shared/services';
import { LoginCredentials } from '../../../../shared/models/interfaces';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToggleButtonDirective } from '../../../../shared/directives';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LogoComponent,
    ButtonComponent,
    ToggleButtonDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isPasswordVisible = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private nav: NavigationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group<LoginCredentials>({
      id: '',
      password: '',
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const formVal: LoginCredentials = this.form.getRawValue();
      await this.auth.signInWithEmailAndPassword(formVal);
      this.nav.navigateToHome();
    } catch (e) {
      console.error(e);
      // TODO: notify user of login fail
    }
  }

  navToSignUp(): void {
    this.nav.navigateToSignUp();
  }
}
