import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../courses-page/courses.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  
  public breadcrumbs: string;

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesService.getBreadcrumbsSubject().subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
