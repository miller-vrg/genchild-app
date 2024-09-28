import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { SharedModule } from '@/shared/modules/shared/shared.module';
import { EnfermedadService } from '@/shared/services';
import { AsociacionService } from '@/shared/services/asociacion/asociacion.service';
import { CaracteristicasService } from '@/shared/services/caracteristicas/caracteristicas.service';
import { ICabeceraTable, ICaracteristica, IEnfermedad, IPaciente, IPacienteView, Meta, TipoDni } from '@/shared/types';
import { cabeceraPacienteView, createLocalEnfermedad, createLocalPacienteView } from '@/shared/utils';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs'; import { PacienteService } from '@/shared/services/paciente/paciente.service';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment.development';
import { filtros } from './helpers/filtros';
import { TipoDniService } from '@/shared/services/tipo-dni/tipoDni.service';
@Component({
  selector: 'page-paciente',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss'
})
export class PacienteComponent implements OnInit {

  private pacienteService = inject(PacienteService);
  paciente = this.pacienteService.data;
  opcions = filtros;
  @Input() showModal = signal<boolean>(false);
  @Input() isShowEmerCaracteristicas = signal<boolean>(false);
  options = signal<{ name:string, value:string }[]>([])
  cabecera = cabeceraPacienteView;

  private readonly router = inject(Router);
  private readonly tipoDniService = inject(TipoDniService);
  private readonly enfermedadService = inject(EnfermedadService);
  @Input() isShow = signal<boolean>(false);
  @Input() enfermedad = signal<IEnfermedad>(createLocalEnfermedad());
  asociaciones = signal<number[]>(this.enfermedadService.data().caracteristicaId ?? []);
  characteristics = signal<ICaracteristica[]>([]);
  characteristicsForSearch = signal<ICaracteristica[]>([]);
  workToSearch: string = '';
    pacientes = signal<IPacienteView[]>([]);
  constructor() {
    this.enfermedadService.update(this.enfermedad());
    this.loandPaciente();
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

  ngOnInit(): void {
    this.loandPaciente();
    this.loandTipoDNi();
  }

  async loandTipoDNi(){
    try{
      const tipos = await lastValueFrom( this.tipoDniService.getAll() );
      this.options.update( options => tipos.map( ({id,nombre}) => ({ value: id+'', name: nombre})));
    }catch(e){

    }
  }

  async loandPaciente(query: string = '') {
    try{
      const {data, meta} = await lastValueFrom(this.pacienteService.getAllView(query))
      this.pacientes.update( pacienstesOld => [...data ]);
      this.meta.update(metaOld => ({...meta }));
    }catch(e){

    }
  }

  onDetails(paciente: any) {
    this.router.navigateByUrl(`/${environment.rutaRaiz}/pacientes/${paciente.id}`);
  }

  onSeach( {filtro, value}: { filtro: string; value: string; }) {
    if(!( filtro.length && value.length )) return;
    this.loandPaciente(`?nameFiel=${filtro}&valueFiel=${value}`);
  }

  onReset(){
    this.loandPaciente();
  }

  closed(){
    this.showModal.update( dataOld => false);
  }

  async createPaciente(){
    const paciente = {...this.paciente()};
    delete paciente.id;
    const pacienteNew = await lastValueFrom( this.pacienteService.create( paciente ));
    this.paciente.update( pacienteOld => ({...pacienteNew}))
  }

  openModal() {
    this.isShowEmerCaracteristicas.update( valueOld => !valueOld)
  }

  open() {
    this.paciente.update( dataOld => ({
      id: '',
      dni: 0,
      nombres: '',
      apellidos: '',
      edad: 0,
      idTipoDni: 0,
    }));
    this.showModal.update( valueOld => !valueOld)
  }

  get listCaracteristicas () {
    return this.characteristics
  }

  onAsociacion(id?: number) {
    if(this.asociaciones().includes(id as number)) this.asociaciones.update( list => list.filter( v => v !== id));
    else this.asociaciones.update( list => [...list,id as number]);
    this.enfermedad.update( data => ({
      ...data,
      caracteristicaId: [...this.asociaciones()]
    }))
  }

  shearch() {

  }

  closeModal() {
    this.isShow.update( valueOld => false);
  }

  submitSelection() {
    this.closeModal();
  }

  onEdit( paciente: IPacienteView ) {

   const pacienteToUpdate : IPaciente = {
    id: paciente.id,
     dni: paciente.dni,
     nombres: paciente.nombres,
     apellidos: paciente.apellidos,
     edad: paciente.edad,
     idTipoDni: Number(paciente.idTipoDni)
   }// ya prueba
    this.paciente.update( dataOld => ({...pacienteToUpdate}));
    this.showModal.update( valueOld => !valueOld);
  }

  async update(){
    const paciente = {...this.paciente()};
    delete paciente.id;
    try{
      const pacienteNew = await lastValueFrom( this.pacienteService.update(this.paciente().id as string, paciente));
      this.paciente.update( pacienteOld => ({...pacienteNew}));
  }catch(e){
    console.log(e)
  }
  }

  loandPagniation(page: number) {
    this.loandPaciente(`?page=${page}`);
    this.actual.update( pageOld => page );
  }
}

