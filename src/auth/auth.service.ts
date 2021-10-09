import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  public constructor(private readonly usersService: UsersService) {}

  public async signUp(
    email: string,
    password: string,
    session: any,
  ): Promise<User> {
    const candidates = await this.usersService.find(email);

    if (candidates.length) {
      throw new BadRequestException('Email in use.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = `${salt}.${hash.toString('hex')}`;

    const user = await this.usersService.create(email, result);

    session.userId = user.id;

    return user;
  }

  public async signIn(
    email: string,
    password: string,
    session: any,
  ): Promise<User> {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    session.userId = user.id;

    return user;
  }

  public signOut(session: any): void {
    session.userId = null;
  }
}
