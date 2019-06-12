import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../user-info.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public isRegisterButtonDisabled: boolean = true;
  public lastId: number;

  public degrees = ['Бакалавриат', 'Магистратура']
  public cursesCount: { [degree: string]: number[] } = { 'Бакалавриат': [1, 2, 3, 4], 'Магистратура': [1, 2] };
  public coursesNames = ['Математика', 'Пед. образование', 'ПМИ', 'МиКН', 'МиММ'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();

    this.registrationForm.statusChanges.subscribe(val => {
      this.getPrevoiusUserId();
      if (val === 'VALID') {
        this.isRegisterButtonDisabled = false;
      } else {
        this.isRegisterButtonDisabled = true;
      }
    });

    this.registrationForm.controls.courseNumber.valueChanges.subscribe(val => console.log(val));
  }

  public saveGroup() {
    const userData: UserInfo = {
      id: this.lastId + 1,
      login: this.registrationForm.get('login').value,
      password: this.registrationForm.get('password').value,
      firstName: this.registrationForm.get('firstName').value,
      lastName: this.registrationForm.get('lastName').value,
      courseNumber: this.registrationForm.get('courseNumber').value,
      courseName: this.registrationForm.get('courseName').value
    }

    this.authService.createUser(userData).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  private getPrevoiusUserId() {
    this.authService.getUsers().subscribe(val => this.lastId = val.id);
  }

  private createForm(): FormGroup {
    this.registrationForm = this.formBuilder.group({
      id: [null],
      login: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      courseNumber: ['', Validators.required],
      courseName: ['', Validators.required]
    });
    return this.registrationForm;
  }

}
