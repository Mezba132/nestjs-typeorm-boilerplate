import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  message: string;
  data: T;
  error: boolean;
}

@Injectable()
export class CustomResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: data.success,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        timestamp: new Date(),
        data: data.data,
      })),
    );
  }
}
