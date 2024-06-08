import { Component, OnInit } from '@angular/core';
import { ButtonComponent, LogoComponent } from '../../../../shared/components';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LogoComponent,
    MatInputModule,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit(): void {
    // TODO: call login api
    console.log(this.form.getRawValue());
  }

  navToSignUp(): void {
    this.router.navigateByUrl('auth/sign-up');
  }
}
