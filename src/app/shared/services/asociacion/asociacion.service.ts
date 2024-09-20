import { environment } from '@/environments/environment.development';
import { IAsociacionView } from '@/shared/types';
import { IAsociacionViewEntity } from '@/shared/types/models';
import { toAsociacionView } from '@/shared/utils/mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsociacionService {
  private readonly http = inject(HttpClient) ;
  constructor() { }


  foundByParams(asocacion: IAsociacionViewEntity):Observable<IAsociacionView[]>{
    return this.http.post<IAsociacionViewEntity[]>(`${environment.apiRout.asociacion}/ListarByParams`,asocacion)
    .pipe( map( list => list.map(toAsociacionView) ));
  }

}
