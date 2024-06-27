import { Component, OnInit, signal } from '@angular/core';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services';
import { Booking } from '../../models/interfaces';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, MatRadioModule, CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  readonly bookings = signal<CalendarEvent[]>([]);
  viewDate = new Date();
  viewMode: CalendarView = CalendarView.Month;

  get calendarView(): typeof CalendarView {
    return CalendarView;
  }

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  private getBookings(): void {
    this.db.onBookingsSnapshot((querySnapshot) =>
      this.bookings.set(
        querySnapshot.docs.map((item) => {
          const data = item.data();
          return {
            // ...data,
            // id: item.id,
            title: item.id,
            start: data['start'].toDate(),
            end: data['end'].toDate(),
          };
        })
      )
    );
  }
}
