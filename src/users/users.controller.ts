import { Controller, UseFilters } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MessagePattern } from '@nestjs/microservices';
import { RpcExceptionFilter } from 'src/filters/rpc-exception.filter';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@UseFilters(new RpcExceptionFilter())
@Serialize(UserDto)
@Controller()
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'findOne' })
  public findUser(id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'findAllUsersByEmail' })
  public findAllUsers(email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  public removeUser(id: number): Promise<User> {
    return this.usersService.remove(id);
  }

  @MessagePattern({ cmd: 'updateUser' })
  public updateUser({ id, attrs }): Promise<User> {
    return this.usersService.update(id, attrs);
  }
}
