import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../types/user.interface';
import { UserRole } from '../types/user.role.enum';
import { ClassEntity } from '../../classes/entities/class.entity';
import { MarkEntity } from '../../marks/entities/mark.entity';

@Entity({
  name: 'users',
  synchronize: true,
})
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @OneToMany(() => ClassEntity, (class_ent) => class_ent.teacher)
  classes: ClassEntity[];

  @OneToMany(() => MarkEntity, (mark) => mark.student)
  student_marks: MarkEntity[];
}
