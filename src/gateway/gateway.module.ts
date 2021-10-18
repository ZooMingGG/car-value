import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { APP_PIPE } from '@nestjs/core';
import { CurrentUserMiddleware } from 'src/users/middlewares/current-user.middleware';
import { AuthController } from './auth/auth.controller';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

const coockieSession = require('cookie-session');
require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}` });

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.MICROSERVICE_HOST,
          port: Number(process.env.MICROSERVICE_PORT),
        },
      },
    ]),
  ],
  controllers: [UsersController, AuthController, ReportsController],
  providers: [
    UsersService,
    AuthService,
    ReportsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class GatewayModule {
  private configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(coockieSession({ keys: ['asdfasfd'] }), CurrentUserMiddleware)
      .forRoutes('*');
  }
}
