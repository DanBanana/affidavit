import { Routes } from '@angular/router';
import { authRoutes } from './core/auth/auth.routes';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { documentGeneratorRoutes } from './features/document-generator/document-generator.routes';
import { setAppointmentRoutes } from './features/set-appointment/set-appointment.routes';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Affidavit', component: LandingPageComponent },
  ...documentGeneratorRoutes,
  ...setAppointmentRoutes,
  ...authRoutes,
  { path: 'not-found', title: 'Not Found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];
