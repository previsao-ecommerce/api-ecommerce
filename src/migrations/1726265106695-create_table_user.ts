import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1726265106695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS "user" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying NOT NULL,
          "cpf_cnpj" character varying NOT NULL,
          "email" character varying NOT NULL,
          "password" character varying NOT NULL,
          "address_id" uuid NOT NULL,
          "phone" character varying NOT NULL,
          "image_url" character varying, 
          "user_type" integer NOT NULL, 
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"),
          CONSTRAINT "FK_address_id" FOREIGN KEY ("address_id") REFERENCES "address"("id") 
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "user";
          `);
  }
}
