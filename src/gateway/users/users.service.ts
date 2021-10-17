import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UpdateUserPayload } from './models/user.models';
import { User } from '../../users/user.entity';

@Injectable()
export class UsersService {
  public constructor(
    @Inject('MAIN_SERVICE') private readonly mainService: ClientProxy,
  ) {}

  public findOne(id: number): Observable<User> {
    const pattern = { cmd: 'findOne' };

    return this.mainService.send<User, number>(pattern, id);
  }

  public findAll(email: string): Observable<User[]> {
    const pattern = { cmd: 'findAllUsersByEmail' };

    return this.mainService.send<User[], string>(pattern, email);
  }

  public update(id: number, attrs: Partial<User>): Observable<User> {
    const pattern = { cmd: 'updateUser' };
    const payload = { id, attrs };

    return this.mainService.send<User, UpdateUserPayload>(pattern, payload);
  }

  public remove(id: number): Observable<User> {
    const pattern = { cmd: 'deleteUser' };

    return this.mainService.send<User, number>(pattern, id);
  }
}
