import { getDecodeJWT } from '@/shared/utils';
import { inject } from '@angular/core';
import { CanActivateFn, Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const LoginGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const routerOut = inject(Router);
  const token = cookieService.get('token')
  const res = getDecodeJWT(token) as { id: string , rol: string};
  if(res) {
    routerOut.navigateByUrl('/');
    return false;
  }
  return true;
};
