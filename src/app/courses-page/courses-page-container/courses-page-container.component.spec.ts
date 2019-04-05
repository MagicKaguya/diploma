import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesPageContainerComponent} from './courses-page-container.component';
import {CoursesListComponent} from '../courses-list/courses-list.component';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {BreadcrumbsComponent} from '../breadcrumbs/breadcrumbs.component';
import {ToolboxComponent} from '../toolbox/toolbox.component';
import {OrderByPipePipe} from '../courses-list/order-by-pipe.pipe';
import {CoursesItemComponent} from '../courses-item/courses-item.component';
import {FormsModule} from '@angular/forms';
import {CorsesBorderDirective} from '../courses-item/corses-border.directive';
import {CoursesService} from '../courses.service';
import {SearchPipePipe} from '../toolbox/search-pipe.pipe';
import {CoursesPipe} from '../courses-item/courses-pipe.pipe';

describe('CoursesPageContainerComponent', () => {
  let component: CoursesPageContainerComponent;
  let fixture: ComponentFixture<CoursesPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [CoursesPageContainerComponent,
        CoursesListComponent,
        ConfirmationModalComponent,
        BreadcrumbsComponent,
        ToolboxComponent,
        OrderByPipePipe,
        CoursesItemComponent,
        CorsesBorderDirective,
        CoursesPipe],
      providers: [
        CoursesService,
        SearchPipePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
