import { Component } from '@angular/core';
import { BgWrapperComponent, CalendarComponent } from '../../shared/components';
import { CalendarViewConfig } from '../../shared/models/enums';

@Component({
  selector: 'app-set-appointment',
  standalone: true,
  imports: [BgWrapperComponent, CalendarComponent],
  templateUrl: './set-appointment.component.html',
  styleUrl: './set-appointment.component.scss',
})
export class SetAppointmentComponent {
  get calendarViewConfig(): typeof CalendarViewConfig {
    return CalendarViewConfig;
  }
}
