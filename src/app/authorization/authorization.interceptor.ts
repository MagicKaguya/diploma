import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let _req = req;

    if (this.authorizationService.isTokenExist()) {
      _req = req.clone({
        setHeaders: {
          'Authorization': this.authorizationService.getToken()
        }
      });
    }

    return next.handle(_req);
  }
}