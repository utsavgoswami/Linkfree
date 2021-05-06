import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE: string = 'http://13.92.37.176'
  private AUTH_URL = this.BASE + '/api/v1/Auth/'
  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user): Observable<any> {
    return this.http.post<any>(this.AUTH_URL + "Register", user);
  }

  loginUser(user): Observable<any> {
    return this.http.post<any>(this.AUTH_URL + "Login", user);
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }

  getUserName(): string {
    const token = localStorage.getItem('token');
    const tokenComponents = token.split('.');
    const payload = atob(tokenComponents[1]);

    return payload.slice(payload.lastIndexOf(":") + 2, -2);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
