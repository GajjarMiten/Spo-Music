import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import jwt_decode from 'jwt-decode';

import { environment } from './../environments/environment';

import RegisterUser from './RegisterUser';
import User from './User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  readToken(): User {
    const token = this.getToken();
    return jwt_decode(token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token && token.length > 0) {
      return true;
    }
    return false;
  }

  login(user: User): Observable<any> {
    return this.http.post(environment.userAPIBase + '/login', user);
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  register(user: RegisterUser): Observable<any> {
    return this.http.post(environment.userAPIBase + '/register', user);
  }
}
