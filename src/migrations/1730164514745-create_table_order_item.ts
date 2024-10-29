import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrderItem1730164514745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE IF NOT EXISTS "order_item" (
                    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                    order_id uuid REFERENCES "order"(id),
                    product_id uuid REFERENCES "product"(id),
                    quantity int NOT NULL,
                    unit_price decimal NOT NULL,
                    total decimal NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT now(),
                    updated_at TIMESTAMP NOT NULL DEFAULT now()
                );
    
                `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                DROP TABLE IF EXISTS order_item;
            `);
  }
}
