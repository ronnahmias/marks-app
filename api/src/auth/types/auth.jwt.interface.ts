import { UserRole } from 'src/users/types/user.role.enum';

export interface IJwtUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  specificUsersIds?: number[];
}
