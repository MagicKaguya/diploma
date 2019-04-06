import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../user-info.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  public createForm(): FormGroup {
    this.registrationForm = this.formBuilder.group({
      id: [1],
      fakeToken: [''],
      login: [''],
      password: [''],
      firstName: [''],
      lastName: ['']
    });
    return this.registrationForm;
  }

}
