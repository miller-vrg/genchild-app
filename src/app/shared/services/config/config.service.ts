import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IConfig } from '@/shared/types/interfaces';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _http = inject(HttpClient);
  private _cookieService = inject(CookieService);

  getConfig():Observable<IConfig>{
    return this._http.get<IConfig>('/assets/config/config.json');
  }

  async setConfig(){
    const {rutaBase} = await lastValueFrom(this.getConfig());
    this._cookieService.set(environment.nameRutaBase,rutaBase,{path:'/'})
  }

}
