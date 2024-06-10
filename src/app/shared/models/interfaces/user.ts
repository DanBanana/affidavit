import { UserRole } from '../enums';

export interface User {
  id: string;
  email: string;
  fname: string;
  lname: string;
  role: UserRole;
}
