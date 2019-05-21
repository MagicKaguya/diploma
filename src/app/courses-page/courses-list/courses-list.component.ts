import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoursesItem } from '../courses-item.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: CoursesItem[];
  @Output() changedCourses: EventEmitter<any> = new EventEmitter();
  @Output() removeCourse: EventEmitter<number> = new EventEmitter();

  public scheduleForm: FormGroup;
  public onEdit = false;
  public editableItem;
  public editablePair;
  public editablePairIndex;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private popupService: PopupService
    ) {
      
   }

  ngOnInit() {}

  onRemoveCourseClick(id) {
    this.removeCourse.emit(id);
  }

  onEditCourseClick(id) {
    this.router.navigateByUrl('/courses/' + id);
  }

  onEditScheduleClick() {
    this.onEdit = !this.onEdit;
  }

  onEditItemClick(item, pair, index) {
    if (this.onEdit) {
      this.editableItem = item;
      this.editablePair = pair;
      this.editablePairIndex = index;

      this.popupService.showPopup();
    } else return;
  }

  find() {
    return this.courses.find(course => course.groupId === 'course');
  }

  isEmpty(): boolean {
    let videoCount = this.courses.length;

    if (videoCount === 0)
      return true;
  }
}
