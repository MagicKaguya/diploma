import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { PopupService } from '../popup.service';
import { CoursesItem } from '../courses-item.model';
import { Group } from '../groups.model';
import { Router, RoutesRecognized, ActivatedRouteSnapshot, Event, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/authorization/authorization.service';
import { StorageService } from 'src/app/storage/storage.service';

interface Route {
  route: RoutesRecognized;
  snapshot: ActivatedRouteSnapshot;
}

@Component({
  selector: 'app-courses-page-container',
  templateUrl: './courses-page-container.component.html',
  styleUrls: ['./courses-page-container.component.css']
})

export class CoursesPageContainerComponent implements OnInit {
  id: string;
  courses = [];
  shownCount: number = 5;

  private query: string = '';

  constructor(
    private coursesService: CoursesService, 
    private popupService: PopupService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private authService: AuthorizationService,
    private localStorage: StorageService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
    .subscribe((data) => {
     this.id = data.get('id');
     this.localStorage.setItem('groupId', this.id);
    });

    console.log(this.courses)
    
    this.getCoursesItems();
  }

  onSearch(query: string) {
    this.query = query;
    this.getCoursesItems(false);
  }

  changedCourses(courses) {
    console.log(courses)
    // this.shownCount += 5;
    // this.getCoursesItems();
  }

  onRemoveCourse(courseId: number) {
    return this.removeCourse(courseId);
  }

  public isUndeletable() {
    return this.id === 'course';
  }

  private removeCourse(courseId: number) {
    this.coursesService.removeItem$(courseId)
      .subscribe(() => {
        this.getCoursesItems();
      });
  }

  private getCoursesItems(isLoaderShown=true) {
    this.coursesService.getList$(this.id, isLoaderShown)
    .subscribe(courses => {
      this.authService.user$.subscribe(user => {
        if (!user) {
          return;
        }
        this.courses = courses.filter(course => {
          if (course.groupId === 'course') {
            return course.courseName === user.courseName && course.courseNumber[0] === user.courseNumber[0] && course.courseNumber[1] === user.courseNumber[1];
          } else {
            return user.id === course.userId;
          }
        })
      })       
    });
  }

}
