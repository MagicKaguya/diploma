import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizationService } from "../authorization/authorization.service";
import { InitializationService } from "../initialization/initialization.service";
import { Injectable } from "@angular/core";
import { tap, map, switchMap, filter } from "rxjs/operators";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
      private authorizationService: AuthorizationService,
      private initializationService: InitializationService,
      private router: Router
    ) { }

    canActivate(): Observable<boolean> | boolean {
      return this.initializationService.isInitialized$()
        .pipe(
          filter((isInitialized) => isInitialized),
          switchMap(() => this.authorizationService.isAuthenticated$()),
          tap((isAuthenticated: boolean) => {
            if (isAuthenticated) {
              this.router.navigateByUrl('/courses');
            }
          }),
          map((isAuthenticated) => !isAuthenticated)
        );
    }
}