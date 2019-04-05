import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPageCoursesDurationComponent } from './edit-add-page-courses-duration.component';

describe('EditAddPageCoursesDurationComponent', () => {
  let component: EditAddPageCoursesDurationComponent;
  let fixture: ComponentFixture<EditAddPageCoursesDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddPageCoursesDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPageCoursesDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
