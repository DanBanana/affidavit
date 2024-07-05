import { Injectable, inject } from '@angular/core';
import { dbUrl } from '../../../environments/environment';
import { Collections, UserRole } from '../models/enums';
import { Booking, Lawyer, Rating, User } from '../models/interfaces';
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
  addDoc,
  collection,
  writeBatch,
  Transaction,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private readonly todayTimestamp;
  private readonly firestore = inject(Firestore);

  constructor() {
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

  onUserSnapshot(id: string, callback: (user: User) => unknown): Unsubscribe {
    return onSnapshot(
      doc(this.firestore, dbUrl, Collections.USERS, id),
      (docSnapshot) => {
        callback(Helper.docToObject<User>(docSnapshot));
      }
    );
  }

  onLawyersSnapshot(callback: (lawyers: Lawyer[]) => unknown): Unsubscribe {
    const colQuery = query(
      collection(this.firestore, dbUrl, Collections.USERS),
      where('role', '==', UserRole.LAWYER)
    );
    return onSnapshot(colQuery, (querySnapshot) => {
      callback(Helper.queryToObject<Lawyer>(querySnapshot));
    });
  }

  onBookingSnapshot(
    id: string,
    callback: (booking: Booking) => unknown
  ): Unsubscribe {
    return onSnapshot(
      doc(this.firestore, dbUrl, Collections.BOOKINGS, id),
      (docSnapshot) => callback(Helper.docToObject<Booking>(docSnapshot))
    );
  }

  onBookingsSnapshot(callback: (bookings: Booking[]) => unknown): Unsubscribe {
    return onSnapshot(
      collection(this.firestore, dbUrl, Collections.BOOKINGS),
      (querySnapshot) => {
        callback(Helper.queryToObject<Booking>(querySnapshot));
      }
    );
  }

  onBookingsByLawyerSnapshot(
    lawyer: string,
    callback: (bookings: Booking[]) => unknown
  ): Unsubscribe {
    const colQuery = query(
      collection(this.firestore, dbUrl, Collections.BOOKINGS),
      where('lawyer', '==', lawyer),
      where('start', '>=', this.todayTimestamp)
    );
    return onSnapshot(colQuery, (querySnapshot) => {
      callback(Helper.queryToObject<Booking>(querySnapshot));
    });
  }

  async createBooking(booking: Partial<Booking>): Promise<void> {
    await addDoc(
      collection(this.firestore, dbUrl, Collections.BOOKINGS),
      booking
    );
  }

  async createRating(
    rating: Partial<Rating>,
    bookingId: string
  ): Promise<void> {
    try {
      await runTransaction(this.firestore, async (transaction) => {
        await this.updateLawyerRating(transaction, rating);

        // Create new rating document.
        transaction.set(
          doc(collection(this.firestore, dbUrl, Collections.RATINGS)),
          rating
        );

        // Set booking's `hasRating` field to true;
        transaction.update(
          doc(this.firestore, dbUrl, Collections.BOOKINGS, bookingId),
          { hasRating: true }
        );
      });
    } catch (e) {
      console.error(e);
    }
  }

  private async updateLawyerRating(
    transaction: Transaction,
    rating: Partial<Rating>
  ): Promise<void> {
    const lawyer = await transaction.get(
      doc(this.firestore, dbUrl, Collections.USERS, rating.lawyer!)
    );
    const lawyerRatings = lawyer.data()!['ratings'];
    const ratings = lawyerRatings
      ? [...lawyerRatings, ...[rating.stars]]
      : [rating.stars];
    const averageRating =
      ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
    transaction.update(
      doc(this.firestore, dbUrl, Collections.USERS, rating.lawyer!),
      { ratings, averageRating }
    );
  }
}

class Helper {
  static docToObject<T>(docSnapshot: DocumentSnapshot): T {
    const data = docSnapshot.data();
    this.convertTimestamps(data);
    return { ...data, id: docSnapshot.id } as T;
  }

  static queryToObject<T>(querySnapshot: QuerySnapshot): T[] {
    return querySnapshot.docs.map((item) => this.docToObject<T>(item));
  }

  private static convertTimestamps(obj: any): void {
    for (let key in obj) {
      if (obj[key] instanceof Timestamp) {
        obj[key] = (obj[key] as Timestamp).toDate();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.convertTimestamps(obj[key]);
      }
    }
  }
}
