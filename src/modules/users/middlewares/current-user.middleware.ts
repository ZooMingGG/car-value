import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { UsersService } from 'src/gateway/users/users.service';
import { User } from '../user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  public constructor(private readonly usersService: UsersService) {}

  public async use(
    req: ExpressRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId).toPromise();
      req.currentUser = user;
    }

    next();
  }
}
