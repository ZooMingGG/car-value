import { Controller, UseFilters } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { RpcExceptionFilter } from 'src/filters/rpc-exception.filter';
import { MicroServiceMessagePattern } from './enums/message-pattern.enum';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@UseFilters(new RpcExceptionFilter())
@Serialize(UserDto)
@Controller()
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: MicroServiceMessagePattern.FIND_ONE })
  public findUser(id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: MicroServiceMessagePattern.FIND_ALL_USERS_BY_EMAIL })
  public findAllUsers(email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @MessagePattern({ cmd: MicroServiceMessagePattern.DELETE_USER })
  public removeUser(id: number): Promise<User> {
    return this.usersService.remove(id);
  }

  @MessagePattern({ cmd: MicroServiceMessagePattern.UPDATE_USER })
  public updateUser({ id, attrs }): Promise<User> {
    return this.usersService.update(id, attrs);
  }
}
