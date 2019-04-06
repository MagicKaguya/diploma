import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsListComponent } from './groups-list.component';
import { GroupsItemComponent } from '../groups-item/groups-item.component';

describe('GroupsListComponent', () => {
  let component: GroupsListComponent;
  let fixture: ComponentFixture<GroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsListComponent, GroupsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
