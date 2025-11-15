import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const auth = inject(AuthService);

  //Check in-memory access token first
  if (auth.accessToken && auth.isTokenValid(auth.accessToken)) {
    return of(true); // access token valid → allow route
  }

  //Otherwise, call backend to verify (refresh if needed)
  return http
    .get<{ loggedIn: boolean; accessToken?: string }>('/api/auth/check')
    .pipe(
      map((res) => {
        if (res.loggedIn) {
          if (res.accessToken) {
            auth.setAccessToken(res.accessToken);
          }
          return true;
        } else {
          router.navigate(['/auth/login']);
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/auth/login']);
        return of(false);
      })
    );
};
