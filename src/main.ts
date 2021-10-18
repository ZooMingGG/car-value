import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { GatewayModule } from './gateway/gateway.module';

require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}` });

async function bootstrap(): Promise<void> {
  const gateway = await NestFactory.create(GatewayModule);
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.MICROSERVICE_HOST,
      port: Number(process.env.MICROSERVICE_PORT),
    },
  });
  await app.listen();
  await gateway.listen(3000);
}
bootstrap();
