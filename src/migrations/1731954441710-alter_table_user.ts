import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableUser1731954441710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN state int;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN state;
        `);
  }
}
