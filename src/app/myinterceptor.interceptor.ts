import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class MyinterceptorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifyrequest = request;

    // Determine which token to use based on the request URL or headers
    if (request.url.includes('/party/')) {
      const token = this.auth.getToken('Token');
      if (token) {
        modifyrequest = request.clone({
          setHeaders: {
            Authorization: `Token ${token}`
          }
        });
      }
    } else if (request.url.includes('/logout/')) {
      const token = this.auth.getToken('Token');
      if (token) {
        modifyrequest = request.clone({
          setHeaders: {
            Authorization: `Token ${token}`
          }
        });
      }
    }

    return next.handle(modifyrequest);
  }
}
