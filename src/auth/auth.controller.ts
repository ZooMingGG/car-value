import { Controller, UseFilters } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import { RpcExceptionFilter } from 'src/filters/rpc-exception.filter';
import { AuthService } from './auth.service';

@UseFilters(new RpcExceptionFilter())
@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'signUp' })
  public createUser(body): Promise<User> {
    return this.authService.signUp(body.email, body.password);
  }

  @MessagePattern({ cmd: 'signIn' })
  public signIn({ email, password }): Promise<User> {
    return this.authService.signIn(email, password);
  }
}
