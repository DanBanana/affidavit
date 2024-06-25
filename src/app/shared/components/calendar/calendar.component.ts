import { Component } from '@angular/core';
import { CalendarModule, CalendarView } from 'angular-calendar';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, MatRadioModule, CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  viewDate = new Date();
  viewMode: CalendarView = CalendarView.Month;

  get calendarView(): typeof CalendarView {
    return CalendarView;
  }
}
