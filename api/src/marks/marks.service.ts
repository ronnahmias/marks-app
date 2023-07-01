import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkEntity } from './entities/mark.entity';
import { IStudentMarksTableResponse } from './types/marks.table.interface';
import { FilterMarksDto } from './dto/filter.marks.dto';
import { IJwtUser } from 'src/auth/types/auth.jwt.interface';
import { UserRole } from 'src/users/types/user.role.enum';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(MarkEntity)
    private marksRepository: Repository<MarkEntity>,
  ) {}

  async getMarks(
    filterMarksDto: FilterMarksDto,
    user: IJwtUser,
  ): Promise<IStudentMarksTableResponse> {
    const Query = this.marksRepository
      .createQueryBuilder('marks')
      .skip(filterMarksDto.skip * filterMarksDto.take)
      .take(filterMarksDto.take)
      .leftJoinAndSelect('marks.student', 'student')
      .leftJoinAndSelect('marks.class', 'class')
      .leftJoinAndSelect('class.teacher', 'teacher');

    // filter by role
    switch (user.role) {
      case UserRole.TEACHER:
        Query.where('teacher.id = :id', { id: user.id });
        break;
      case UserRole.STUDENT:
        Query.where('student.id = :id', { id: user.id });
        break;
      case UserRole.MANAGER:
        // only student1 and student2
        Query.where('student.id IN (:...ids)', {
          ids: user.specificUsersIds,
        });
      default:
        break;
    }

    if (filterMarksDto.student_name) {
      Query.andWhere('student.name LIKE :student_name', {
        student_name: `%${filterMarksDto.student_name}%`,
      });
    }

    if (filterMarksDto.class_name) {
      Query.andWhere('class.name LIKE :class_name', {
        class_name: `%${filterMarksDto.class_name}%`,
      });
    }

    if (filterMarksDto.mark) {
      Query.andWhere('marks.mark = :mark', {
        mark: filterMarksDto.mark,
      });
    }

    if (filterMarksDto.teacher_name) {
      Query.andWhere('teacher.name LIKE :teacher_name', {
        teacher_name: `%${filterMarksDto.teacher_name}%`,
      });
    }

    if (filterMarksDto.sortActive && filterMarksDto.sortDirection) {
      let direction: 'ASC' | 'DESC';
      if (filterMarksDto.sortDirection.toUpperCase() === 'ASC') {
        direction = 'ASC';
      } else {
        direction = 'DESC';
      }
      switch (filterMarksDto.sortActive) {
        case 'student_name':
          Query.orderBy('student.name', direction);
          break;
        case 'class_name':
          Query.orderBy('class.name', direction);
          break;
        case 'mark':
          Query.orderBy('marks.mark', direction);
          break;
        case 'teacher_name':
          Query.orderBy('teacher.name', direction);
          break;
      }
    }

    const [data, total] = await Query.getManyAndCount();

    return {
      total,
      data: data.map((mark) => ({
        student_name: mark.student.name,
        teacher_name: mark.class.teacher.name,
        class_name: mark.class.name,
        mark: mark.mark,
      })),
    };
  }
}
