import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoursesService } from '../../courses-page/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CoursesItem } from '../courses-item.model';
import { authorsValidator } from '../../validators/authors.validator';
import { creationDateValidator } from '../../validators/creation-date.validator';
import { durationValidator } from '../../validators/duration.validator';
import { combineLatest } from 'rxjs';
import { AuthorsService } from '../authors.service';
import { Author } from '../author.model';
import { StorageService } from 'src/app/storage/storage.service';
import { AuthorizationService } from 'src/app/authorization/authorization.service';

@Component({
  selector: 'app-edit-add-page-container',
  templateUrl: './edit-add-page-container.component.html',
  styleUrls: ['./edit-add-page-container.component.css']
})
export class EditAddPageContainerComponent implements OnInit, OnDestroy {

  public isConfirmButtonDisabled = true;
  public id: number;
  public groupId: string;
  public userId: number;
  public form: FormGroup;
  public formControls = {
    title: 'title',
    teacher: 'teacher',
    time: 'time',
    class: 'class'
  };
  // public authors: Author[] = [];

  constructor(
    private coursesService: CoursesService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private formBuilder: FormBuilder, 
    private authorsService: AuthorsService,
    private localStorage: StorageService,
    private authService: AuthorizationService
    ) { }

  // errorMessage(formControlName: string) {
  //   const formControl: AbstractControl = this.form.get(formControlName);

  //   if (!(formControl.errors && formControl.touched)) {
  //     return '';
  //   }

  //   let errorMessage = [];
  //   Object.keys(formControl.errors).forEach((key) => {
  //     switch(key) {
  //       case 'required':
  //         errorMessage.push('This field is required!');
  //         break;
  //       case 'maxlength':
  //         const lengthError = formControl.errors[key];
  //         errorMessage.push(`Field actual length (${lengthError.actualLength}) is more than maximum length (${lengthError.requiredLength})!`);
  //         break;
  //       default:
  //         errorMessage.push(formControl.errors[key]);
  //     }
  //   });

  //   return errorMessage.join(' ');
  // }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.id = params['id'];
        // this.authors = authors;
        this.getCourseInfo();
      });
    
    this.groupId = this.localStorage.getItem('groupId');
    this.authService.user$.subscribe(user => {
      this.userId = user.id;
    })

    this.createForm();
    this.form.statusChanges.subscribe(val => {
      if (val === 'VALID') {
        this.isConfirmButtonDisabled = false;
      } else {
        this.isConfirmButtonDisabled = true;
      }
    });
  }

  getCourseInfo() {
    if (this.isCourseEditing()) {
      return this.coursesService.getItemById$(this.id)
        .subscribe((foundCourse) => {
            this.form.patchValue({
                [this.formControls.title]: foundCourse.title,
                [this.formControls.teacher]: foundCourse.teacher,
                [this.formControls.time]: foundCourse.time,
                [this.formControls.class]: foundCourse.class
            });
        });
    }
  }

  saveChanges() {
    if (!this.form.valid) {
      this.markAllAsTouched();
      return;
    }

    let courseAction$;

    // const {
    //     title,
    //     teacher,
    //     time,
    //     class
    // } = this.form.value;

    // let creationDate;
    // try {
    //   creationDate = Date.parse(date);
    // } catch (er) {
    //   creationDate = 0;
    // }

    let newCourseData: CoursesItem = {
        id: this.isCourseEditing() ? this.id : undefined,
        title: this.form.get('title').value,
        teacher: this.form.get('teacher').value,
        time: this.form.get('time').value,
        class: this.form.get('class').value,
        groupId: this.groupId,
        userId: this.userId
    };

    if (this.isCourseEditing()) {
      courseAction$ = this.coursesService.updateItem$(this.id, newCourseData);
    } else {
      courseAction$ = this.coursesService.createCourse$(newCourseData);
    }

    courseAction$.subscribe(() => {
      this.router.navigateByUrl(`/groups/${this.groupId}/courses`);
    });
  }

  cancel() {
    this.router.navigateByUrl(`/groups/${this.groupId}/courses`);
  }

  ngOnDestroy() {
    this.coursesService.fillBreadcrumbs('');
  }

  private markAllAsTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      teacher: ['', Validators.required],
      time: ['', Validators.required],
      class: ['', Validators.required]
        // [this.formControls.title]: new FormControl(
        //   '',
        //   [Validators.required, Validators.maxLength(50)]
        // ),
        // [this.formControls.teacher]: new FormControl(
        //   '',
        //   [Validators.required, Validators.maxLength(500)]
        // ),
        // [this.formControls.time]: new FormControl(
        //   '',
        //   [Validators.required, Validators.maxLength(500)]
        // ),
        // [this.formControls.class]: new FormControl(
        //   '',
        //   [Validators.required, Validators.maxLength(500)]
        // ),
        // [this.formControls.date]: new FormControl(
        //   null,
        //   [creationDateValidator]
        // ),
        // [this.formControls.duration]: new FormControl(
        //   null,
        //   [Validators.required, durationValidator]
        // ),
        // [this.formControls.authors]: new FormControl(
        //   null,
        //   [authorsValidator]
        // )
    });
  }

  private isCourseEditing() {
      return this.router.url !== `/groups/${this.groupId}/courses/new`;
  }
}
