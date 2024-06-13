import { UserRole } from '../enums';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  displayName?: string;
  fname?: string;
  lname?: string;
}
