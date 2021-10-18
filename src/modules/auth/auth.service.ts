import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/modules/users/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { MicroServiceMessagePattern } from './enums/message-pattern.enum';
import { CraeteUserPayload } from './models/auth.models';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  public constructor(
    @Inject('MAIN_SERVICE') private readonly mainService: ClientProxy,
  ) {}

  public async signUp(email: string, password: string): Promise<User> {
    const candidates = await this.mainService
      .send<User[], string>(
        { cmd: MicroServiceMessagePattern.FIND_ALL_USERS_BY_EMAIL },
        email,
      )
      .toPromise();

    if (candidates.length) {
      throw new BadRequestException('Email in use.');
    }

    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = `${salt}.${hash.toString('hex')}`;

    const user = await this.mainService
      .send<User, CraeteUserPayload>(
        { cmd: MicroServiceMessagePattern.CREATE_USER },
        { email, password: result },
      )
      .toPromise();

    return user;
  }

  public async signIn(email: string, password: string): Promise<User> {
    const [user] = await this.mainService
      .send<User[], string>(
        { cmd: MicroServiceMessagePattern.FIND_ALL_USERS_BY_EMAIL },
        email,
      )
      .toPromise();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }
}
