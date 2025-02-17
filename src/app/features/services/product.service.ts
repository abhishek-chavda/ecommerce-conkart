import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../features/interfaces/features';
import { CommonService } from '../../shared/services/common.service';

const baseUrl = `${environment.apiUrl}products/`;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private commonService = inject(CommonService);

  constructor() {}

  public getProducts(params?: any): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl, {
      params: this.commonService.getParams(params),
    });
  }

  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}${id}`);
  }

  public createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(baseUrl, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${baseUrl}${product.id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}${id}`);
  }

  public searchProducts(searchTerm: string): Observable<any> {
    const lowerSearchTerm = searchTerm.toLowerCase();

    // Return an observable of filtered products
    return this.getProducts().pipe(
      map((products) => {
        return products.filter((product) => {
          // Early return if a match is found in any of the simple fields
          if (
            product.name.toLowerCase().includes(lowerSearchTerm) ||
            product.description.toLowerCase().includes(lowerSearchTerm) ||
            product.brand.toLowerCase().includes(lowerSearchTerm) ||
            product.category.toLowerCase().includes(lowerSearchTerm)
          ) {
            return true;
          }

          const { color, size } = product.attributes;
          return (
            color.some((c) => c.toLowerCase().includes(lowerSearchTerm)) ||
            size.some((s) => s.toLowerCase().includes(lowerSearchTerm))
          );
        });
      })
    );
  }
}
