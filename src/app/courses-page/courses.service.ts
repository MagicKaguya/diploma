import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesItem } from './courses-item.model';
import { map } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { Group } from './groups.model';


@Injectable()
export class CoursesService {
  private mySubject: BehaviorSubject<string>;

  constructor(private apiService: ApiService) {
    this.mySubject = new BehaviorSubject('');
  }

  public getList$(count: number, query: string, isLoaderShown: boolean): Observable<CoursesItem[]> {
    return this.apiService.get(
      `/api/courses?count=${count}&start=0${query ? '&textFragment=' + query : ''}`,
      isLoaderShown
    )
      .pipe(
        map((res) => res ? res as CoursesItem[] : [])
      );
  }

  public getGroups$(isLoaderShown: boolean): Observable<Group[]> {
    return this.apiService.get(
      `/api/groups`,
      isLoaderShown
    )
      .pipe(
        map((res) => res ? res as Group[] : [])
      );
  }

  public removeItem$(id): Observable<Object> {
    return this.apiService.delete(`/api/courses/${id}`);
  }

  public getItemById$(id): Observable<CoursesItem> {
    return this.apiService.get(`/api/courses/${id}`)
      .pipe(map((response) => response as CoursesItem));
  }

  public createCourse$(course) {
    return this.apiService.post('/api/courses', course);
  }

  public updateItem$(id, course) {
    return this.apiService.put(`/api/courses/${id}`, course);
  }

  public getBreadcrumbsSubject() {
    return this.mySubject.asObservable();
  }

  public fillBreadcrumbs(course) {
    if (!course) {
      this.mySubject.next('');
    } else {
      this.mySubject.next(`/${course[0].title}`);
    }
  }
}
