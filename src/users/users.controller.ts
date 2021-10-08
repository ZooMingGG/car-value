import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  Body,
  NotFoundException,
  Session,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from './../guards/auth.guard';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService, private authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Get('/getme')
  getMe(@CurrentUser() user: User) {
    return user;
  }

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

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
