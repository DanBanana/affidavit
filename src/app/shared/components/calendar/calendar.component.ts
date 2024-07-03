import {
  Component,
  EffectRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  effect,
} from '@angular/core';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalendarViewConfig } from '../../models/enums';
import { User } from '../../models/interfaces';
import { MatSelectModule } from '@angular/material/select';
import { BookingsService, LawyersService } from './services';
import { Unsubscribe } from '@angular/fire/auth';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [BookingsService, LawyersService],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, OnDestroy {
  viewMode: CalendarView = CalendarView.Month;
  viewDate = new Date();

  private unsubMap = new Map<string, Unsubscribe | void>();
  private getBookingsByLawyerEffect?: EffectRef;

  get calendarView(): typeof CalendarView {
    return CalendarView;
  }
  get showViewModes(): boolean {
    return this.viewConfig !== CalendarViewConfig.BOOKING;
  }
  get lawyers(): User[] {
    return this.lawyersSvc.lawyers();
  }
  get lawyersFormControl(): FormControl {
    return this.lawyersSvc.form;
  }
  get bookings(): CalendarEvent[] {
    return this.bookingsSvc.bookings();
  }

  @Input() viewConfig!: CalendarViewConfig;
  constructor(
    private injector: Injector,
    private bookingsSvc: BookingsService,
    private lawyersSvc: LawyersService
  ) {}

  ngOnInit(): void {
    this.setConfig();
    this.unsubMap.set('getBookings', this.getBookings());
    this.lawyersSvc.getLawyers(this.viewConfig);
  }

  ngOnDestroy(): void {
    this.lawyersSvc.unsub.next();

    Array.from(this.unsubMap.values()).forEach((unsub) => {
      if (unsub) unsub();
    });

    this.getBookingsByLawyerEffect?.destroy();
  }

  private getBookings(): Unsubscribe | void {
    if (this.viewConfig === CalendarViewConfig.VIEWING) {
      return this.bookingsSvc.getBookings();
    }
    this.getBookingsByLawyerEffect = effect(
      () => {
        if (!this.lawyersSvc.currLawyer()?.id) return;
        const unsub = this.unsubMap.get('getBookingsByLawyer');
        const callback = () =>
          this.bookingsSvc.getBookingsByLawyer(this.lawyersSvc.currLawyer()!);
        if (unsub) unsub();
        this.unsubMap.set('getBookingsByLawyer', callback());
      },
      { injector: this.injector }
    );
  }

  private setConfig(): void {
    if (this.viewConfig === CalendarViewConfig.BOOKING) {
      this.viewMode = CalendarView.Week;
    }
  }
}
