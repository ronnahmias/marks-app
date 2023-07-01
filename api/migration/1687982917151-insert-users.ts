import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertUsers1687982917151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('admin@admin.com', '123456', 'Admin Admin', 'ADMIN')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('teacher1@teacher.com', '123456', 'Teacher 1', 'TEACHER')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('teacher2@teacher.com', '123456', 'Teacher 2', 'TEACHER')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('teacher3@teacher.com', '123456', 'Teacher 3', 'TEACHER')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('teacher4@teacher.com', '123456', 'Teacher 4', 'TEACHER')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('student1@student.com', '123456', 'Student 1', 'STUDENT')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('student2@student.com', '123456', 'Student 2', 'STUDENT')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('student3@student.com', '123456', 'Student 3', 'STUDENT')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('student4@student.com', '123456', 'Student 4', 'STUDENT')`,
    );
    await queryRunner.query(
      `INSERT INTO users (email, password, name, role) VALUES ('manager@manager.com', '123456', 'Manager Manager', 'MANAGER')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users`);
  }
}
