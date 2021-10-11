import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsAdminColumn1633960117640 implements MigrationInterface {
    name = 'AddIsAdminColumn1633960117640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
    }

}
