import { LawyerTimeSlot } from './lawyer-time-slot';
import { User } from './user';

export interface Lawyer extends User {
  timeSlots: LawyerTimeSlot[];
}
