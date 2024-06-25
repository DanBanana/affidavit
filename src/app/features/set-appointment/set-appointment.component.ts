import { Component } from '@angular/core';
import { BgWrapperComponent, CalendarComponent } from '../../shared/components';

@Component({
  selector: 'app-set-appointment',
  standalone: true,
  imports: [BgWrapperComponent, CalendarComponent],
  templateUrl: './set-appointment.component.html',
  styleUrl: './set-appointment.component.scss',
})
export class SetAppointmentComponent {}
