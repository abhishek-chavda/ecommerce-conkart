import { HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private router = inject(Router);

  public isAdmin = signal<string>('');
  public isLoading = signal<boolean>(false);

  constructor() {
    this.router.events.subscribe((res) => {
      if (res instanceof ActivationEnd) {
        this.isAdmin.set(
          this.router.url.includes('admin')
            ? 'ADMIN'
            : this.router.url.includes('customer')
            ? 'CUSTOMER'
            : ''
        );
      }
    });
  }

  public get uniqueId(): string {
    return `${Date.now() * Math.floor(Math.random() * 1000)}`;
  }

  public getParams(params: { [key: string]: any }): HttpParams {
    const newParams: any = {};
    const processParams = (obj: { [key: string]: any }, prefix?: string) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (value !== null && value !== '') {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'object' && !Array.isArray(value)) {
              processParams(value, newKey);
            } else {
              newParams[newKey] = value;
            }
          }
        }
      }
    };
    processParams(params);
    return new HttpParams({ fromObject: newParams });
  }
}
