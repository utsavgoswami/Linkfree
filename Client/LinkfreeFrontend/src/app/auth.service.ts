import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REGISTRATION_ENDPOINT: string = 'https://localhost:44344/api/v1/Auth/Register';
  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.REGISTRATION_ENDPOINT, user);
  }
}
