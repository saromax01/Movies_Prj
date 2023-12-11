import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.apiURL;
  private authSubj = new BehaviorSubject<null | Auth>(null);
  user$ = this.authSubj.asObservable();
  user!: Auth;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<Auth>(`${this.apiURL}login`, data).pipe(
      tap((dataLogin) => {
        this.authSubj.next(dataLogin);
        this.user = dataLogin;
        localStorage.setItem('user', JSON.stringify(dataLogin));
        alert('Login effettuato');
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post(`${this.apiURL}register`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']), catchError(this.errors);
      })
    );
  }
  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  private errors(err: any) {
    console.log(err);
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
