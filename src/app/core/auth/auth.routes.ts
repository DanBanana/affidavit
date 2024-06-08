import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'sign-up',
        title: 'Sign Up',
        loadComponent: () =>
          import('./pages/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
    ],
  },
];
