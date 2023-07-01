import { UserRole } from './user.role.enum';

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
