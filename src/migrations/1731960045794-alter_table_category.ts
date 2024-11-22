import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCategory1731960045794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "category"
            ADD COLUMN number int;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "category"
            DROP COLUMN number;
        `);
  }
}
