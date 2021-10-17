import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';
import { User } from 'src/users/user.entity';
import { SignInPayload, SignUpPayload } from './models/auth.models';
import { CreateUserDto } from '../../auth/dtos/create-user.dto';

@Injectable()
export class AuthService {
  public constructor(
    @Inject('MAIN_SERVICE') private readonly mainService: ClientProxy,
  ) {}

  public signUp(body: CreateUserDto, session: any): Observable<User> {
    const pattern = { cmd: 'signUp' };

    return this.mainService.send<User, SignUpPayload>(pattern, body).pipe(
      tap(({ id }) => {
        session.userId = id;
      }),
    );
  }

  public signIn(
    email: string,
    password: string,
    session: any,
  ): Observable<User> {
    const pattern = { cmd: 'signIn' };
    const payload = { email, password };

    return this.mainService.send<User, SignInPayload>(pattern, payload).pipe(
      tap(({ id }) => {
        session.userId = id;
      }),
    );
  }

  public signOut(session: any): void {
    session.userId = null;
  }
}
