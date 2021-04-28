import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from './credentials';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly UPLOAD_ENDPOINT = "https://api.imgur.com/3/image";
  private readonly clientId = Credentials.IMGUR_CLIENT_ID;

  constructor(private http: HttpClient) { }

  upload(image: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Client-ID ${this.clientId}`
      })
    };

    const formData: FormData = new FormData();
    formData.append("image", image);

    return this.http.post(`${this.UPLOAD_ENDPOINT}`, formData, httpOptions);
  }
}
