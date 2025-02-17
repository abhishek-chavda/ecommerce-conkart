import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Brand } from '../../features/interfaces/features';

const baseUrl = `${environment.apiUrl}brands/`;

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private http = inject(HttpClient);

  public getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${baseUrl}`);
  }

  public createBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(`${baseUrl}`, brand);
  }

  public updateBrand(brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${baseUrl}${brand.id}`, brand);
  }

  public deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}${id}`);
  }
}
