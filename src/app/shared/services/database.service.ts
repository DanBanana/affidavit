import { Injectable, inject } from '@angular/core';
import { dbUrl } from '../../../environments/environment';
import { Collections, UserRole } from '../models/enums';
import { Booking, Lawyer, User } from '../models/interfaces';
import {
  Firestore,
  onSnapshot,
  DocumentSnapshot,
  setDoc,
  doc,
  Unsubscribe,
  runTransaction,
  QuerySnapshot,
  query,
  where,
  Timestamp,
} from '@angular/fire/firestore';
import { CollectionsService } from './collections.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private readonly todayTimestamp;
  private readonly firestore = inject(Firestore);

  constructor(private col: CollectionsService) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.todayTimestamp = today;
  }

  async createUser(id: string, user: Partial<User>): Promise<void> {
    try {
      await setDoc(doc(this.firestore, dbUrl, 'users', id), user);
    } catch (e) {
      throw e;
    }
  }

  async createUserAfterGoogleLogin(
    id: string,
    user: Partial<User>
  ): Promise<void> {
    try {
      runTransaction(this.firestore, async (transaction) => {
        const userDocRef = doc(this.firestore, dbUrl, 'users', id);
        const userDoc = await transaction.get(userDocRef);

        // If user document already exists, then no need to anymore.
        if (userDoc.exists()) return;
        await transaction.set(userDocRef, user);
      });
    } catch (e) {
      throw e;
    }
  }

  onUserSnapshot(
    id: string,
    callback: (doc: DocumentSnapshot) => unknown
  ): Unsubscribe {
    return onSnapshot(doc(this.col.getCol(Collections.USERS), id), callback);
  }

  onLawyersSnapshot(callback: (lawyers: Lawyer[]) => unknown): Unsubscribe {
    const colQuery = query(
      this.col.getCol(Collections.USERS),
      where('role', '==', UserRole.LAWYER)
    );
    return onSnapshot(colQuery, (querySnapshot) => {
      callback(this.queryToObjectHelper<Lawyer>(querySnapshot));
    });
  }

  onBookingsSnapshot(callback: (bookings: Booking[]) => unknown): Unsubscribe {
    return onSnapshot(
      this.col.getCol(Collections.BOOKINGS),
      (querySnapshot) => {
        callback(this.queryToObjectHelper<Booking>(querySnapshot));
      }
    );
  }

  onBookingsByLawyerSnapshot(
    lawyer: string,
    callback: (bookings: Booking[]) => unknown
  ): Unsubscribe {
    const colQuery = query(
      this.col.getCol(Collections.BOOKINGS),
      where('lawyer', '==', lawyer),
      where('start', '>=', this.todayTimestamp)
    );
    return onSnapshot(colQuery, (querySnapshot) => {
      callback(this.queryToObjectHelper<Booking>(querySnapshot));
    });
  }

  private queryToObjectHelper<T>(querySnapshot: QuerySnapshot): T[] {
    const convertTimestamps = (obj: any) => {
      for (let key in obj) {
        if (obj[key] instanceof Timestamp) {
          obj[key] = (obj[key] as Timestamp).toDate();
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          convertTimestamps(obj[key]);
        }
      }
    };
    return querySnapshot.docs.map((item) => {
      const data = item.data();
      convertTimestamps(data);
      return { ...data, id: item.id } as T;
    });
  }
}
