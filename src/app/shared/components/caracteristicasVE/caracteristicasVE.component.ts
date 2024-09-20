import { AsociacionService } from '@/shared/services/asociacion/asociacion.service';
import { CaracteristicasService } from '@/shared/services/caracteristicas/caracteristicas.service';
import { ICaracteristica, IEnfermedad } from '@/shared/types';
import { createLocalEnfermedad } from '@/shared/utils';
import { Component, OnInit, inject, signal, Input, input, output } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'caracteristicasVE',
  templateUrl: './caracteristicasVE.component.html',
  styleUrl: './caracteristicasVE.component.scss'
})
export class CaracteristicasVE implements OnInit{

  private readonly caracteristicaService = inject(CaracteristicasService);
  private readonly asociacionService = inject(AsociacionService);
  @Input() isShow = signal<boolean>(false);
  @Input() enfermedad = signal<IEnfermedad>(createLocalEnfermedad());
  @Input() paciente = signal<IEnfermedad>(createLocalEnfermedad());
  onAsociaciones = output<number[]>();
  isLoadASociaciones = input<boolean>(false);
  asociaciones = signal<number[]>([...this.enfermedad().caracteristicaId || []]);
  characteristics = signal<ICaracteristica[]>([]);
  characteristicsForSearch = signal<ICaracteristica[]>([]);
  workToSearch: string = '';


  constructor() {
    this.loadingCaracteristicas();
  }

  ngOnInit(): void {
    this.loadingCaracteristicas();
  }

  get listCaracteristicas () {
    return this.characteristics
  }
  async loadingCaracteristicas() {
    try {
      if(this.isLoadASociaciones()) this.loadAsociaciones();
      const res = await lastValueFrom(this.caracteristicaService.getAll());
      this.characteristics.update( dataOld => [...res]);
    } catch (error) {
    }
  }

  async loadAsociaciones(){
    const asociaciones  = await lastValueFrom(this.asociacionService.foundByParams({ enfermedadId: this.enfermedad()?.id }));
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
    this.onAsociaciones.emit(this.enfermedad().caracteristicaId as number[]);
    this.isShow.update( valueOld => false);
  }

  submitSelection() {
    this.closeModal();
  }

}
