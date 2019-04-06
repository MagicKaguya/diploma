import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../groups.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  @Input() public groups: Group[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onOpenGroupClick(id: string) {
    this.router.navigateByUrl(`groups/${id}/courses`);
  }

}
