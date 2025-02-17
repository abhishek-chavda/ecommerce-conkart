import { inject, Injectable } from '@angular/core';
import { Unit } from '../interfaces/features';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

const baseUrl = `${environment.apiUrl}units/`;

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private http = inject(HttpClient);

  public getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${baseUrl}`);
  }

  public createUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${baseUrl}`, unit);
  }

  public updateUnit(unit: Unit): Observable<Unit> {
    return this.http.put<Unit>(`${baseUrl}${unit.id}`, unit);
  }

  public deleteUnit(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}${id}`);
  }
}
