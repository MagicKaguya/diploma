import { CoursesPageModule } from './courses-page.module';

describe('CoursesPageModule', () => {
  let coursesPageModule: CoursesPageModule;

  beforeEach(() => {
    coursesPageModule = new CoursesPageModule();
  });

  it('should create an instance', () => {
    expect(coursesPageModule).toBeTruthy();
  });
});
