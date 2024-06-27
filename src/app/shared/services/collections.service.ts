import { inject, Injectable } from '@angular/core';
import { dbUrl } from '../../../environments/environment';
import { Collections } from '../models/enums';
import {
  collection,
  CollectionReference,
  Firestore,
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private readonly firestore = inject(Firestore);
  private readonly collections = new Map<string, CollectionReference>();

  constructor() {
    this.collections.set(
      Collections.USERS,
      collection(this.firestore, `${dbUrl}/${Collections.USERS}`)
    );
    this.collections.set(
      Collections.BOOKINGS,
      collection(this.firestore, `${dbUrl}/${Collections.BOOKINGS}`)
    );
  }

  getCol(col: Collections): CollectionReference {
    return this.collections.get(col)!;
  }
}
