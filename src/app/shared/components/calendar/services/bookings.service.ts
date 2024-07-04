import { Injectable, inject, signal } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { AppStore, DatabaseService } from '../../../services';
import { Booking, Lawyer, LawyerTimeSlot } from '../../../models/interfaces';
import { Unsubscribe } from '@angular/fire/firestore';
import { addDays, startOfDay } from 'date-fns';
import { DatePipe } from '@angular/common';

@Injectable()
export class BookingsService {
  private readonly store = inject(AppStore);
  readonly bookings = signal<CalendarEvent[]>([]);

  constructor(private db: DatabaseService, private datePipe: DatePipe) {}

  getBookings(): Unsubscribe {
    return this.db.onBookingsSnapshot((bookings) =>
      this.bookings.set(this.bookingsToCalendarEvents(bookings))
    );
  }

  getBookingsByLawyer(lawyer: Lawyer): Unsubscribe {
    return this.db.onBookingsByLawyerSnapshot(lawyer.id, (bookings) => {
      const bookedSlots = this.bookingsToCalendarEvents(bookings);
      this.bookings.set(this.plotFromTimeSlots(lawyer.timeSlots, bookedSlots));
    });
  }

  private bookingsToCalendarEvents(bookings: Booking[]): CalendarEvent[] {
    return bookings.map((item) => ({
      // ...data,
      id: item.id,
      title: item.id,
      start: item.start,
      end: item.end,
    }));
  }

  private plotFromTimeSlots(
    timeSlots: LawyerTimeSlot[],
    bookedSlots: CalendarEvent[]
  ): CalendarEvent[] {
    const slots: CalendarEvent[] = [];
    const today = startOfDay(new Date());
    const dayOfWeek = today.getDay();

    for (let day = 0; day <= 6 - dayOfWeek; day++) {
      const eventDate = addDays(today, day);
      if (eventDate.getDay() === 0) continue;
      timeSlots.forEach((item) => {
        slots.push(this.createTimeSlot(item, eventDate, bookedSlots));
      });
    }

    return slots;
  }

  private createTimeSlot(
    lawyerSlot: LawyerTimeSlot,
    eventDate: Date,
    bookedSlots: CalendarEvent[]
  ): CalendarEvent {
    const start = this.setHourForTheDay(new Date(eventDate), lawyerSlot.start);
    const end = this.setHourForTheDay(new Date(eventDate), lawyerSlot.end);
    const booking = this.findBookedSlot(bookedSlots, start, end);
    const title = booking
      ? 'Unavailable'
      : `${this.getHours(start)} to ${this.getHours(end)}`;
    const color = {
      primary: '#FFFFFF',
      secondary: booking ? '#E57678' : '#91C45A',
    };
    const meta = { unavailable: !!booking };

    return { start, end, title, color, meta };
  }

  private setHourForTheDay(date: Date, hour: number): Date {
    if (hour < 0 || hour > 24) {
      throw new Error('Hour must be between 0 and 24');
    }

    date.setHours(hour, 0, 0, 0);
    return date;
  }

  private findBookedSlot(
    bookedSlots: CalendarEvent[],
    start: Date,
    end: Date
  ): CalendarEvent | undefined {
    return bookedSlots.find((slot) => {
      slot.start.setMinutes(0, 0, 0);
      slot.end!.setMinutes(0, 0, 0);
      const start1 = slot.start.getTime();
      const start2 = start.getTime();
      const end1 = slot.end!.getTime();
      const end2 = end.getTime();
      return start1 === start2 && end1 === end2;
    });
  }

  // private getSlotTitle(
  //   booked: CalendarEvent | undefined,
  //   start: Date,
  //   end: Date
  // ): string {
  //   let ret = 'Unavailable';

  //   if (!booked) return ret;
  //   switch (this.store.user()!.role) {
  //     case UserRole.GUEST:
  //       ret = `${this.getHours(start)} to ${this.getHours(end)}`;
  //       break;
  //     // case UserRole.LAWYER:
  //     //   ret = `${this.getHours(start)} to ${this.getHours(end)}`;
  //     //   break;
  //     // case UserRole.ADMIN:
  //     //   ret = `${this.getHours(start)} to ${this.getHours(end)}`;
  //     //   break;
  //   }

  //   return ret;
  // }

  private getHours(date: Date): string {
    return this.datePipe.transform(date, 'h:mm a')!;
  }
}
