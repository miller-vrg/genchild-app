import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { SharedModule } from '@/shared/modules/shared/shared.module';
import {ExamenView, ICabeceraTable, ICaracteristica, IEnfermedad, IPacienteView, IPacienteViewEntity, ROLES, Meta } from '@/shared/types';
import { cabeceraExamenViewTable, cabeceraPacienteView, createLocalEnfermedad, createLocalPacienteView} from '@/shared/utils';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { ExamenService } from '@/shared/services';
import { toPacienteView } from '@/shared/utils/mapper';
import { filtros } from './helpers/filstros';
import { AuthenticationService } from '@/auth/services/authentication.service';
import { filtrosPaciente } from './helpers/filstrosPaciente';

@Component({
  selector: 'app-examenes',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './examenes.component.html',
  styleUrl: './examenes.component.scss'
})
export class ExamenesComponent implements OnInit {
  private readonly examenService = inject(ExamenService);
  private readonly _authService = inject(AuthenticationService);

  @Input() showPaciente = signal<boolean>(false);
  @Input() isShowEmerCaracteristicas = signal<boolean>(false);
  @Input() isShow = signal<boolean>(false);
  @Input() enfermedad = signal<IEnfermedad>(createLocalEnfermedad());
  showModal = signal<boolean>(false);
  actual =  signal<number>(1);
  showDiagnostico = signal<boolean>(false);
  asociaciones = signal<number[]>([]);
  characteristics = signal<ICaracteristica[]>([]);
  codigoExamen = signal<string>('');
  namePaciente = signal<string>('');
  endPoint = signal<string>('/Pacientes');
  pacienteView = signal<IPacienteView>(createLocalPacienteView());
  workToSearch: string = '';
  cabeceraPacienteView = signal<ICabeceraTable[]>([...cabeceraPacienteView]);
  cabeceraExamenViewTable = signal<ICabeceraTable[]>([]);
  examenes = signal<ExamenView[]>([]);
  opcions = filtros;
  opcionsPaciente = filtrosPaciente;
  roles = ROLES;
  readonly userActive = this._authService.user;

  ngOnInit(): void {
    this.loadingExamenes();
    const cabecera = [...cabeceraExamenViewTable];
    cabecera[4].isShow = true;
    this.cabeceraExamenViewTable.update( dataOld => [...cabecera])
  }

  onDetailsExamen( examen : any) {
    this.showDiagnostico.update( valueOld => true );
    this.codigoExamen.update( codigoOld => examen.codigo);
    this.namePaciente.update( codigoOld => examen.Paciente);
  }

  onSeach( {filtro, value}: { filtro: string; value: string; }) {
    if(!( filtro.length && value.length )) return;
    this.loadingExamenes(`?nameFiel=${filtro}&valueFiel=${value}`);
  }

  onSeachPaciente( {filtro, value}: { filtro: string; value: string; }) {
    console.log({filtro,value})
    if(!( filtro.length && value.length )) return;
    this.endPoint.update( endpointOld => `${endpointOld}?nameFiel=${filtro}&valueFiel=${value}`);
  }

  onReset(){
    this.loadingExamenes();
  }

  onResetSearchPaciente(){
    this.endPoint.update( endpointOld => '/Pacientes');
  }

  onAsociaciones(asociaciones: number[]){
    this.asociaciones.update( valueOld => [...asociaciones]);
  }

  onDetailPaciente(pacienteViewEntity: IPacienteViewEntity) {
    const pacienteView = toPacienteView(pacienteViewEntity);
    this.pacienteView.update( pacienteOld => ({...pacienteView}));
  }

  closed(){
    this.showModal.update( dataOld => false);
  }

  openModal() {
    this.isShowEmerCaracteristicas.update( valueOld => !valueOld)
  }
  opendModal() {
    this.showModal.update( valueOld => !valueOld)
  }

  verPaciente(){
    this.showPaciente.update( valueOld => !valueOld)
  }

  get listCaracteristicas () {
    return this.characteristics
  }

  async loadingExamenes(query: string = '') {
    try {
      const { data, meta }  = await lastValueFrom(this.examenService.getAll(query));
      this.examenes.update( listOld => [...data])
      this.meta.update( metaOld => meta)
    } catch (error) {
    }
  }

  onAsociacion(id?: number) {
    if(this.asociaciones().includes(id as number)) this.asociaciones.update( list => list.filter( v => v !== id));
    else this.asociaciones.update( list => [...list,id as number]);
    this.enfermedad.update( data => ({
      ...data,
      caracteristicaId: [...this.asociaciones()]
    }))
  }

  closeModal(modal : 'diagnostico' | 'newExamen' = 'newExamen') {
    if( modal === 'newExamen' ) this.isShow.update( valueOld => false);
    else this.showDiagnostico.update( valueOld => false);
  }

  submitSelection() {
    this.closeModal();
  }

 async createExamen(){
    try{
      const res: any = await lastValueFrom( this.examenService.createExamen(this.asociaciones(),(this.pacienteView().id as string)) );
     this.examenes.update( examenes => {
      examenes.unshift(res);
      examenes.pop();
      return examenes;
     })
    }catch(e){
      console.log(e)
    }
  }
  open() {
    this.isShow.update( valueOld => !valueOld)
  }

  meta = signal<Meta>({
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  loandPagniation(page: number) {
    this.loadingExamenes(`?page=${page}`);
    this.actual.update( pageOld => page );
  }
}
