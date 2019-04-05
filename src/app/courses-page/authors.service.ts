import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Author } from './author.model';
import { ApiService } from '../api/api.service';

@Injectable()
export class AuthorsService {
  constructor(private apiService: ApiService) {}

  getAuthors$() {
    return this.apiService.get('/api/authors')
      .pipe(map(authors => authors as Author[]));
  }
}