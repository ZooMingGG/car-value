import { Body, Controller, Post, Session } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { User } from 'src/modules/users/user.entity';
import { CreateUserDto } from 'src/modules/auth/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public signUp(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Observable<User> {
    return this.authService.signUp(body, session);
  }

  @Post('/signin')
  public signIn(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Observable<User> {
    return this.authService.signIn(body.email, body.password, session);
  }

  @Post('/signout')
  public signOut(@Session() session: any): void {
    this.authService.signOut(session);
  }
}
