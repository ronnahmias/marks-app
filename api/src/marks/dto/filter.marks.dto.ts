import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { IQueryMarks } from '../types/query.marks.interface';

export class FilterMarksDto implements IQueryMarks {
  @IsOptional()
  @IsNumberString()
  skip: number;

  @IsOptional()
  @IsNumberString()
  take: number;

  @IsOptional()
  @IsString()
  student_name: string;

  @IsOptional()
  @IsString()
  class_name: string;

  @IsOptional()
  @IsNumberString()
  mark: number;

  @IsOptional()
  @IsString()
  teacher_name: string;

  @IsOptional()
  @IsString()
  sortDirection: string;

  @IsOptional()
  @IsString()
  sortActive: string;
}
