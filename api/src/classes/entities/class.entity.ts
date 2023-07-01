import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IClass } from '../types/class.interface';
import { UserEntity } from '../../users/entities/user.entity';
import { MarkEntity } from '../../marks/entities/mark.entity';

@Entity({
  name: 'classes',
  synchronize: true,
})
export class ClassEntity implements IClass {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
    length: 255,
  })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.classes, {
    nullable: false,
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: UserEntity;

  @OneToMany(() => MarkEntity, (mark) => mark.class)
  class_marks: MarkEntity[];
}
