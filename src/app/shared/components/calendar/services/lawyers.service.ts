import { Injectable, signal } from '@angular/core';
import { CalendarViewConfig } from '../../../models/enums';
import { DatabaseService } from '../../../services';
import { Lawyer } from '../../../models/interfaces';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Unsubscribe } from '@angular/fire/firestore';

@Injectable()
export class LawyersService {
  readonly unsub = new Subject<void>();
  readonly form = new FormControl();
  readonly lawyers = signal<Lawyer[]>([]);
  readonly currLawyer = signal<Lawyer | null>(null);

  constructor(private db: DatabaseService) {
    this.form.valueChanges.pipe(takeUntil(this.unsub)).subscribe((val) => {
      this.currLawyer.set(this.lawyers().find((item) => item.id === val)!);
    });
  }

  getLawyers(viewConfig: CalendarViewConfig): Unsubscribe | void {
    if (viewConfig !== CalendarViewConfig.BOOKING) return;
    return this.db.onLawyersSnapshot((lawyers) => this.lawyers.set(lawyers));
  }
}
