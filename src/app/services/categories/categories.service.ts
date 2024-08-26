import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get(`${environment.apiUrl}/categories`, {});
  }

  getCategoriesById(uid: string) {
    return this.http.get(`http://localhost:3000/categories/${uid}`, {});
  }
}
