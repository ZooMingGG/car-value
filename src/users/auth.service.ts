import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signUp(email: string, password: string, session: any) {
    const candidates = await this.usersService.find(email);

    if (candidates.length) {
      throw new BadRequestException('Email in use.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(email, result);

    session.userId = user.id;

    return user;
  }

  async signIn(email: string, password: string, session: any) {
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

  signOut(session: any) {
    session.userId = null;
  }
}
