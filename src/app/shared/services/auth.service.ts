import { Injectable, inject } from '@angular/core';
import { AppStore, DatabaseService, NavigationService } from '.';
import { LoginCredentials, User } from '../models/interfaces';
import { Unsubscribe } from '@angular/fire/firestore';
import {
  Auth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { UserRole } from '../models/enums';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly store = inject(AppStore);
  private readonly auth = inject(Auth);
  private readonly googleAuth = new GoogleAuthProvider();
  private userDocUnsub: Unsubscribe | null = null;

  constructor(private db: DatabaseService, private nav: NavigationService) {}

  /**
   * Listens to auth state chages and updates `appStore` with data of type `User | null`.
   ** For every auth state change (with `user` or `null`), `user` field in store will be updated to that value.
   */
  onAuthStateChanged(): void {
    onAuthStateChanged(this.auth, (user) => {
      this.setAuthLoading(true);
      if (this.userDocUnsub) this.userDocUnsub();
      if (user == null || user == undefined) return this.setAuthLoading(false);
      this.userDocUnsub = this.db.onUserSnapshot(user?.uid, (doc) => {
        this.setAuthLoading(false);
        if (!doc.exists()) return;
        const docData = doc.data()!;
        this.setUser({
          id: user?.uid!,
          email: user?.email!,
          displayName: docData['displayName'],
          fname: docData['fname'],
          lname: docData['lname'],
          role: docData['role'],
        });
      });
    });
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
      this.nav.navigateToHome();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Create user with username and password.
   * @param cred User credentials of type `LoginCredentials`.
   */
  async createUserWithEmailAndPassword(
    { id, password }: LoginCredentials,
    { fname, lname }: Partial<User>
  ): Promise<void> {
    try {
      this.setAuthLoading(true);
      const userCred = await createUserWithEmailAndPassword(
        this.auth,
        id,
        password
      );
      this.nav.navigateToHome();
      await this.db.createUser(userCred.user.uid, {
        fname,
        lname,
        email: id,
        role: UserRole.GUEST,
      });
    } catch (e) {
      this.setAuthLoading(false);
      throw e;
    }
  }

  /**
   * Login with username and password.
   ** If a successful login, `onAuthStateChanged` will update the `appStore` with data of type `User`.
   * @param cred User credentials of type `LoginCredentials`.
   */
  async signInWithEmailAndPassword(cred: LoginCredentials): Promise<void> {
    try {
      this.setAuthLoading(true);
      await signInWithEmailAndPassword(this.auth, cred.id, cred.password);
      this.nav.navigateToHome();
    } catch (e) {
      this.setAuthLoading(false);
      throw e;
    }
  }

  /**
   * Login through Google authentication.
   */
  async signInWithGooglePopup(): Promise<void> {
    try {
      const userCred = await signInWithPopup(this.auth, this.googleAuth);
      this.nav.navigateToHome();
      await this.db.createUserAfterGoogleLogin(userCred.user.uid, {
        displayName: userCred.user.displayName!,
        email: userCred.user.email!,
        role: UserRole.GUEST,
      });
    } catch (e) {
      throw e;
    }
  }

  private setUser(user: User | null): void {
    this.store.setUser(user);
  }

  private setAuthLoading(authLoading: boolean): void {
    this.store.setAuthLoading(authLoading);
  }
}
