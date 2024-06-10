import { Injectable, inject } from '@angular/core';
import { AppStore } from '.';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Auth, signOut } from '@angular/fire/auth';
import { LoginCredentials, User } from '../models/interfaces';
import {
  Firestore,
  Unsubscribe,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { dbUrl } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Dependency Injections.
  private readonly store = inject(AppStore);
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  private usersCollection = collection(this.firestore, `${dbUrl}/users`);
  private userDocUnsub: Unsubscribe | null = null;

  constructor() {
    this.onAuthStateChanged();
  }

  /**
   * Signs current user out.
   ** Sets `user` in store to null.
   ** Unsubscribes `userDocUnsub`.
   */
  async signOut(): Promise<void> {
    try {
      this.setAuthLoading(true);
      await signOut(this.auth);
      this.setUser(null);
      if (this.userDocUnsub) this.userDocUnsub();
    } catch (e) {
      console.error(e);
    } finally {
      this.setAuthLoading(false);
    }
  }

  /**
   * Login with username and password.
   ** If a successful login, `onAuthStateChanged` will update the `appStore` with data of type `User`.
   * @param cred
   * @returns A promise or error.
   */
  async signInWithEmailAndPassword(cred: LoginCredentials): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, cred.id, cred.password);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Listens to auth state chages and updates `appStore` with data of type `User | null`.
   ** For every auth state change, a new
   */
  private onAuthStateChanged(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.setAuthLoading(true);
      if (this.userDocUnsub) this.userDocUnsub();
      if (user == null || user == undefined) {
        return this.setAuthLoading(false);
      }
      this.userDocUnsub = onSnapshot(
        doc(this.usersCollection, user?.uid),
        (doc) => {
          this.setAuthLoading(false);
          if (!doc.exists()) return;
          const docData = doc.data()!;
          this.setUser({
            id: user?.uid!,
            email: user?.email!,
            fname: docData['fname'],
            lname: docData['lname'],
            role: docData['role'],
          });
        }
      );
    });
  }

  private setUser(user: User | null): void {
    this.store.setUser(user);
  }

  private setAuthLoading(authLoading: boolean): void {
    this.store.setAuthLoading(authLoading);
  }
}
