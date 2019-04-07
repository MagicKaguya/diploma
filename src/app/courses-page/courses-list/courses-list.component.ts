import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CoursesItem } from '../courses-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {

  @Input() courses: CoursesItem[] = [];
  @Output() loadMore: EventEmitter<void> = new EventEmitter();
  @Output() removeCourse: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) {
   }

  onLoadMoreClick() {
    this.loadMore.emit();
  }

  onRemoveCourseClick(id) {
    this.removeCourse.emit(id);
  }

  onEditCourseClick(id) {
    this.router.navigateByUrl('/courses/' + id);
  }

  isEmpty(): boolean {
    let videoCount = this.courses.length;

    if (videoCount === 0)
      return true;
  }
}
