import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersAndLogins1665644634866 implements MigrationInterface {
  name = 'CreateUsersAndLogins1665644634866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "img" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "logins" ("id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "userId" character varying, CONSTRAINT "REL_76c9fe7d77e43d4c1dd2f21ecc" UNIQUE ("userId"), CONSTRAINT "PK_edaf0bf87d9dd178f7a00cc801f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "logins" ADD CONSTRAINT "FK_76c9fe7d77e43d4c1dd2f21ecc2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "logins" DROP CONSTRAINT "FK_76c9fe7d77e43d4c1dd2f21ecc2"`,
    );
    await queryRunner.query(`DROP TABLE "logins"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
