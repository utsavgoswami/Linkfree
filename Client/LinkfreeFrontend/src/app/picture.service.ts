import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Field names capitalized to comply with server-side model
export interface Picture {
  URL: string
}

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private BASE: string = 'http://13.92.37.176'
  private RESOURCE_PATH: string = '/api/v1/Users';
  private PUT_ENDPOINT: string = this.BASE + this.RESOURCE_PATH + '/ProfilePicture';
  private GET_ENDPOINT: string = this.BASE + this.RESOURCE_PATH;

  constructor(private http: HttpClient) { }

  updateProfilePicture(newPicture: Picture): Observable<any> {
    return this.http.put(this.PUT_ENDPOINT, newPicture);
  }

  getProfilePicture(userName: string): Observable<any> {
    const FULL_ENDPOINT: string = this.GET_ENDPOINT + '/' + userName + "/ProfilePicture";

    return this.http.get<any>(FULL_ENDPOINT);
  }

}
