import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyUsersFollowsColumnFollowingNameToFollowed1666504883431 implements MigrationInterface {
    name = 'ModifyUsersFollowsColumnFollowingNameToFollowed1666504883431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_654599dca4c1f991818c4643fa8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_654599dca4c1f991818c4643fa"`);
        await queryRunner.query(`ALTER TABLE "users_follows_users" RENAME COLUMN "following" TO "followed"`);
        await queryRunner.query(`ALTER TABLE "users_follows_users" RENAME CONSTRAINT "PK_614e6dc7a9957a8498bd94b1153" TO "PK_01cf75a47da5526d9874ceb3ee8"`);
        await queryRunner.query(`CREATE INDEX "IDX_4b20293eddcb7ec31528c238c2" ON "users_follows_users" ("followed") `);
        await queryRunner.query(`ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_4b20293eddcb7ec31528c238c2c" FOREIGN KEY ("followed") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_follows_users" DROP CONSTRAINT "FK_4b20293eddcb7ec31528c238c2c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b20293eddcb7ec31528c238c2"`);
        await queryRunner.query(`ALTER TABLE "users_follows_users" RENAME CONSTRAINT "PK_01cf75a47da5526d9874ceb3ee8" TO "PK_614e6dc7a9957a8498bd94b1153"`);
        await queryRunner.query(`ALTER TABLE "users_follows_users" RENAME COLUMN "followed" TO "following"`);
        await queryRunner.query(`CREATE INDEX "IDX_654599dca4c1f991818c4643fa" ON "users_follows_users" ("following") `);
        await queryRunner.query(`ALTER TABLE "users_follows_users" ADD CONSTRAINT "FK_654599dca4c1f991818c4643fa8" FOREIGN KEY ("following") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
