import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent, LogoComponent } from '../../../../shared/components';
import { MatInputModule } from '@angular/material/input';
import { ToggleButtonDirective } from '../../../../shared/directives';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../shared/services';
import { LoginCredentials, User } from '../../../../shared/models/interfaces';
import { LoginWithProvidersComponent } from '../../components/login-with-providers/login-with-providers.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ToggleButtonDirective,
    LogoComponent,
    ButtonComponent,
    LoginWithProvidersComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  isPasswordVisible = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const formVal: LoginCredentials & User = this.form.getRawValue();
      await this.auth.createUserWithEmailAndPassword(
        {
          id: formVal.id,
          password: formVal.password,
        },
        {
          fname: formVal.fname,
          lname: formVal.lname,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
}
