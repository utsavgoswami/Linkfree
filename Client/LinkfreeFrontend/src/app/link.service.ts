import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  constructor(private httpClient: HttpClient) { }

  private GET_POST_ENDPOINT: string = 'https://localhost:44344/api/v1/Users/';
  private PATCH_DELETE_ENDPOINT: string = '';

  public getUserLinks(userName: string) {
    const fullEndpoint: string = this.GET_POST_ENDPOINT + userName + "/links";

    return this.httpClient.get(fullEndpoint);
  }
}
