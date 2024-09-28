import { environment } from '@/environments/environment.development';
import { IPaciente, IPacienteEntity, IPacienteView, IPacienteViewEntity, IPagination } from '@/shared/types';
import { toPacienteView } from '@/shared/utils/mapper';
import { toPaciente, toPacienteEntity } from '@/shared/utils/mapper/paciente.mappper';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private readonly http = inject(HttpClient);
  data = signal<IPaciente>({
    id: '',
    dni: 0,
    nombres: '',
    apellidos: '',
    edad: 0,
    idTipoDni: 0,
  });

  create(paciente: IPaciente):Observable<IPaciente>{
    return this.http.post<{ data: IPacienteEntity }>(environment.apiRout.pacientes,paciente)
    .pipe( map( ({data}) =>  toPaciente(data) ) )
  }

  getAllView(query: string = ''): Observable<IPagination<IPacienteView[]>>{
    return this.http.get<IPagination<IPacienteViewEntity[]>>(`${environment.apiRout.pacientes}${query}`)
   .pipe( map( pagination => {
    pagination.data = pagination.data.map(  toPacienteView );
    return pagination;
   }));
  }

  getOne(id:string):Observable<IPacienteView>{
    return this.http.get<IPacienteViewEntity>(`${environment.apiRout.pacientes}/${id}`)
   .pipe( map( toPacienteView ) )
  }

  update(id: string, paciente: IPaciente): Observable<IPaciente> {
    return this.http.put<{ data: IPacienteEntity }>(`${environment.apiRout.pacientes}/${id}`, paciente )
      .pipe(map(({ data }) => toPaciente(data)));
  }
}

