import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoursesItem } from '../courses-item.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PopupService } from '../popup.service';
import { AuthorizationService } from 'src/app/authorization/authorization.service';
import { StorageService } from 'src/app/storage/storage.service';
import { CoursesService } from '../courses.service';

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
  public isSchedule = false;
  public groupId: string;

  constructor(
    private router: Router,
    private popupService: PopupService,
    private activatedRoute: ActivatedRoute,
    private localStorage: StorageService,
    private coursesService: CoursesService
    ) {
      
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isSchedule = id === 'course';
    });
    this.groupId = this.localStorage.getItem('groupId');
  }

  onRemoveCourseClick(id) {
    this.removeCourse.emit(id);
  }

  onEditCourseClick(id) {
    this.router.navigateByUrl(`/groups/${this.groupId}/courses/${id}`);
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
    return this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      return id === 'course';
    });
  }

  isEmpty(): boolean {
    let videoCount = this.courses.length;

    if (videoCount === 0)
      return true;
  }
}
