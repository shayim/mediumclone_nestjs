import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class SeedTags1666492253735 implements MigrationInterface {
  name = 'SeedTags1666492253735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags(name) VALUES('${faker.lorem.word()}'),('${faker.lorem.word()}'),('${faker.lorem.word()}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('');
  }
}
