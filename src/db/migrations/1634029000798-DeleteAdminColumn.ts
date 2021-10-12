import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteAdminColumn1634029000798 implements MigrationInterface {
    name = 'DeleteAdminColumn1634029000798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isAdmin" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "isAdmin" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT true`);
    }

}
