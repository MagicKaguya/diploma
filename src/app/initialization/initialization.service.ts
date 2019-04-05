import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class InitializationService {
  private initialized$ = new BehaviorSubject(false);

  constructor(private authorizationService: AuthorizationService) {}

  public isInitialized$() {
    return this.initialized$.asObservable();
  }

  public init() {
    this.authorizationService.getUserInfo$()
      .subscribe(() => {
        this.initialized$.next(true);
      });
  }
}