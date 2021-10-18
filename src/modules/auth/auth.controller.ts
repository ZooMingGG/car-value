import { Controller, UseFilters } from '@nestjs/common';
import { User } from 'src/modules/users/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import { RpcExceptionFilter } from 'src/filters/rpc-exception.filter';
import { MicroServiceMessagePattern } from './enums/message-pattern.enum';
import { AuthService } from './auth.service';

@UseFilters(new RpcExceptionFilter())
@Controller()
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: MicroServiceMessagePattern.SIGN_UP })
  public createUser(body): Promise<User> {
    return this.authService.signUp(body.email, body.password);
  }

  @MessagePattern({ cmd: MicroServiceMessagePattern.SIGN_IN })
  public signIn({ email, password }): Promise<User> {
    return this.authService.signIn(email, password);
  }
}
