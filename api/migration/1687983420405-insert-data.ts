import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertData1687983420405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // // insert marks
    await queryRunner.query(
      `INSERT INTO public.marks (id, mark, student_id, class_id) VALUES (1, 85, 6, 1)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id, mark, student_id, class_id) VALUES (2, 78, 6, 2)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id, mark, student_id, class_id) VALUES (3, 85, 6, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id, mark, student_id, class_id) VALUES (4, 89, 6, 4)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id, mark, student_id, class_id) VALUES (5, 85, 6, 5)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id,mark, student_id, class_id) VALUES (6,95, 7, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id,mark, student_id, class_id) VALUES (7,95, 8, 3)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id,mark, student_id, class_id) VALUES (8,77, 8, 4)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id,mark, student_id, class_id) VALUES (9,99, 9,5)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id,mark, student_id, class_id) VALUES (10,99, 7,5)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id,mark, student_id, class_id) VALUES (11,80, 9,1)`,
    );
    await queryRunner.query(
      `INSERT INTO public.marks (id,mark, student_id, class_id) VALUES (12,85, 9,4)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM marks`);
  }
}
