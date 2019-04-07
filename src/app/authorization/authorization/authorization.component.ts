import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  public form: FormGroup;
  public formControls = {
    login: 'login',
    password: 'password'
  };
  public isUnauthorized = false;

  constructor(public authorizationService: AuthorizationService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  get errorMessage(): string {
    let errorMessage = [];

    Object.values(this.formControls).forEach((controlName) => {
      const formControl: AbstractControl = this.form.get(controlName);

      if (!(formControl.errors && formControl.touched)) {
        return '';
      }

      errorMessage.push(`${controlName} is required`);
    })

    if (this.isUnauthorized) {
      errorMessage.push('Invalid credentials');
    }

    return errorMessage.length ? errorMessage.join(', ') + '!' : '';
  }

  onEnterClick() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }

    const {
      login,
      password
    } = this.form.value;

    this.authorizationService.logIn(login, password)
      .subscribe(() => {
        this.router.navigateByUrl('/groups');
      }, (error) => {
        if (error.status === 401) {
          this.isUnauthorized = true;
        }
      });
  }

  private markAllAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      [this.formControls.login]: new FormControl('', Validators.required),
      [this.formControls.password]: new FormControl('', Validators.required)
    });

    this.form.valueChanges
      .subscribe(() => this.isUnauthorized = false)
  }
}