import { Routes } from '@angular/router';

export const setAppointmentRoutes: Routes = [
  {
    path: 'set-appointment',
    loadComponent: () =>
      import('./set-appointment.component').then(
        (m) => m.SetAppointmentComponent
      ),
  },
];
