import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://www.abcdefghijklmnopqrstuvxyz123.com.br/api_abcdefghijklmnopqrstuvxyz123';
  private clientId = '1022817188528987';
  private clientSecret = 'clgJPFT5C6pGa5iB2iwH0fQuPPafE5mU';
  private redirectUri = 'https://www.abcdefghijklmnopqrstuvxyz123.com.br/precifica';

  private isAuthenticated = false;
  private userRole: string = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    if (!username || !password) {
      console.log('Username ou password estão vazios');
      return of(false);
    }

    const body = { username: username, password: password };

    return this.http.post<any>(`${this.apiUrl}/login.php`, body)
      .pipe(
        map(response => {
          if (response && response.success) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.isAuthenticated = true;
            this.userRole = response.user.tipo_usuario;
            return response;
          } else {
            return false;
          }
        }),
        catchError(error => {
          console.error('Erro ao fazer login:', error);
          return of(false);
        })
      );
  }

  logout(): Observable<void> {
    localStorage.removeItem('user');
    location.reload();
    this.userRole = '';
    return of();
  }

  getUserRole(): string {
    return this.userRole;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
