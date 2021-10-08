import {
  Controller,
  Post,
  Body,
  Session
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto, @Session() session: any) {
    return this.authService.signUp(body.email, body.password, session);
  }

  @Post('/signin')
  signIn(@Body() body: CreateUserDto, @Session() session: any) {
    return this.authService.signIn(body.email, body.password, session);
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    this.authService.signOut(session);
  }
}
