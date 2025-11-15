import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl + '/auth';
  public accessToken: string | null = null;
  private http = inject(HttpClient);

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http
      .post<{ accessToken: string; user: any }>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(
        tap((res) => {
          this.accessToken = res.accessToken;
        })
      );
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.accessToken = null;
      })
    );
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
      const expiry = payload.exp * 1000; // convert to ms
      return Date.now() < expiry;
    } catch {
      return false;
    }
  }

  refreshToken() {
    return this.http
      .post<{ accessToken: string }>(`${this.apiUrl}/refresh-token`, {})
      .pipe(
        tap((res) => {
          this.accessToken = res.accessToken; // update in-memory access token
        }),
        // map to just the access token so interceptor can use it easily
        map((res) => res.accessToken)
      );
  }
}
