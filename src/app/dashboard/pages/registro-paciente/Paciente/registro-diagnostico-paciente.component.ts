import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal, Input } from '@angular/core';
import { SharedModule } from '@/shared/modules/shared/shared.module';
import { EnfermedadService } from '@/shared/services';
import { AsociacionService } from '@/shared/services/asociacion/asociacion.service';
import { CaracteristicasService } from '@/shared/services/caracteristicas/caracteristicas.service';
import { ICabeceraTable, ICaracteristica, IEnfermedad } from '@/shared/types';
import { createLocalEnfermedad } from '@/shared/utils';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs'; import { PacienteService } from '@/shared/services/paciente/paciente.service';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment.development';

@Component({
  selector: 'page-paciente',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './registro-diagnostico-paciente.component.html',
  styleUrl: './registro-diagnostico-paciente.component.scss'
})
export class RegistroDiagnosticoPacienteComponent implements OnInit {

  private pacienteService = inject(PacienteService);
  paciente = this.pacienteService.data;

  @Input() showModal = signal<boolean>(false);
  @Input() isShowEmerCaracteristicas = signal<boolean>(false);
  options = [

    {
      name: 'Certificado de nacido vivo',
      value: '1'
    },
    {
      name: 'Registro civil',
      value: '2'
    },
    {
      name: 'Tarjeta de identidad',
      value: '3'
    }
  ]
cabecera: ICabeceraTable[];

  private readonly caracteristicaService = inject(CaracteristicasService);
  private readonly router = inject(Router);
  private readonly asociacionService = inject(AsociacionService);
  private readonly enfermedadService = inject(EnfermedadService);
  @Input() isShow = signal<boolean>(false);
  @Input() enfermedad = signal<IEnfermedad>(createLocalEnfermedad());
  asociaciones = signal<number[]>(this.enfermedadService.data().caracteristicaId ?? []);
  characteristics = signal<ICaracteristica[]>([]);
  characteristicsForSearch = signal<ICaracteristica[]>([]);
  workToSearch: string = '';
  data: any[] = [
    {
      id: new Date().getTime(),
      nombre: 'Miller vrg',
      dni: 123456,
      fecha: new Date().getFullYear(),
    },
    {
      id: new Date().getTime(),
      nombre: 'Miller vrg 2',
      dni: 123456,
      fecha: new Date().getFullYear(),
    },
    {
      id: new Date().getTime(),
      nombre: 'Miller vrg 3',
      dni: 123456,
      fecha: new Date().getFullYear(),
    }
];


  constructor() {
    this.enfermedadService.update(this.enfermedad());
    this.loadingCaracteristicas();

    this.cabecera =[
      {
      nameCol:  'ID',
        isShow: false
      },
      {
        nameCol:'Nombres',
        isShow: true
      },
      {
       nameCol:'Número de diagnósticos',
       isShow: true
      },
      {
        nameCol:'Fecha',
        isShow: true
      },
      {
        nameCol:'Acciones',
        isShow: true
      }
    ]
  }
  ngOnInit(): void {
    //this.loadingCaracteristicas();
  }

  onDetails(paciente: any) {
    this.router.navigateByUrl(`/${environment.rutaRaiz}/paciente/${paciente.id}`);
    console.log({paciente})
  }

  closed(){
    this.showModal.update( dataOld => false);
  }

  async createPaciente(){
    this.paciente.update( p => {
      delete paciente.id;
      return paciente;
    })
      const paciente = await lastValueFrom( this.pacienteService.create( this.paciente()))
      console.log({paciente})
  }

  openModal() {
    this.isShowEmerCaracteristicas.update( valueOld => !valueOld)
  }

  open() {
    this.showModal.update( valueOld => !valueOld)
  }

  get listCaracteristicas () {
    return this.characteristics
  }
  async loadingCaracteristicas() {
    try {
      const asociaciones  = await lastValueFrom(this.asociacionService.foundByParams({ enfermedadId: this.enfermedadService.data()?.id }));
      const caracteristicaId : number[]= [];

      asociaciones.forEach( asociacion => {
        caracteristicaId.push(asociacion.caracteristicaId as number);
      });

      this.asociaciones.update( dataOld => [...caracteristicaId]);

      const enfermedad: IEnfermedad = {
        ...createLocalEnfermedad(),
        ...this.enfermedad(),
        caracteristicaId
      }

      this.enfermedadService.updateLocal(enfermedad)
      const res = await lastValueFrom(this.caracteristicaService.getAll());
      this.characteristics.update( dataOld => [...res]);
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

  shearch() {
    const res = this.characteristics().filter( v => v.nombre.toLowerCase().includes(this.workToSearch.toLowerCase()) || v.codigo.toString().includes(this.workToSearch))
    this.characteristicsForSearch.update( dataOld => [...res]);
  }

  closeModal() {
    this.isShow.update( valueOld => false);
  }

  submitSelection() {
    this.closeModal();
  }

}

