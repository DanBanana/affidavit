import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components';
import { AppStore, AuthService } from './shared/services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatProgressSpinnerModule],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly store = inject(AppStore);

  get isLoading(): boolean {
    return this.store.globalLoading();
  }

  /**
   * @param auth Need to inject `AuthService` to trigger `onAuthStateChanged` method.
   */
  constructor(auth: AuthService) {
    auth.onAuthStateChanged();
  }
}
