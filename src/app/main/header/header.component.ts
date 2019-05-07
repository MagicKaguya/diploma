import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from '../../authorization/authorization.service';
import { UserInfo } from '../../authorization/user-info.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public login: string;

  private userSubscription: Subscription;

  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authorizationService.getUser$()
      .subscribe((userInfo: UserInfo) => {
        this.login = userInfo ? `${userInfo.firstName} ${userInfo.lastName}` : '';
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  toHomeClick() {
    this.router.navigateByUrl('/groups')
  }

  logOut() {
    this.authorizationService.logOut();
    this.router.navigateByUrl('/login');
  }
}
