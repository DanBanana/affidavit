export interface Booking {
  id: string;
  guest: string;
  lawyer: string;
  start: Date;
  end: Date;
  isLoggedIn: boolean;
  hasRating: boolean;
}
