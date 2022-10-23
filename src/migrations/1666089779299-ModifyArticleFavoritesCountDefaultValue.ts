import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyArticleFavoritesCountDefaultValue1666089779299
  implements MigrationInterface
{
  name = 'ModifyArticleFavoritesCountDefaultValue1666089779299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "favoritesCount" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" ALTER COLUMN "favoritesCount" DROP DEFAULT`,
    );
  }
}
