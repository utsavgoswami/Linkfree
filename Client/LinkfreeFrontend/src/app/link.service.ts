import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  constructor(private httpClient: HttpClient) { }

  private GET_POST_ENDPOINT: string = 'https://localhost:44344/api/v1/Users/';
  private GET_VERIFY_TOKEN_VALIDITY_ENDPOINT: string = 'https://localhost:44344/api/v1/Links'; 
  private PATCH_DELETE_ENDPOINT: string = '';

  public getUserLinksWithValidityCheck() {
    return this.httpClient.get<any>(this.GET_VERIFY_TOKEN_VALIDITY_ENDPOINT);
  }

  public getUserLinks(userName: string) {
    const fullEndpoint: string = this.GET_POST_ENDPOINT + userName + "/links";

    return this.httpClient.get(fullEndpoint);
  }
}
