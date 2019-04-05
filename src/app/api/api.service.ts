import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class ApiService {
  private methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  };

  constructor(private http: HttpClient, private loaderService: LoaderService, private router: Router) {}

  public get(url, isLoaderShown=true): Observable<Object> {
    return this.sendRequest(this.methods.GET, url, null, isLoaderShown);
  }

  public post(url, body?, isLoaderShown=true): Observable<Object> {
    return this.sendRequest(this.methods.POST, url, body, isLoaderShown);
  }

  public put(url, body?, isLoaderShown=true): Observable<Object> {
    return this.sendRequest(this.methods.PUT, url, body, isLoaderShown);
  }

  public delete(url, isLoaderShown=true): Observable<Object> {
    return this.sendRequest(this.methods.DELETE, url, null, isLoaderShown);
  }

  private sendRequest(method, url, body, isLoaderShown): Observable<Object> {
    let requestObservable$: Observable<Object>;

    switch(method) {
      case this.methods.GET:
        requestObservable$ = this.http.get(url);
        break;
      case this.methods.POST:
        requestObservable$ = this.http.post(url, body);
        break;
      case this.methods.PUT:
        requestObservable$ = this.http.put(url, body);
        break;
      case this.methods.DELETE:
        requestObservable$ = this.http.delete(url);
        break;
    }

    if (isLoaderShown) {
      this.loaderService.addLoader();
    }

    return requestObservable$
      .pipe(
        tap(() => {
          if (isLoaderShown) {
            this.loaderService.removeLoader()
          }
        }),
        catchError((error: HttpErrorResponse) => {
          if (isLoaderShown) {
            this.loaderService.removeLoader();
          }

          if (error.status === 401) {
            if (url === '/api/login') {
              return throwError(error);
            }

            this.router.navigateByUrl('/login');
            return of(null);
          }

          return throwError(error);
        })
      );
  }
}