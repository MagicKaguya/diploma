import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPipe } from '../courses-page/courses-item/courses-pipe.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CoursesPipe],
  exports: [CoursesPipe]
})
export class PipeModule { }
