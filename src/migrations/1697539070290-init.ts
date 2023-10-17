import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697539070290 implements MigrationInterface {
    name = 'Init1697539070290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'customer')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "role" "public"."users_role_enum" NOT NULL DEFAULT 'customer', "access_token" character varying, "service_token" character varying, "avatar" character varying NOT NULL DEFAULT 'avatar.jpg', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "email-idx" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "access_token-idx" ON "users" ("access_token") `);
        await queryRunner.query(`CREATE INDEX "service_token-idx" ON "users" ("service_token") `);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "tag" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "tag_title-idx" ON "tags" ("tag") `);
        await queryRunner.query(`CREATE TYPE "public"."notes_access_type_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "link" character varying, "access_type" "public"."notes_access_type_enum" NOT NULL DEFAULT 'private', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "accessUsersId" integer, CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "note_title-idx" ON "notes" ("title") `);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "category" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "category_title-idx" ON "categories" ("category") `);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_8ce74535e58cbab22452bc758cb" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_672f77ee0709bc46e3495fd3e3f" FOREIGN KEY ("accessUsersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_5693ea772e9d87a3c552101b832" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_5693ea772e9d87a3c552101b832"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_672f77ee0709bc46e3495fd3e3f"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_8ce74535e58cbab22452bc758cb"`);
        await queryRunner.query(`DROP INDEX "public"."category_title-idx"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "public"."note_title-idx"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TYPE "public"."notes_access_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."tag_title-idx"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP INDEX "public"."service_token-idx"`);
        await queryRunner.query(`DROP INDEX "public"."access_token-idx"`);
        await queryRunner.query(`DROP INDEX "public"."email-idx"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
