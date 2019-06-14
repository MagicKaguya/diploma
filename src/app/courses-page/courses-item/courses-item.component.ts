import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CoursesItem } from '../courses-item.model';

@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesItemComponent implements OnInit {

  @Input() coursesItem: CoursesItem;
  @Output() courseClick = new EventEmitter<number>();
  @Output() editCourse = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    console.log(this.coursesItem)
  }

  onCourseClick(id: number) {
    this.courseClick.emit(id);
  }

  editCourseClick(id: number) {
    this.editCourse.emit(id);
  }

}