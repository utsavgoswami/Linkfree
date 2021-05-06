import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Field names capitalized to comply with server-side model
export interface Link {
  LinkId?: string,
  Priority: number,
  Title: string,
  URL: string
}

@Injectable({
  providedIn: 'root'
})

export class LinkService {
  constructor(private httpClient: HttpClient) { }
  
  private BASE: string = 'http://13.92.37.176' 
  private GET_ENDPOINT: string = this.BASE + '/api/v1/Users/';
  private GET_VERIFY_TOKEN_VALIDITY_ENDPOINT: string = this.BASE + '/api/v1/Links'; 
  private POST_PATCH_DELETE_ENDPOINT: string = this.BASE + '/api/v1/Links/';

  public getUserLinksWithValidityCheck(): Observable<any> {
    return this.httpClient.get<any>(this.GET_VERIFY_TOKEN_VALIDITY_ENDPOINT);
  }

  public getUserLinks(userName: string): Observable<any> {
    const fullEndpoint: string = this.GET_ENDPOINT + userName + "/links";

    return this.httpClient.get(fullEndpoint);
  }

  public deleteLink(linkId: string): Observable<any> {
    const fullEndpoint: string = this.POST_PATCH_DELETE_ENDPOINT + linkId;

    return this.httpClient.delete(fullEndpoint);
  }

  public updateLink(updatedLink: Link): Observable<any> {
    const fullEndpoint: string = this.POST_PATCH_DELETE_ENDPOINT + updatedLink.LinkId;

    return this.httpClient.put(fullEndpoint, updatedLink);
  }

  public createLink(linkToCreate: Link): Observable<any> {
    return this.httpClient.post(this.POST_PATCH_DELETE_ENDPOINT, linkToCreate);
  }
}
