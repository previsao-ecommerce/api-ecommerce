import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCategory1726265415854 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "category" (
              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "name" character varying NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              CONSTRAINT "PK_category_id" PRIMARY KEY ("id")
            )
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "category"
          `);
  }
}
