import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attribute } from '../../features/interfaces/features';
import { environment } from '../../../environments/environment.development';

const baseUrl = `${environment.apiUrl}attributes/`;

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  private http = inject(HttpClient);

  constructor() {}

  public getAttributes(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(baseUrl);
  }

  public createAttribute(attribute: Attribute): Observable<Attribute> {
    return this.http.post<Attribute>(baseUrl, attribute);
  }

  public updateAttribute(attribute: Attribute): Observable<Attribute> {
    return this.http.put<Attribute>(`${baseUrl}${attribute.id}`, attribute);
  }

  public deleteAttribute(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}${id}`);
  }
}
