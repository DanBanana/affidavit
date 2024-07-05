import { Component, inject } from '@angular/core';
import {
  BgWrapperComponent,
  CalendarComponent,
  ConfirmationDialogComponent,
} from '../../shared/components';
import { CalendarViewConfig } from '../../shared/models/enums';
import { AppStore, DatabaseService } from '../../shared/services';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { InputDialogComponent } from './input-dialog/input-dialog.component';

@Component({
  selector: 'app-set-appointment',
  standalone: true,
  imports: [BgWrapperComponent, CalendarComponent],
  templateUrl: './set-appointment.component.html',
  styleUrl: './set-appointment.component.scss',
})
export class SetAppointmentComponent {
  private readonly store = inject(AppStore);

  get calendarViewConfig(): typeof CalendarViewConfig {
    return CalendarViewConfig;
  }

  constructor(private db: DatabaseService, private dialog: MatDialog) {}

  async onEventClicked({
    event: { start, end },
    lawyer: { id },
  }: any): Promise<void> {
    try {
      const user = this.store.user();
      if (!(await this.confirmation())) return;
      const guest = user ? user.id : await this.getName();
      const isLoggedIn = !!user;
      this.db.createBooking({ lawyer: id, start, end, guest, isLoggedIn });
    } catch (e) {
      console.error(e);
    }
  }

  private async confirmation(): Promise<boolean> {
    const confirmDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to book this slot?',
    });
    return firstValueFrom(confirmDialog.afterClosed());
  }

  private async getName(): Promise<string> {
    const confirmDialog = this.dialog.open(InputDialogComponent);
    return firstValueFrom(confirmDialog.afterClosed());
  }
}
