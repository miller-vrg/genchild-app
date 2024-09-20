import { environment } from '@/environments/environment.development';
import { TipoDni, TipoDniEntity } from '@/shared/types';
import { toTipoDni } from '@/shared/utils/mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDniService {
  private http = inject(HttpClient);

 getAll(): Observable<TipoDni[]>{
    return this.http.get<TipoDniEntity[]>(environment.apiRout.tipoDNI)
     .pipe(
        map( listData => listData.map( toTipoDni )
    ));
  }

}
