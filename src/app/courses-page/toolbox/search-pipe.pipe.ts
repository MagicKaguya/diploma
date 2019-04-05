import { Pipe, PipeTransform } from '@angular/core';
import { CoursesItem } from '../courses-item.model';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: SearchParametres): Array<CoursesItem> {
    return value.target.filter(course => {
      return course.title.toLowerCase().indexOf(value.searchText.toLowerCase()) >= 0;
    })
  }
}

interface SearchParametres {
  target: Array<CoursesItem>;
  searchText: string;
}
