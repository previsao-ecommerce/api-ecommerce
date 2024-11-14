import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableOrderItem1731364030846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE order_item
            ADD COLUMN product_category_id uuid;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE order_item
            DROP COLUMN product_category_id;
        `);
  }
}
