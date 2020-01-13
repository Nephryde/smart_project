import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    if(localStorage.getItem('token') != null) {      
      const clonedReq = request.clone({
        headers : request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedReq).pipe(
        tap(
          succ => { },
          err => {
            if(err.status == 401) {
               localStorage.removeItem('token');
               this.router.navigateByUrl('/#/pages/login');
            }             
          }
        )
      )
    }
    else
      return next.handle(request.clone());
  }
}
