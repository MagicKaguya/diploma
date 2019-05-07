import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../groups.model';
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  public groups: Group[] = [];

  constructor(
    private router: Router,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.getGroups();
  }

  public onOpenGroupClick(id: string) {
    this.router.navigateByUrl(`groups/${id}/courses`);
  }

  public removeGroupClick(id: string) {
    if (confirm('Вы действительно собираетесь удалить эту группу?')) {
      this.coursesService.removeGroup$(id)
      .subscribe(() => {
        this.getGroups();
      });
    }
  }

  private getGroups(isLoaderShown=true) {
    this.coursesService.getGroups$(isLoaderShown)
      .subscribe((groups: Group[]) => {
        this.groups = groups;
      });
  }

}
