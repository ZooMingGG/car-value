import { RpcException } from '@nestjs/microservices';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

@Catch(HttpException)
export class RpcExceptionFilter implements ExceptionFilter {
  public catch(
    exception: HttpException,
    host: ArgumentsHost,
  ): Observable<string | object> {
    return throwError(() =>
      new RpcException(exception.getResponse()).getError(),
    );
  }
}
