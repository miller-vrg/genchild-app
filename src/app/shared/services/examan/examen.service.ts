import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ExamenView, IPagination } from '@/shared/types/interfaces';
import { Observable, map } from 'rxjs';
import { ExamenViewEntity } from '@/shared/types';
import { toExamenView } from '@/shared/utils/mapper';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private readonly http = inject(HttpClient);

  getAllByPaciente(id: string): Observable<any> {
    return this.http.get(`${environment.apiRout.examenes}/Paciente/${id}`)
  }

  getAll(query: string = ''): Observable<IPagination<ExamenView[]>>{
    return this.http.get<IPagination<ExamenViewEntity[]>>(`${environment.apiRout.examenes}${query}`)
      .pipe(
        map( pagination => {
          pagination.data = pagination.data.map(  toExamenView );
          return pagination;
        })
      )
  }

  createExamen( caracteristicasId: number[], pacienteId: string){
      const params = {
        caracteristicas: `{${caracteristicasId.join(',')}}`,
        pacienteId
      };
      return this.http.post(environment.apiRout.examenes, params )
  }

}
