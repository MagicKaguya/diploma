import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../user-info.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: UserInfo[];

  constructor() { }

  ngOnInit() {
  }

  public createForm() {
    this.registrationForm
  }

}
