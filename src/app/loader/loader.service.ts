import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject, timer, zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class LoaderService {
  private loader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private remove$: Subject<void> = new Subject();
  private add$: Subject<void> = new Subject();

  constructor() {
    this.add$.pipe(
      switchMap(() => {
        this.loader$.next(true);
        return zip(timer(300), this.remove$)
      }),
      tap(() => {
        this.loader$.next(false);
      })
    ).subscribe();
  }

  public isLoaderShown$() {
    return this.loader$.asObservable();
  }

  public addLoader() {
    if (this.loader$.getValue()) {
      return;
    }

    this.add$.next();
  }

  public removeLoader() {
    this.remove$.next();
  }
}