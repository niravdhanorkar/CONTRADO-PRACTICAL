import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_KEY: string = environment.API_KEY;

  constructor(private httpClient: HttpClient) {}

  getUserByName(username: string): Observable<any> {
    return this.httpClient.get(`${this.API_KEY}${username}`);
  }
  getRepolistFromUrl(repoURL: string): Observable<any> {
    return this.httpClient.get(repoURL);
  }
}
