import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime, filter } from 'rxjs/operators';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit, OnDestroy  {
  @Output() search: EventEmitter<string> = new EventEmitter();

  public searchValue: string;
  public isGroupsShow: boolean;
  public groupId: string;

  private searchChange$: Subject<string> = new Subject();
  private searchSubscription: Subscription;

  constructor(
    private router: Router,
    private localStorage: StorageService
    ) {}

  ngOnInit() {
    this.isGroupsShow = this.router.url === '/groups';

    this.groupId = this.localStorage.getItem('groupId');

    this.searchSubscription = this.searchChange$
      .pipe(
        filter(v => !v || v.length > 2),
        distinctUntilChanged(),
        debounceTime(1000)
      )
      .subscribe(value => this.search.emit(value));
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  onSearchChange() {
    this.searchChange$.next(this.searchValue);
  }

  addCourse() {
    this.router.navigateByUrl(`/groups/${this.groupId}/courses/new`);
  }

  addGroup() {
    this.router.navigateByUrl('/groups/new');
  }
}
