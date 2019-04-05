import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit, OnDestroy  {
  @Output() search: EventEmitter<string> = new EventEmitter();

  public searchValue: string;

  private searchChange$: Subject<string> = new Subject();
  private searchSubscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.searchSubscription = this.searchChange$
      .pipe(
        filter(v => !v || v.length > 2),
        distinctUntilChanged(),
        debounceTime(1000)
      )
      .subscribe(value => this.search.emit(value))
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  onSearchChange() {
    this.searchChange$.next(this.searchValue);
  }

  addCourse() {
    this.router.navigateByUrl('/courses/new');
  }
}
