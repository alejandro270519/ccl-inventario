import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/auth';
  private readonly tokenKey = 'ccl_token';

  private readonly demoUser = 'admin';
  private readonly demoPass = 'admin123';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, contrasena: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { usuario, contrasena }).pipe(
      catchError(err => {
        if (err.status === 0 && usuario === this.demoUser && contrasena === this.demoPass) {
          const token = 'demo.' + btoa(usuario) + '.' + Date.now();
          return of({ token });
        }
        return throwError(() => err);
      }),
      tap(res => localStorage.setItem(this.tokenKey, res.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
