import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';

import {
  CaracteristicasService,
  ExamenService,
  PacienteService,
  AsociacionService,
  EnfermedadService
} from '@/shared/services';
import { SharedModule } from '@/shared/modules/shared/shared.module';
import {ICabeceraTable, ICaracteristica, IEnfermedad, IPacienteView, Meta } from '@/shared/types';
import { createLocalEnfermedad, createLocalPacienteView } from '@/shared/utils';
import { cabeceraExamenViewTable } from '@/shared/utils';
import { filtros } from './helpers/filtros';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'info-paciente',
  standalone: true,
  imports: [ CommonModule,
    RouterModule,
    SharedModule,
    FormsModule],
  templateUrl: './info-paciente.component.html',
  styleUrl: './info-paciente.component.scss'
})
export class InfoPacienteComponent implements OnInit {
  private readonly routerIn = inject(ActivatedRoute);
  private readonly pacienteService = inject(PacienteService);
  private readonly examenService = inject(ExamenService);
  private pacienteId = signal<string>('');
  pacienteView = signal<IPacienteView>(createLocalPacienteView());
  @Input() showModal = signal<boolean>(false);
  @Input() isShowEmerCaracteristicas = signal<boolean>(false);
  codigoExamen = signal<string>('');
  opcions = filtros;
  showDiagnostico = signal<boolean>(false);
  paciente = signal<IPacienteView>(createLocalPacienteView());
  examenes = signal<any[]>([]);
  cabecera = signal<ICabeceraTable[]>([...cabeceraExamenViewTable]);
  options = [
    {
      name: 'Certificado de nacido vivo',
      value: 'certificado_nacido'
    },
    {
      name: 'Registro civil',
      value: 'rgistro_civil'
    },
    {
      name: 'Tarjeta de identidad',
      value: 'tarjeta_id'
    }
  ]

  private readonly caracteristicaService = inject(CaracteristicasService);
  private readonly asociacionService = inject(AsociacionService);
  private readonly enfermedadService = inject(EnfermedadService);
  private subscribeRouter!: Subscription;
  @Input() isShow = signal<boolean>(false);
  @Input() enfermedad = signal<IEnfermedad>(createLocalEnfermedad());
  asociaciones = signal<number[]>(this.enfermedadService.data().caracteristicaId ?? []);
  characteristics = signal<ICaracteristica[]>([]);
  characteristicsForSearch = signal<ICaracteristica[]>([]);
  workToSearch: string = '';

  constructor() {
    this.enfermedadService.update(this.enfermedad());

  }

  ngOnInit(): void {
   this.subscribeRouter = this.routerIn.params.subscribe( ({id}) => this.loandPaciente(id) );
  }

  onDetails( examen : any) {
    this.showDiagnostico.update( valueOld => true );
    this.codigoExamen.update( codigoOld => examen.codigo);
  }

  async loandPaciente( id: string ) {
    this.pacienteId.update( dataOld => id );
    try{
      const paciente = await lastValueFrom( this.pacienteService.getOne(id) );
      this.paciente.update( dataOld => paciente);
      this.loadingExamenes(`?nameFiel=paciente_id&valueFiel=${this.pacienteId()}`);
    }catch( error ){

    }
  }

  async loandExamenes( id: string ) {
    try{
      const examanes = await lastValueFrom( this.examenService.getAllByPaciente(id) );
      this.examenes.update( dataOld => [...examanes]);
    }catch( error ){

    }
  }

  async loadingExamenes(query: string = '') {
    try {
      const { data, meta }  = await lastValueFrom(this.examenService.getAll(query));
      this.examenes.update( listOld => [...data])
      this.meta.update( metaOld => meta)
    } catch (error) {
    }
  }
  OnDestroy(){
    this.subscribeRouter.unsubscribe();
  }

  closed(){
    this.showModal.update( dataOld => false);
  }

  shearch() {

  }

  closeModal() {
    this.isShow.update( valueOld => false);
  }

  submitSelection() {
    this.closeModal();
  }
  onSeach( {filtro, value}: { filtro: string; value: string; }) {
    if(!( filtro.length && value.length )) return;
    this.loadingExamenes(`?nameFiel=${filtro}&valueFiel=${value}&nameFile2=paciente_id&valueFile2=${this.pacienteId()}`);
  }

  onReset(){
      this.loandExamenes(this.pacienteId())
  }
  async createExamen(){
    try{
      const res = await lastValueFrom( this.examenService.createExamen(this.asociaciones(),(this.paciente().id as string)) );
      console.log({res})
    }catch(e){
      console.log(e)
    }
  }

  openModal() {
    this.isShowEmerCaracteristicas.update( valueOld => !valueOld)
  }
  opendModal() {
    this.showModal.update( valueOld => !valueOld)
  }

  onAsociaciones(asociaciones: number[]){
    this.asociaciones.update( valueOld => [...asociaciones]);
  }
  actual = signal<number>(1)
  meta = signal<Meta>({
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  loandPagniation(page: number) {
    this.loadingExamenes(`?page=${page}&nameFiel=paciente_id&valueFiel=${this.pacienteId()}`);
    this.actual.update( pageOld => page );

  }
  }


