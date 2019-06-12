import { Injectable } from '@angular/core';
import { UserInfo } from './user-info.model';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthorizationService {
  private user$: BehaviorSubject<UserInfo> = new BehaviorSubject(null);
  private login: string;
  private token: string;
  private tokenKey: string = 'token';
  private loginKey: string = 'login';

  constructor(private storageService: StorageService, private apiService: ApiService) {
    this.token = this.getStoredToken();
    this.login = this.getStoredLogin();
  }

  public getToken() {
    return this.token;
  }

  public isTokenExist(): boolean {
    return !!this.token;
  }

  public logIn(login: string, password: string) {
    return this.apiService.post('/api/login', {
      login,
      password
    })
      .pipe(
        tap((response: Object) => {
          const { token } = response as { token: string };
          this.token = token;
          this.login = login;
          this.storeToken(token);
        }),
        switchMap(() => {
          return this.getUserInfo$()
        })
      );
  }

  public getUsers() {
    return this.apiService.get('/api/users', false).pipe(
      map((val: UserInfo[]) => val.pop())
    )
  }

  public createUser(user: UserInfo) {
    return this.apiService.post('/api/users', user);
  }

  public getUserInfo$() {
    if (!this.login) {
      return of(null);
    }

    return this.apiService.post('/api/auth/userinfo', this.login)
      .pipe(
        tap((response: Object) => {
          const user = response as UserInfo;
          this.storeLogin(user.login);
          this.user$.next(user);
        }),
        catchError(() => {
          this.logOut();
          return of(null);
        })
      );
  }

  public isAuthenticated$(): Observable<boolean> {
    return this.user$
      .pipe(map((user: UserInfo) => {
        return !!user;
      }));
  }

  public getUser$(): Observable<UserInfo> {
    return this.user$.asObservable();
  }

  public logOut() {
    this.user$.next(null);

    this.token = null;
    this.storageService.removeItem(this.tokenKey);

    this.login = null;
    this.storageService.removeItem(this.loginKey);
  }

  private storeToken(token: string) {
    this.storageService.setItem(this.tokenKey, token);
  }

  private getStoredToken(): string {
    return this.storageService.getItem(this.tokenKey);
  }

  private storeLogin(login: string) {
    this.storageService.setItem(this.loginKey, login);
  }

  private getStoredLogin(): string {
    return this.storageService.getItem(this.loginKey);
  }
}
