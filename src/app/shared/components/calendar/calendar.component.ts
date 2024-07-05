import {
  Component,
  EffectRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
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
import { Lawyer } from '../../models/interfaces';
import { MatSelectModule } from '@angular/material/select';
import { BookingsService, LawyersService } from './services';
import { Unsubscribe } from '@angular/fire/auth';
import { UnsubscribeHelperService } from '../../services';
import { RoundToFirstDecimalPipe } from '../../directives';

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
    RoundToFirstDecimalPipe,
  ],
  providers: [BookingsService, LawyersService, UnsubscribeHelperService],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit, OnDestroy {
  viewMode: CalendarView = CalendarView.Month;
  viewDate = new Date();

  private getBookingsByLawyerEffect?: EffectRef;

  get calendarView(): typeof CalendarView {
    return CalendarView;
  }
  get showViewModes(): boolean {
    return this.viewConfig !== CalendarViewConfig.BOOKING;
  }
  get lawyers(): Lawyer[] {
    return this.lawyersSvc.lawyers();
  }
  get currLawyer(): Lawyer | null {
    return this.lawyersSvc.currLawyer();
  }
  get lawyersFormControl(): FormControl {
    return this.lawyersSvc.form;
  }
  get bookings(): CalendarEvent[] {
    return this.bookingsSvc.bookings();
  }

  @Input() viewConfig!: CalendarViewConfig;
  @Output() eventClicked = new EventEmitter<unknown>();
  constructor(
    private injector: Injector,
    private bookingsSvc: BookingsService,
    private lawyersSvc: LawyersService,
    private unsubHelper: UnsubscribeHelperService
  ) {}

  ngOnInit(): void {
    this.setConfig();
    this.unsubHelper.set('getBookings', this.getBookings());
    this.lawyersSvc.getLawyers(this.viewConfig);
  }

  ngOnDestroy(): void {
    this.lawyersSvc.unsub.next();
    this.unsubHelper.clearAll();

    this.getBookingsByLawyerEffect?.destroy();
  }

  onEventClicked(event: CalendarEvent): void {
    if (event.meta.unavailable) return;
    this.eventClicked.emit({ event, lawyer: this.currLawyer });
  }

  private getBookings(): Unsubscribe | void {
    if (this.viewConfig === CalendarViewConfig.VIEWING) {
      return this.bookingsSvc.getBookings();
    }
    this.getBookingsByLawyerEffect = effect(
      () => {
        if (!this.lawyersSvc.currLawyer()?.id) return;
        this.unsubHelper.set('getBookingsByLawyer', () => {
          this.bookingsSvc.getBookingsByLawyer(this.lawyersSvc.currLawyer()!);
        });
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
