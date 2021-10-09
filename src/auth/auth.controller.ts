import { Controller, Post, Body, Session } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public createUser(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    return this.authService.signUp(body.email, body.password, session);
  }

  @Post('/signin')
  public signIn(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    return this.authService.signIn(body.email, body.password, session);
  }

  @Post('/signout')
  public signOut(@Session() session: any): void {
    this.authService.signOut(session);
  }
}
