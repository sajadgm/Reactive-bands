import { delay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from './model';
@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  get currentUser(): Observable<User> {
    return of({
      name: 'Sajad',
      favoritBandId: '133cfef7-6f96-40fe-86a1-c7ca9c5cbd4e',
    }).pipe(
      tap(() => console.log('fetching user data started')),
      delay(1000),
      tap(() => console.log('fetching user data finished'))
    );
  }
}
