import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { environment } from '@/environments/environment.development';
import { IRol, IRolEntity } from '@/shared/types';
import { toRol } from '@/shared/utils/mapper';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<IRol[]> {
    return this.http.get<{ data: IRolEntity[] }>(`${environment.apiRout.rol}`)
    .pipe( map( ({data}) => data.map( toRol ) ));
  }


}

