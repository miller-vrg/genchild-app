import { environment } from '@/environments/environment.development';
import { IUserLogin, IUsuarioView, IUsuarioViewEntity } from '@/shared/types';
import { createLocalUsuarioView } from '@/shared/utils';
import { toUsuarioView } from '@/shared/utils/mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);
  user = signal<IUsuarioView>(createLocalUsuarioView());
  isAdmin =  computed( () => this.user().rolId === 1 );

  constructor() { }

  authenticate(user: IUserLogin): Observable<{token: string}> {
    return this.http.post<{token: string, user: IUsuarioViewEntity}>(`${environment.apiRout.autentication}/login`, user)
      .pipe(
        map(res => {
          this.cookieService.set('token', res.token, { path: '/' });
          this.user.update(userOld => toUsuarioView(res.user));
          return res;
        }),
        catchError(error => {//Esto me permite redirigir al usuario al login y manejar errores
          this.router.navigateByUrl('login');
          return of({token: '', user: createLocalUsuarioView()} as any);
        })
      );
  }

  logaout() {
    this.user.update(userOld => createLocalUsuarioView());
    this.cookieService.delete('token', '/');
    this.router.navigateByUrl('login');
  }

  refreshUser() {
    console.log('Refreshing user');
    return this.http.get<IUsuarioViewEntity>(`${environment.apiRout.autentication}/Refresh`)
      .pipe(
        map(res => {
          this.user.update(userOld => toUsuarioView(res));
          console.log('Refresh');
          return res;
        })
      );
  }
}
