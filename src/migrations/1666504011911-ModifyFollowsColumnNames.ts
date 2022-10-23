import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyFollowsColumnNames1666504011911
  implements MigrationInterface
{
  name = 'ModifyFollowsColumnNames1666504011911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_9d4de65b9416f40fbf335da40a5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_4bfcccd7c37fde5bc3b97deb07d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4bfcccd7c37fde5bc3b97deb07"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9d4de65b9416f40fbf335da40a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "PK_1fbb5622248249838d3006905e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "PK_4bfcccd7c37fde5bc3b97deb07d" PRIMARY KEY ("usersId_2")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP COLUMN "usersId_1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "PK_4bfcccd7c37fde5bc3b97deb07d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP COLUMN "usersId_2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD "follower" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "PK_c9465a633b08ecab5c9b92dc213" PRIMARY KEY ("follower")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD "following" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "PK_c9465a633b08ecab5c9b92dc213"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "PK_614e6dc7a9957a8498bd94b1153" PRIMARY KEY ("follower", "following")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c9465a633b08ecab5c9b92dc21" ON "users_follows_users" ("follower") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_654599dca4c1f991818c4643fa" ON "users_follows_users" ("following") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_c9465a633b08ecab5c9b92dc213" FOREIGN KEY ("follower") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_654599dca4c1f991818c4643fa8" FOREIGN KEY ("following") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_654599dca4c1f991818c4643fa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_c9465a633b08ecab5c9b92dc213"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_654599dca4c1f991818c4643fa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c9465a633b08ecab5c9b92dc21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "PK_614e6dc7a9957a8498bd94b1153"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "PK_c9465a633b08ecab5c9b92dc213" PRIMARY KEY ("follower")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP COLUMN "following"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "PK_c9465a633b08ecab5c9b92dc213"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP COLUMN "follower"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD "usersId_2" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "PK_4bfcccd7c37fde5bc3b97deb07d" PRIMARY KEY ("usersId_2")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD "usersId_1" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" DROP CONSTRAINT "PK_4bfcccd7c37fde5bc3b97deb07d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "PK_1fbb5622248249838d3006905e5" PRIMARY KEY ("usersId_1", "usersId_2")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d4de65b9416f40fbf335da40a" ON "users_follows_users" ("usersId_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4bfcccd7c37fde5bc3b97deb07" ON "users_follows_users" ("usersId_2") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_4bfcccd7c37fde5bc3b97deb07d" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_9d4de65b9416f40fbf335da40a5" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
