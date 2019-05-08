import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesItemComponent } from './courses-item/courses-item.component';
import { CoursesPageContainerComponent } from './courses-page-container/courses-page-container.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
// import { OrderByPipePipe } from './courses-list/order-by-pipe.pipe';
import { SearchPipePipe } from './toolbox/search-pipe.pipe';
import { CoursesService } from './courses.service';
import { CorsesBorderDirective } from './courses-item/corses-border.directive';
import { PipeModule } from '../pipe/pipe.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { EditAddPageContainerComponent } from './edit-add-page-container/edit-add-page-container.component';
import { EditAddPageCoursesAutorsComponent } from './edit-add-page-courses-autors/edit-add-page-courses-autors.component';
import { EditAddPageCoursesDateComponent } from './edit-add-page-courses-date/edit-add-page-courses-date.component';
import { EditAddPageCoursesDurationComponent } from './edit-add-page-courses-duration/edit-add-page-courses-duration.component';
import {ButtonModule} from 'primeng/button';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsItemComponent } from './groups-item/groups-item.component';
import { EditAddGroupComponent } from './edit-add-group/edit-add-group.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    ButtonModule
  ],
  declarations: [EditAddPageContainerComponent, EditAddPageCoursesAutorsComponent, EditAddPageCoursesDateComponent, EditAddPageCoursesDurationComponent, ToolboxComponent, CoursesListComponent, CoursesItemComponent, CoursesPageContainerComponent, ConfirmationModalComponent, SearchPipePipe, CorsesBorderDirective, NotFoundPageComponent, GroupsListComponent, GroupsItemComponent, EditAddGroupComponent],
  exports: [CoursesPageContainerComponent, ToolboxComponent, CoursesListComponent, ConfirmationModalComponent, EditAddPageContainerComponent, GroupsListComponent],
  providers: [SearchPipePipe, CoursesService],
  // schemas: [NO_ERRORS_SCHEMA]
})
export class CoursesPageModule { }
