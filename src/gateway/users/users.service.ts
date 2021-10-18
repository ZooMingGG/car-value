import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MicroServiceMessagePattern } from 'src/modules/users/enums/message-pattern.enum';
import { User } from 'src/modules/users/user.entity';
import { UpdateUserPayload } from './models/user.models';

@Injectable()
export class UsersService {
  public constructor(
    @Inject('MAIN_SERVICE') private readonly mainService: ClientProxy,
  ) {}

  public findOne(id: number): Observable<User> {
    const pattern = { cmd: MicroServiceMessagePattern.FIND_ONE };

    return this.mainService.send<User, number>(pattern, id);
  }

  public findAll(email: string): Observable<User[]> {
    const pattern = { cmd: MicroServiceMessagePattern.FIND_ALL_USERS_BY_EMAIL };

    return this.mainService.send<User[], string>(pattern, email);
  }

  public update(id: number, attrs: Partial<User>): Observable<User> {
    const pattern = { cmd: MicroServiceMessagePattern.UPDATE_USER };
    const payload = { id, attrs };

    return this.mainService.send<User, UpdateUserPayload>(pattern, payload);
  }

  public remove(id: number): Observable<User> {
    const pattern = { cmd: MicroServiceMessagePattern.DELETE_USER };

    return this.mainService.send<User, number>(pattern, id);
  }
}
