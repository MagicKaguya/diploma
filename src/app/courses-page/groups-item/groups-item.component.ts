import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../groups.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-item',
  templateUrl: './groups-item.component.html',
  styleUrls: ['./groups-item.component.css']
})
export class GroupsItemComponent implements OnInit {

  @Input() groupItem: Group;
  @Output() groupClick = new EventEmitter<string>();
  @Output() removeGroup: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  public openGroupClick(id: string) {
    console.log(id)
    this.groupClick.emit(id);
  }

  public deleteGroup(id: string) {
    this.removeGroup.emit(id);
  }

}
