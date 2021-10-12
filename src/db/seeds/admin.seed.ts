import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}` });

const scrypt = promisify(_scrypt);

interface AdminSeed {
  email: string;
  password: string;
  isAdmin: true;
}

export const generateAdminSeed = async (): Promise<AdminSeed> => {
  const salt = randomBytes(8).toString('hex');

  const hash = (await scrypt(
    process.env.DB_ADMIN_PASSWORD,
    salt,
    32,
  )) as Buffer;

  const hashedpassword = `${salt}.${hash.toString('hex')}`;

  return {
    email: 'admin@email.com',
    password: hashedpassword,
    isAdmin: true,
  };
};
