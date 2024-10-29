import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOrder1730164448496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "order" (
                          id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                          user_id uuid REFERENCES "user"(id),
                          status character varying NOT NULL, 
                          observation character varying,
                          total numeric NOT NULL,
                          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                          "updated_at" TIMESTAMP NOT NULL DEFAULT now()
                      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS "order";
      `);
  }
}
