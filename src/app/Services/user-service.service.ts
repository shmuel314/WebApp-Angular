import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { IUser } from '../interfaces';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private http = inject(HttpClient);
  readonly apiUrl = "http://localhost:3001/users";

  getAllUsers(): Observable<IUser[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<IUser[]>(url).pipe(delay(1000));
  }

  getUser(id: string): Observable<IUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IUser>(url).pipe(delay(1000));
  }

  addUser(userData: IUser): Observable<IUser> {
    const url = `${this.apiUrl}`;
    return this.http.post<IUser>(url, userData).pipe(delay(1000));
  }

  updateUser(id: number, userData: IUser): Observable<IUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IUser>(url, userData).pipe(delay(1000));
  }

  deleteUser(id: number): Observable<IUser> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<IUser>(url).pipe(delay(1000));
  }

  getIsUserExists(email: string): Observable<boolean> {
    return this.getAllUsers()
      .pipe(
        delay(1000),
        catchError((err) => {
          return throwError(() => err);
        }),
        map((res) => res.some((user) => user.email === email))
      )
  }
}

