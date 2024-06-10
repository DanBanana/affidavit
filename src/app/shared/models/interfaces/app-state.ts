import { User } from './user';

export interface AppState {
  user: User | null;
  authLoading: boolean;
}
