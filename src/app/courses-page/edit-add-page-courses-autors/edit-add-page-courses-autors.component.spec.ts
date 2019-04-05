import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddPageCoursesAutorsComponent } from './edit-add-page-courses-autors.component';

describe('EditAddPageCoursesAutorsComponent', () => {
  let component: EditAddPageCoursesAutorsComponent;
  let fixture: ComponentFixture<EditAddPageCoursesAutorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddPageCoursesAutorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddPageCoursesAutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
