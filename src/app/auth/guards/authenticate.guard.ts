import { getDecodeJWT } from '@/shared/utils';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '@/auth/services/authentication.service';
import { lastValueFrom } from 'rxjs';

export const authenticateGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const authService = inject(AuthenticationService);
  const routerOut = inject(Router);
  const token = cookieService.get('token')
  const res = getDecodeJWT(token) as { id: string , rol: string};
  if(!res) {
    routerOut.navigateByUrl('/login');
    return false;
  }

  if(!authService.user().id) lastValueFrom(authService.refreshUser());
  return true;
};
