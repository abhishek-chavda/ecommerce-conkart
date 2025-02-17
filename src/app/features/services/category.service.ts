import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../features/interfaces/features';
import { environment } from '../../../environments/environment.development';

const baseUrl = `${environment.apiUrl}categories/`;
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  constructor() {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}`);
  }

  public createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${baseUrl}`, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${baseUrl}${category.id}`, category);
  }

  public deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}${id}`);
  }
}
