import { Routes } from '@angular/router';

export const appointmentRoutes: Routes = [
  {
    path: 'appointment/:id',
    loadComponent: () =>
      import('./appointment.component').then((m) => m.AppointmentComponent),
  },
];
