import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyArticleTagsNullable1666089662538
  implements MigrationInterface
{
  name = 'ModifyArticleTagsNullable1666089662538';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "tagList" SET DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "tagList" DROP DEFAULT`,
    );
  }
}
