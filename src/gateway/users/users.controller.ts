import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/modules/users/dtos/user.dto';
import { CurrentUser } from 'src/modules/users/decorators/current-user.decorator';
import { User } from 'src/modules/users/user.entity';
import { Observable } from 'rxjs';
import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { UsersService } from './users.service';

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
  public findUser(@Param('id') id: string): Observable<User> {
    return this.usersService.findOne(Number(id));
  }

  @Get()
  public findAllUsers(@Query('email') email: string): Observable<User[]> {
    return this.usersService.findAll(email);
  }

  @Delete('/:id')
  public removeUser(@Param('id') id: string): Observable<User> {
    return this.usersService.remove(Number(id));
  }

  @Patch('/:id')
  public updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Observable<User> {
    return this.usersService.update(Number(id), body);
  }
}
