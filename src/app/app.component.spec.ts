import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './main/header/header.component';
import {CoursesPageContainerComponent} from './courses-page/courses-page-container/courses-page-container.component';
import {AuthorizationComponent} from './authorization/authorization/authorization.component';
import {FooterComponent} from './main/footer/footer.component';
import {LogoComponent} from './main/logo/logo.component';
import {BreadcrumbsComponent} from './main/breadcrumbs/breadcrumbs.component';
import {ToolboxComponent} from './courses-page/toolbox/toolbox.component';
import {ConfirmationModalComponent} from './courses-page/confirmation-modal/confirmation-modal.component';
import {CoursesListComponent} from './courses-page/courses-list/courses-list.component';
import {FormsModule} from '@angular/forms';
import {OrderByPipePipe} from './courses-page/courses-list/order-by-pipe.pipe';
import {CoursesItemComponent} from './courses-page/courses-item/courses-item.component';
import {CorsesBorderDirective} from './courses-page/courses-item/corses-border.directive';
import {CoursesPipe} from './courses-page/courses-item/courses-pipe.pipe';
import { RegistrationComponent } from './authorization/registration/registration.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        CoursesPageContainerComponent,
        AuthorizationComponent,
        RegistrationComponent
        FooterComponent,
        LogoComponent,
        BreadcrumbsComponent,
        ToolboxComponent,
        ConfirmationModalComponent,
        CoursesListComponent,
        OrderByPipePipe,
        CoursesItemComponent,
        CorsesBorderDirective,
        CoursesPipe
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  // Не работает!!!!!
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to first-app!');
  // }));
});
