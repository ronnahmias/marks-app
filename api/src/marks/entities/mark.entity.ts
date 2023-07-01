import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IMark } from '../types/mark.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { ClassEntity } from '../../classes/entities/class.entity';

@Entity({
  name: 'marks',
  synchronize: true,
})
export class MarkEntity implements IMark {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.student_marks, {
    nullable: false,
  })
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @ManyToOne(() => ClassEntity, (class_ent) => class_ent.class_marks, {
    nullable: false,
  })
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @Column({
    type: 'int',
  })
  mark: number;
}
