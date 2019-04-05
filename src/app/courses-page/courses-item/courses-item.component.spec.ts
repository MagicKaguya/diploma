import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Input, Directive, Pipe, PipeTransform, Component, ViewChild, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CoursesItem } from '../courses-item.model';
import { CoursesItemComponent } from './courses-item.component';
import {CoursesPipe} from './courses-pipe.pipe';

@Directive({
  selector: '[appCorsesBorder]'
})
class CorsesBorderStubDirective {
  @Input('appCorsesBorder') date: any;
}

const durationAppointPipeStubTransformSpy = jasmine.createSpy('coursePipeTransform');

@Pipe({ name: 'durationAppointPipe' })
class DurationAppointPipeStub implements PipeTransform {
  transform(val) {
    return durationAppointPipeStubTransformSpy(val);
  }
}

@Component({
  template: `
    <app-courses-item [coursesItem]="coursesItem">
    </app-courses-item>
  `
})
class TestComponent {
  @ViewChild(CoursesItemComponent) component;

  public coursesItem: CoursesItem = {
    id: 0,
    title: '',
    creationDate: 0,
    duration: 0,
    description: '',
    topRated: false
  };
}

describe('CoursesItemComponent', () => {
  let component: CoursesItemComponent;
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesItemComponent,
        CoursesPipe,
        CorsesBorderStubDirective,
        DurationAppointPipeStub,
        TestComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    component = testComponent.component;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit courseClick event with course id while clicking on delete button', () => {
    const expectedCourseId = 1;
    spyOn(component.courseClick, 'emit');

    component.onCourseClick(expectedCourseId);

    expect(component.courseClick.emit).toHaveBeenCalledWith(expectedCourseId);
  });

  describe('when there are changes from parent component', () => {
    describe('video title should be', () => {
      it('put uppercased into h4 of the template', () => {
        const h4De = debugElement.query(By.css('h4'));
        const title = 'sometitle';
        const expectedTitle = 'SOMETITLE';
        testComponent.coursesItem = {
          ...testComponent.coursesItem,
          title
        };

        fixture.detectChanges();

        expect(h4De.nativeElement.textContent).toBe(expectedTitle);
      });
    });

    describe('image should', () => {
      let imageDe: DebugElement;
      const favoriteVideoFilledClass = 'favorite-video-filled';
      const favoriteVideoClass = 'favorite-video';

      beforeEach(() => {
        imageDe = debugElement.query(By.css('img'));
      });

      it(`be styled with "${favoriteVideoFilledClass}" class if course is top rated`, () => {
        const topRated = true;
        testComponent.coursesItem = {
          ...testComponent.coursesItem,
          topRated
        };

        fixture.detectChanges();

        expect(imageDe.nativeElement.classList.contains(favoriteVideoFilledClass)).toBeTruthy();
      });

      it(`not be styled with "${favoriteVideoFilledClass}" class if course is not top rated`, () => {
        const topRated = false;
        testComponent.coursesItem = {
          ...testComponent.coursesItem,
          topRated
        };

        fixture.detectChanges();

        expect(imageDe.nativeElement.classList.contains(favoriteVideoFilledClass)).toBeFalsy();
      });

      it(`should add "${favoriteVideoClass}" class to the image`, () => {
        expect(imageDe.nativeElement.classList.contains(favoriteVideoClass)).toBeTruthy();
      });
    });

    describe('video duration should be', () => {
      const videoDurationClass = 'video-duration';
      const duration = 1234;

      beforeEach(() => {
        testComponent.coursesItem = {
          ...testComponent.coursesItem,
          duration
        };
      });

      it('transformed with coursesPipe', () => {
        fixture.detectChanges();

        expect(durationAppointPipeStubTransformSpy).toHaveBeenCalledWith(duration);
      });

      it(`added as element with "${videoDurationClass}" class after transformation`, () => {
        const videoDurationDe = debugElement.query(By.css(`.${videoDurationClass}`));
        const expectedTransformedDuration = '2345';
        durationAppointPipeStubTransformSpy.and.returnValue(expectedTransformedDuration);

        fixture.detectChanges();

        expect(videoDurationDe.nativeElement.textContent).toBe(expectedTransformedDuration);
      });
    });

    describe('video creation date should be', () => {
      const videoDateClass = 'video-date';
      const month = 10;
      const day = 11;
      const year = 2000;
      // В Date месяцы идут от 0, в datePipe от 1, поэтому месяц в конструктор передается на единицу меньше
      const creationDate = (new Date(year, month - 1, day)).getTime();

      beforeEach(() => {
        testComponent.coursesItem = {
          ...testComponent.coursesItem,
          creationDate
        };
      });

      it(`put formatted into element with "${videoDateClass}" class`, () => {
        const creationDateDe = debugElement.query(By.css(`.${videoDateClass}`));
        const expectedCreationDate = `${month}.${day}.${year}`;

        fixture.detectChanges();

        expect(creationDateDe.nativeElement.textContent).toBe(expectedCreationDate);
      });

      it('passed as is to appCorsesBorder directive', () => {
        const corsesBorderDe = debugElement.query(By.directive(CorsesBorderStubDirective));
        const corsesBorderDirective = corsesBorderDe.injector.get(CorsesBorderStubDirective);

        fixture.detectChanges();

        expect(corsesBorderDirective.date).toBe(creationDate);
      });
    });

    describe('video description should be', () => {
      const videoDescriptionClass = 'video-description';

      it(`added as is into element with "${videoDescriptionClass}" class`, () => {
        const descriptionDe = debugElement.query(By.css(`.${videoDescriptionClass}`));
        const description = 'some description';
        testComponent.coursesItem = {
          ...testComponent.coursesItem,
          description
        };

        fixture.detectChanges();

        expect(descriptionDe.nativeElement.textContent.trim()).toBe(description);
      });
    });
  });
});
