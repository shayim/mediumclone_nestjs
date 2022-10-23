import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddArticlAuthor1666085979344 implements MigrationInterface {
  name = 'AddArticlAuthor1666085979344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "authorId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "UQ_65d9ccc1b02f4d904e90bd76a34" UNIQUE ("authorId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`,
    );
    await queryRunner.query(
      `ALTER TABLE "articles" DROP CONSTRAINT "UQ_65d9ccc1b02f4d904e90bd76a34"`,
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "authorId"`);
  }
}
