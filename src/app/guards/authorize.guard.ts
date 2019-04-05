import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";
import { InitializationService } from "../initialization/initialization.service";
import { Injectable } from "@angular/core";
import { tap, switchMap, filter } from "rxjs/operators";

@Injectable()
export class AuthorizeGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private initializationService: InitializationService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.initializationService.isInitialized$()
      .pipe(
        filter((isInitialized) => isInitialized),
        switchMap(() => this.authorizationService.isAuthenticated$()),
        tap((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }
}