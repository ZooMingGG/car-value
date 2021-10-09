import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './user.entity';

@Controller('user')
@Serialize(UserDto)
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/getme')
  public getMe(@CurrentUser() user: User): User {
    return user;
  }

  @Get('/:id')
  public findUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }

  @Get()
  public findAllUsers(@Query('email') email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  public removeUser(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(Number(id));
  }

  @Patch('/:id')
  public updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(Number(id), body);
  }
}
