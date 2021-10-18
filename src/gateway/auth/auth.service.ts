import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap } from 'rxjs';
import { User } from 'src/modules/users/user.entity';
import { CreateUserDto } from 'src/modules/auth/dtos/create-user.dto';
import { MicroServiceMessagePattern } from 'src/modules/auth/enums/message-pattern.enum';
import { SignInPayload, SignUpPayload } from './models/auth.models';

@Injectable()
export class AuthService {
  public constructor(
    @Inject('MAIN_SERVICE') private readonly mainService: ClientProxy,
  ) {}

  public signUp(body: CreateUserDto, session: any): Observable<User> {
    const pattern = { cmd: MicroServiceMessagePattern.SIGN_UP };

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
    const pattern = { cmd: MicroServiceMessagePattern.SIGN_IN };
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
