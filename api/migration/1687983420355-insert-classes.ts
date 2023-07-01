import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertClasses1687983420355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER SEQUENCE classes_id_seq RESTART WITH 1`);
    // insert classes
    await queryRunner.query(
      `INSERT INTO "classes" (name, teacher_id) VALUES ('Class 1', 2)`,
    );
    await queryRunner.query(
      `INSERT INTO "classes" (name, teacher_id) VALUES ('Class 2', 3)`,
    );
    await queryRunner.query(
      `INSERT INTO "classes" (name, teacher_id) VALUES ('Class 3', 2)`,
    );
    await queryRunner.query(
      `INSERT INTO "classes" (name, teacher_id) VALUES ('Class 4', 4)`,
    );
    await queryRunner.query(
      `INSERT INTO "classes" (name, teacher_id) VALUES ('Class 5', 5)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM classes`);
  }
}
