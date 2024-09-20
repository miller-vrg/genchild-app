import { environment } from '@/environments/environment.development';
import { toEnfermedad, toEnfermedadEntity } from '@/shared/utils/mapper';
import { IEnfermedad, IEnfermedadEntity, IHttpResponse, IPagination } from '@/shared/types';
import { createLocalEnfermedad } from '@/shared/utils';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {
  private _http = inject(HttpClient);
  data = signal<IEnfermedad>(createLocalEnfermedad());
  page = signal<number>(1);
  take = signal<number>(40);

  getAll( query: string = ''):Observable<IPagination<IEnfermedad[]>>{
    return this._http.get<IPagination<IEnfermedadEntity[]>>(`${environment.apiRout.enfermedad}?page=${this.page()}&take=${this.take()}${query}`)
    .pipe( map( pagination => {
      pagination.data = pagination.data.map(  toEnfermedad );
      return pagination;
    }));
  }

  add(enfermedad: IEnfermedad):Observable<IEnfermedad>{
    enfermedad = toEnfermedadEntity(enfermedad);
    delete enfermedad.id;
    return this._http.post<{data:IEnfermedadEntity}>(environment.apiRout.enfermedad,enfermedad)
    .pipe( map( ({data}) => {
      data = toEnfermedad(data);
      this.data.update( dataOld => ({...data}));
      return data;
    } ));
  }

  update(enfermedad: IEnfermedad = this.data()):Observable<IHttpResponse<IEnfermedad>>{
    enfermedad = toEnfermedadEntity(enfermedad);
    return this._http.put<IHttpResponse<IEnfermedadEntity>>(`${environment.apiRout.enfermedad}/${enfermedad.id}`,enfermedad)
    .pipe( map( response => {
      response.data = toEnfermedad(response.data);
      return response;
    } ));
  }

  addImg(file: File){
    const formData = new FormData();
    formData.append('fileImg', file);

    return this._http.post<{ data: {rutaFile: string}}>(`${environment.apiRout.enfermedad}/img`, formData)
    .pipe(
      map( async  ({data}) => {
        this.data.update( dataOld => ({...dataOld, imagen_perspectiva: data.rutaFile}) );
        await lastValueFrom(this.update());
        return data.rutaFile;
      } )
    )
  }

updateLocal(enfermedad: IEnfermedad){
  this.data.update( dataOld => ({...enfermedad}));
}
  delet(id?: number): Observable<{data:any,message:string}>{
    id = (!id) ? this.data().id : id;
    return this._http.delete<{data:any,message:string}>(`${environment.apiRout.enfermedad}/${id}`);
  }
}
