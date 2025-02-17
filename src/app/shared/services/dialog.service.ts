import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private commonService = inject(CommonService);
  private dialog = inject(MatDialog);

  public openDialog<T>(
    component: any,
    data: T | null = null,
    apiService: any,
    apiMethod: string,
    refreshFunction: Function,
    width: string = '300px'
  ): void {
    const dialogRef = this.dialog.open(component, {
      width,
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      const objectToSend = {
        ...result,
        id: data ? result.id : this.commonService.uniqueId,
      };

      apiService[apiMethod](objectToSend).subscribe({
        next: () => refreshFunction(),
        error: (err: any) => console.error('Error: ', err),
      });
    });
  }
}
