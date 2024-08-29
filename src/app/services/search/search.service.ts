import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchByQuery(query: string) {
    return this.http.get(`${environment.apiUrl}/search?q=${query}`);
  }
}
