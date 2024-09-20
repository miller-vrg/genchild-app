import { environment } from '@/environments/environment.development';
import { ICaracteristica } from '@/shared/types';
import { ICaracteristicaEntity } from '@/shared/types/models/caracteristica.entity';
import { toCaracteristica } from '@/shared/utils/mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {
  private readonly _http = inject(HttpClient);

  getAll(): Observable<ICaracteristica[]> {
    return this._http.get<{data: ICaracteristicaEntity[]}>(`${environment.apiRout.caracteristicas}`)
    .pipe(
      map( ({data}) => data.map( toCaracteristica) )
    );
  }


}
