import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { createLocalUsuarioView } from '@/shared/utils/createLocal';
import { environment } from '@/environments/environment.development';
import { IPagination, IUsuarioView, IUsuarioViewEntity } from '@/shared/types';
import { Observable, map } from 'rxjs';
import { toUsuarioView } from '@/shared/utils/mapper';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  data = signal<IUsuarioView>({...createLocalUsuarioView()});

  create( user: any = {...this.data()} ): Observable<IUsuarioView> {
    delete user.fullname;
    delete user.rol;
    delete user.id;
    return this.http.post<{ data: IUsuarioViewEntity }>(`${environment.apiRout.usuarios}`, user)
    .pipe( map( ({data}) => toUsuarioView(data)) );
  }

  // update -> put
  // create -> post
  // lista -> get
  // eliminar -> delete

  getAll(query: string = ''): Observable<IPagination<IUsuarioView[]>> {
    return this.http.get<IPagination<IUsuarioViewEntity[]>>(`${environment.apiRout.usuarios}${query}`)
    .pipe( map( pagination => {
      pagination.data.map( toUsuarioView );
      return pagination;
    } ));
  }


  update(id: string, user: any): Observable<IUsuarioView> {
    delete user.fullname;
    delete user.rol;
    return this.http.put<{ data: IUsuarioViewEntity }>(`${environment.apiRout.usuarios}/${id}`, user)
      .pipe(map(({ data }) => toUsuarioView(data)));
  }
}

