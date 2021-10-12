import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { generateAdminSeed } from '../seeds/admin.seed';

export class SeedPermissionsAndRoles1556357483083
  implements MigrationInterface
{
  public async up(_: QueryRunner): Promise<any> {
    const adminSeed = await generateAdminSeed();
    
    await getRepository('user').save(adminSeed);
  }

  public async down(_: QueryRunner): Promise<any> {}
}
