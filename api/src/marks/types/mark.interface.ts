import { IClass } from 'src/classes/types/class.interface';
import { IUser } from 'src/users/types/user.interface';

export interface IMark {
  id: number;
  student: IUser;
  class: IClass;
  mark: number;
}
