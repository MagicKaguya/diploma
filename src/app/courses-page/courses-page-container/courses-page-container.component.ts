import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { PopupService } from '../popup.service';
import { CoursesItem } from '../courses-item.model';

@Component({
  selector: 'app-courses-page-container',
  templateUrl: './courses-page-container.component.html',
  styleUrls: ['./courses-page-container.component.css']
})
export class CoursesPageContainerComponent implements OnInit {
  courses: CoursesItem[] = [];
  shownCount: number = 5;

  private query: string = '';

  constructor(private coursesService: CoursesService, private popupService: PopupService) { }

  ngOnInit() {
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

  private removeCourse(courseId: number) {
    this.coursesService.removeItem$(courseId)
      .subscribe(() => {
        this.getCoursesItems();
      });
  }

  private getCoursesItems(isLoaderShown=true) {
    this.coursesService.getList$(this.shownCount, this.query, isLoaderShown)
      .subscribe((courses: CoursesItem[]) => {
        this.courses = courses;
      });
  }
}
