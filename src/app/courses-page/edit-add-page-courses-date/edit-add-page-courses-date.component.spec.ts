import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPageCoursesDateComponent } from './edit-add-page-courses-date.component';

describe('EditAddPageCoursesDateComponent', () => {
  let component: EditAddPageCoursesDateComponent;
  let fixture: ComponentFixture<EditAddPageCoursesDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddPageCoursesDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPageCoursesDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
