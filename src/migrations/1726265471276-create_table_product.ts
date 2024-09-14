import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProduct1726265471276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "product" (
              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "name" character varying NOT NULL,
              "description" character varying NOT NULL,
              "category_id" uuid NOT NULL, 
              "images" text[], 
              "currency" character varying NOT NULL,
              "featured" boolean NOT NULL DEFAULT false,
              "price" numeric NOT NULL,
              "promotion_price" numeric,
              "archived" boolean NOT NULL DEFAULT false,
              "active" boolean NOT NULL DEFAULT true,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              CONSTRAINT "PK_product_id" PRIMARY KEY ("id"),
              CONSTRAINT "FK_categoryId" FOREIGN KEY ("category_id") REFERENCES "category"("id")
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS "product";
          `);
  }
}
