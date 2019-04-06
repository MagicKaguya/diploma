import { Component, OnInit } from '@angular/core';
import { Group } from '../groups.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-groups-container',
  templateUrl: './groups-container.component.html',
  styleUrls: ['./groups-container.component.css']
})
export class GroupsContainerComponent implements OnInit {

  groups: Group[] = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.getGroups();
  }

  private getGroups(isLoaderShown=true) {
    this.coursesService.getGroups$(isLoaderShown)
      .subscribe((groups: Group[]) => {
        this.groups = groups;
      });
  }

}
