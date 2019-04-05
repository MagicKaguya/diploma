import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizationService } from "./authorization/authorization.service";
import { Injectable } from "@angular/core";

// @Injectable()
// export class LoginGuard implements CanActivate {

//     constructor(private authorizationService: AuthorizationService, private router: Router) { }

//     canActivate(): Observable<boolean> | boolean {

//         if (!this.authorizationService.isAuthenticated()) {
//             return true;
//         } else {
//             this.router.navigateByUrl('/courses');
//             return false;
//         }
//     }
// }