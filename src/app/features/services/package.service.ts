import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../interfaces/features';
import { environment } from '../../../environments/environment.development';

const baseUrl = `${environment.apiUrl}packages/`;

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private http = inject(HttpClient);

  constructor() {}

  public getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(
      `${baseUrl}?_expand=category&_expand=brand&_expand=product`
    );
  }

  public getPackagesById(id: string): Observable<Package[]> {
    return this.http.get<Package[]>(
      `${baseUrl}${id}?_expand=category&_expand=brand`
    );
  }

  public createPackage(packageData: Package): Observable<Package> {
    return this.http.post<Package>(`${baseUrl}`, packageData);
  }

  public updatePackage(packageData: Package): Observable<Package> {
    return this.http.put<Package>(`${baseUrl}${packageData.id}`, packageData);
  }

  public deletePackage(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}${id}`);
  }
}
