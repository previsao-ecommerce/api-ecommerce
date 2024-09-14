import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1726265056443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "address" (
              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "cep" character varying NOT NULL,
              "street" character varying NOT NULL,
              "number" integer NOT NULL,
              "district" character varying NOT NULL,
              "city" character varying NOT NULL,
              "state" character varying NOT NULL,
              "complement" character varying, -- Pode ser nulo, pois é opcional
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              CONSTRAINT "PK_1234567890" PRIMARY KEY ("id")
            );
      
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "address";
          `);
  }
}
