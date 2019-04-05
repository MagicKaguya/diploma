import { TestBed, inject } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import {SearchPipePipe} from './toolbox/search-pipe.pipe';

describe('CoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService, SearchPipePipe]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));
});
