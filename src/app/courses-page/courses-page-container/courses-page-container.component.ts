import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { PopupService } from '../popup.service';
import { CoursesItem } from '../courses-item.model';
import { Group } from '../groups.model';
import { Router, RoutesRecognized, ActivatedRouteSnapshot, Event, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

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
  courses: CoursesItem[] = [];
  shownCount: number = 5;

  private query: string = '';

  constructor(private coursesService: CoursesService, private popupService: PopupService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap
    .subscribe((data) => {
     this.id = data.get('id');
     console.log(this.id)
    });
    
    this.getCoursesItems();
  }

  onSearch(query: string) {
    this.query = query;
    this.getCoursesItems(false);
  }

  onLoadMore() {
    this.shownCount += 5;
    this.getCoursesItems();
  }

  onRemoveCourse(courseId: number) {
    this.popupService.showPopup(this.removeCourse.bind(this, courseId));
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
    .subscribe((courses: CoursesItem[]) => {
      this.courses = courses;         
    });
  }

}
