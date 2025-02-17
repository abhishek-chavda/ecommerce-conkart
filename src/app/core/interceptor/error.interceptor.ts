import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, throwError } from 'rxjs';
import { CommonService } from './../../shared/services/common.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const commonService = inject(CommonService);
  commonService.isLoading.set(true);
  const handleError = (error: any) => {
    let errorMessage = 'An error occurred. Please try again.';

    // Client-side or network error
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Check your internet connection.';
    }
    // Server-side error
    else {
      switch (error.status) {
        case 0:
          errorMessage = 'Cannot connect to the server. Try again later.';
          break;
        case 400:
          errorMessage = 'Invalid request. Please check the input.';
          break;
        case 401:
          errorMessage = 'You need to log in.';
          break;
        case 404:
          errorMessage = 'Not found.';
          break;
        case 500:
          errorMessage = 'Something went wrong. Please try again later.';
          break;
        default:
          errorMessage = 'An error occurred. Please try again.';
      }
    }

    snackBar.open(errorMessage, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
    });
  };

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      handleError(err);
      return throwError(() => err);
    }),
    finalize(() => commonService.isLoading.set(false))
  );
};
