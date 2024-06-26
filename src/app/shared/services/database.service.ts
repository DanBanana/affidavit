import { Injectable, inject } from '@angular/core';
import { dbUrl } from '../../../environments/environment';
import { Collections } from '../models/enums';
import { User } from '../models/interfaces';
import {
  Firestore,
  onSnapshot,
  DocumentSnapshot,
  setDoc,
  doc,
  Unsubscribe,
  runTransaction,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { CollectionsService } from './collections.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private readonly firestore = inject(Firestore);

  constructor(private col: CollectionsService) {}

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

  onBookingsSnapshot(
    callback: (querySnapshot: QuerySnapshot) => unknown
  ): Unsubscribe {
    return onSnapshot(this.col.getCol(Collections.BOOKINGS), callback);
  }
}
