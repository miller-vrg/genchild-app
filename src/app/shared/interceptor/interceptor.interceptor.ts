import { environment } from '@/environments/environment';
import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';
import { AlertService } from '../services/alert/alert.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '@/auth/services/authentication.service';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const alertServices = inject(AlertService);
  const _authService = inject(AuthenticationService);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  const indexLoading = alertServices.add(
    {
      message: '',
      class: 'loading bg-gray-400 text-white'
    }
  );

  req = req.clone(
    {
      setHeaders:{ authorization: `Bearer ${token}`},
      url: `${environment.rutaBaseApi + req.url}`
    }
  )

  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) alertServices.removeLoading();
      if (event instanceof HttpResponse && event.body.message  ) {
          alertServices.add({
            message: event.body.message,
            class: 'bg-green-400 text-white'
          })

        }
      }),
      catchError((error : HttpErrorResponse) => {
        alertServices.removeLoading();
        alertServices.removeAlert(indexLoading);

        if(error instanceof ErrorEvent){
          const e = error as ErrorEvent;
         alertServices.add(
          {
            message: e.message,
            class: 'bg-red-400 text-white'
          }
         )
        }else{

          switch(error.status){
            case 400:
              alertServices.add(
                {
                  message: error.error.message,
                  class: 'bg-orange-400 text-white'
                }
               )
              break;
            case 401:
              alertServices.add(
                {
                  message: 'No estas autorizado a este recurso',
                  class: 'bg-orange-400 text-white'
                }
               )
               _authService.logaout();
              break;
            case 403:
              alertServices.add(
                {
                  message: error.error.message,
                  class: 'bg-orange-400 text-white'
                }
               )
              break;
            case 404:
              alertServices.add(
                {
                  message: error.error.message,
                  class: 'bg-orange-400 text-white'
                }
               )
              break;
            case 500:
              alertServices.add(
                {
                  message: 'Error en el serivor status: 500',
                  class: 'bg-red-400 text-white'
                }
               )
              break;
            default:
          }


        }


        return throwError(()=>error);
      }),
    )
};
