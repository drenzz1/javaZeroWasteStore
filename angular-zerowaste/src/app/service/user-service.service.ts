import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Users} from "../common/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }



  getUserData(username:string,password:string){
    return this.http.get(`${this.baseUrl}/${username}/${password}`)
  }
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(Users: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Users);
  }

  updateUser(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getUserList(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseUrl}`)
        .pipe(
            catchError((error: any) => {
              console.error('Error fetching user data:', error);
              return throwError(error);
            })
        );
  }
}

