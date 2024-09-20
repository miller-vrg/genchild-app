import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal, Input, input, effect, OnChanges, SimpleChanges } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.scss'
})
export class ResultadoComponent implements OnChanges {

  @Input() isShow = signal<boolean>(false);
  @Input() codigoExamen!: string;
  private http = inject(HttpClient);
  diagnosticos = signal<IDiagnostico[]>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if(this.codigoExamen.length ) this.loadingData();
  }

  async loadingData(){
    const diagnosticos = await lastValueFrom( this.getAll());
    this.diagnosticos.update( dataOld => [...diagnosticos]);
  }

  getAll(){
    return this.http.get<IDiagnostico[]>(`/Diagnosticos/Examen/${this.codigoExamen}`);
  }

}


interface IDiagnostico  {
  idDiagnostico: number,
  examenesId: number,
  codigoExamen: string,
  enfermedadId: number,
  enfermedad: string,
  caracteristicasPresentes: string,
  caracteristicasEnfermedad: string,
  porcentaje: string

}


