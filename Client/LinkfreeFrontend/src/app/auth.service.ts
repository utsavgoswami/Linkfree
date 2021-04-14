import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_URL = 'https://localhost:44344/api/v1/Auth/'
  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.AUTH_URL + "Register", user);
  }

  loginUser(user) {
    return this.http.post<any>(this.AUTH_URL + "Login", user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
