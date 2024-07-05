import {
  Component,
  effect,
  inject,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BgWrapperComponent } from '../../shared/components';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Booking, User } from '../../shared/models/interfaces';
import { CommonModule } from '@angular/common';
import {
  AppStore,
  DatabaseService,
  UnsubscribeHelperService,
} from '../../shared/services';
import { UserRole } from '../../shared/models/enums';
import { RatingComponent } from './rating/rating.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, BgWrapperComponent, RatingComponent],
  providers: [UnsubscribeHelperService],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent implements OnInit, OnDestroy {
  booking?: Booking | null;
  lawyer?: User | null;
  guest?: User | null;

  private currUser?: User | null;
  private readonly store = inject(AppStore);
  private readonly unsub = new Subject<void>();

  get currUserRole(): UserRole | undefined {
    return this.currUser?.role;
  }
  get showRatingForm(): boolean {
    if (this.booking?.hasRating) return false;
    if (!this.booking?.isLoggedIn) return true;
    if (this.currUserRole === UserRole.GUEST) return true;
    return false;
  }
  get guestName(): string {
    if (this.guest?.fname && this.guest?.lname)
      return `${this.guest.fname} ${this.guest.lname}`;
    return this.booking?.guest!;
  }

  constructor(
    private injector: Injector,
    private route: ActivatedRoute,
    private db: DatabaseService,
    private unsubHelper: UnsubscribeHelperService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsub)).subscribe((params) => {
      effect(
        () => {
          this.currUser = this.store.user();
          this.getBooking(params['id']);
        },
        { injector: this.injector }
      );
    });
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsubHelper.clearAll();
  }

  private getBooking(id?: string | null): void {
    if (!id) return;
    this.unsubHelper.set(
      'getBooking',
      this.db.onBookingSnapshot(id, (booking) => {
        if (!this.canView(booking)) return;
        this.booking = booking;
        this.getLawyer(booking.lawyer);
        this.getGuest(booking.guest);
      })
    );
  }

  private canView(booking: Booking): boolean {
    const id = this.currUser?.id;
    const role = this.currUser?.role;
    if (role === UserRole.ADMIN) return true;
    if (role === UserRole.LAWYER && booking.lawyer === id) return true;
    if (role === UserRole.GUEST && booking.guest === id) return true;
    if (!this.currUser && !booking.isLoggedIn) return true;
    return false;
  }

  private getLawyer(id: string): void {
    if (this.currUser?.role === UserRole.LAWYER) {
      this.lawyer = this.currUser;
      return;
    }
    this.unsubHelper.set(
      'getLawyer',
      this.db.onUserSnapshot(id, (user) => (this.lawyer = user))
    );
  }

  private getGuest(id: string): void {
    if (this.currUser?.role === UserRole.GUEST) {
      this.guest = this.currUser;
      return;
    }
    this.unsubHelper.set(
      'getGuest',
      this.db.onUserSnapshot(id, (user) => (this.guest = user))
    );
  }
}
