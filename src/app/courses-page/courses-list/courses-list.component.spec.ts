import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../courses.service';
import { OrderByPipePipe } from './order-by-pipe.pipe';
import { CoursesItemComponent } from '../courses-item/courses-item.component';
import { CorsesBorderDirective } from '../courses-item/corses-border.directive';
import { Pipe, PipeTransform, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoursesPipe } from '../courses-item/courses-pipe.pipe';

const orderByPipeStubTransformSpy = jasmine.createSpy('orderByPipe');

@Pipe({
  name: 'orderByPipe'
})
class OrderByPipeStub implements PipeTransform {
  transform(val) {
    return orderByPipeStubTransformSpy(val);
  }
}

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let debugElement: DebugElement;
  let coursesService: CoursesService;

  const coursesServiceStub = {
    courses:
      {
        id: 0,
        title: '',
        creationDate: 0,
        duration: 0,
        description: '',
        topRated: false
      },
    getList: () => { }
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        CoursesListComponent,
        OrderByPipePipe,
        CoursesItemComponent,
        CorsesBorderDirective,
        CoursesPipe,
        OrderByPipeStub
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    coursesService = TestBed.get(CoursesService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get console message', () => {
    const expectedConcoleText = 'Button "LOAD MORE" is clicked';
    const consoleText = component.onLoadMoreClick();

    expect(consoleText).toBe(expectedConcoleText);
  });


});
