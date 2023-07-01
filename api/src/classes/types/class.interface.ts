import { UserEntity } from '../../users/entities/user.entity';

export interface IClass {
  id: number;
  name: string;
  teacher: UserEntity;
}
