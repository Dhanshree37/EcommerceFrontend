import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';

// --------------------
// Shared State
// --------------------
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

// --------------------
// Helper Function
// --------------------
function addAuthHeader(req: HttpRequest<any>, token: string) {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
}

// --------------------
// Main Interceptor
// --------------------
export const authInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const auth = inject(AuthService);
  const token = auth.accessToken;

  // Clone the request to always send cookies
  req = req.clone({ withCredentials: true });

  // Bypass the refresh endpoint itself
  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  if (token) {
    req = addAuthHeader(req, token);
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Case 1: Token expired (Unauthorized)
      if (err.status === 401) {
        if (!isRefreshing) {
          // Step 1 — Start the refresh process
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return auth.refreshToken().pipe(
            switchMap((res: any) => {
              const newAccessToken = res.accessToken;
              auth.setAccessToken(newAccessToken);

              // Step 2 — Broadcast token to waiting requests
              isRefreshing = false;
              refreshTokenSubject.next(newAccessToken);

              // Step 3 — Retry original request
              return next(addAuthHeader(req, newAccessToken));
            }),

            catchError((refreshErr) => {
              // Refresh failed — logout user, clear queue
              console.error('Token refresh failed', refreshErr);
              isRefreshing = false;
              refreshTokenSubject.error(refreshErr);
              auth.logout();
              return throwError(() => refreshErr);
            })
          );
        } else {
          // Step 4 — Wait until refresh completes
          return refreshTokenSubject.pipe(
            filter((token) => token !== null), // wait for valid token
            take(1), // only once
            switchMap((token) => {
              // retry original request with new token
              return next(addAuthHeader(req, token!));
            })
          );
        }
      }

      // Case 2: Other errors (not 401)
      return throwError(() => err);
    })
  );
};
