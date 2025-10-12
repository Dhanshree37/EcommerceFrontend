import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const http = inject(HttpClient);

  return http.get<{ loggedIn: boolean }>('/api/auth/check', { withCredentials: true }).pipe(
    map(res => {
      if (!res.loggedIn) router.navigate(['/auth/login']);
      return res.loggedIn;
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
