import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1696864282249 implements MigrationInterface {
    name = 'Init1696864282249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Users_role_enum" AS ENUM('admin', 'customer')`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "role" "public"."Users_role_enum" NOT NULL DEFAULT 'customer', "avatar" character varying NOT NULL DEFAULT 'avatar.jpg', "created_at" TIMESTAMP NOT NULL DEFAULT '"2023-10-09T15:11:29.365Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2023-10-09T15:11:29.365Z"', CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3c3ab3f49a87e6ddb607f3c494" ON "Users" ("email") `);
        await queryRunner.query(`CREATE INDEX "name1-idx" ON "Users" ("first_name") `);
        await queryRunner.query(`CREATE INDEX "name2-idx" ON "Users" ("last_name") `);
        await queryRunner.query(`CREATE TABLE "NoteCategory" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "PK_7595fe11f0ce82e6721a0c638ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_62cbc1c7789696fc0eb00fe5db" ON "NoteCategory" ("category") `);
        await queryRunner.query(`CREATE TABLE "NoteTag" ("id" SERIAL NOT NULL, "tag" character varying NOT NULL, "ownerId" integer, CONSTRAINT "PK_f732f9bf4ec21c4d7394a3dbd74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dad480128131c59a524b96f3f2" ON "NoteTag" ("tag") `);
        await queryRunner.query(`CREATE TYPE "public"."Notes_access_type_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TABLE "Notes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "link" character varying, "access_type" "public"."Notes_access_type_enum" NOT NULL DEFAULT 'private', "created_at" TIMESTAMP NOT NULL DEFAULT '"2023-10-09T15:11:29.534Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT '"2023-10-09T15:11:29.534Z"', "accessUsersId" integer, CONSTRAINT "PK_d4cfe008ad0b9edfe9aee8c7129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_991c0a80e0ddcb1a84cd2c38bd" ON "Notes" ("title") `);
        await queryRunner.query(`ALTER TABLE "NoteCategory" ADD CONSTRAINT "FK_cf611d3676186b2eb9449b31c2b" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "NoteTag" ADD CONSTRAINT "FK_bbdac64b74411237b1623df4038" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Notes" ADD CONSTRAINT "FK_46fa50a9cf24171e7d7fd7c3d39" FOREIGN KEY ("accessUsersId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Notes" DROP CONSTRAINT "FK_46fa50a9cf24171e7d7fd7c3d39"`);
        await queryRunner.query(`ALTER TABLE "NoteTag" DROP CONSTRAINT "FK_bbdac64b74411237b1623df4038"`);
        await queryRunner.query(`ALTER TABLE "NoteCategory" DROP CONSTRAINT "FK_cf611d3676186b2eb9449b31c2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_991c0a80e0ddcb1a84cd2c38bd"`);
        await queryRunner.query(`DROP TABLE "Notes"`);
        await queryRunner.query(`DROP TYPE "public"."Notes_access_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dad480128131c59a524b96f3f2"`);
        await queryRunner.query(`DROP TABLE "NoteTag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62cbc1c7789696fc0eb00fe5db"`);
        await queryRunner.query(`DROP TABLE "NoteCategory"`);
        await queryRunner.query(`DROP INDEX "public"."name2-idx"`);
        await queryRunner.query(`DROP INDEX "public"."name1-idx"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c3ab3f49a87e6ddb607f3c494"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TYPE "public"."Users_role_enum"`);
    }

}
