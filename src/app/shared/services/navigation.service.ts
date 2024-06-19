import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  navigateToHome(): void {
    this.router.navigateByUrl('home');
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

  navigateToSignUp(): void {
    this.router.navigateByUrl('auth/sign-up');
  }

  navigateToDocumentGenerator(): void {
    this.router.navigateByUrl('document-generator');
  }
}
