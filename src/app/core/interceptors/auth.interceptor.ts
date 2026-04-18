import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, BehaviorSubject, switchMap, filter, take, finalize, from } from 'rxjs';
import { AuthStore } from '../global-store/auth/auth.store';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // Skip refresh logic for login and refresh endpoints to avoid infinite loops
  if (req.url.includes('/api/v1/auth/login') || req.url.includes('/api/v1/auth/refresh')) {
    return next(req);
  }

  // Clone the request to include withCredentials for HTTP-only cookies
  const authReq = req.clone({
    withCredentials: true
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (isRefreshing) {
          // If a refresh is already in progress, wait for it to complete
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(() => next(authReq))
          );
        } else {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          console.log('401 detected, attempting silent refresh...');

          return from(authStore.refreshSession()).pipe(
            switchMap(() => {
              console.log('Session refreshed successfully. Retrying request.');
              isRefreshing = false;
              refreshTokenSubject.next(true);
              return next(authReq);
            }),
            catchError((refreshError) => {
              console.error('Refresh token expired. Redirecting to login.');
              isRefreshing = false;
              authStore.logout(); // This will clear the user state
              router.navigate(['/auth/login']);
              return throwError(() => refreshError);
            }),
            finalize(() => {
              isRefreshing = false;
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
