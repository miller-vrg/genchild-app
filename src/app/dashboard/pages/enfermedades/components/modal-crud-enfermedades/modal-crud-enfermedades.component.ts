import { Component, Input, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { lastValueFrom } from 'rxjs';
import { SharedModule } from '@/shared/modules/shared/shared.module';
import { EnfermedadService } from '@/shared/services';
import { IEnfermedad } from '@/shared/types';
import { SubirArchivoComponent } from '../subir-archivo/subir-archivo.component';
import { environment } from '@/environments/environment.development';

@Component({
  selector: 'modal-crud-enfermedades',
  standalone: true,
  imports: [CommonModule, SharedModule, SubirArchivoComponent],
  templateUrl: './modal-crud-enfermedades.component.html',
  styleUrl: './modal-crud-enfermedades.component.scss'
})
export class ModalCrudEnfermedadesComponent {

  private enfermedadService = inject(EnfermedadService);
  @Input() showModal = signal<boolean>(false);
  @Input() enfermerdadSelect = signal<IEnfermedad | null >(null);
  imgEnfermedad!: File;
  onEnfermedad = output<IEnfermedad>();
  enfermedad = this.enfermedadService.data;
  rutaImg = signal<string>(this.enfermedad().imagen_perspectiva);
  isShowEmerCaracteristicas = signal<boolean>(false);
  isShowSubirArchivo = signal<boolean>(false);
  options = [
    {
      name: 'Si',
      value: 'Si'
    },
    {
      name: 'No',
      value: 'No'
    },
    {
      name: '?',
      value: '?'
    }
  ];

  closed(){
    this.showModal.update( dataOld => false);
  }

  async onFile(file: File | null) {
    this.imgEnfermedad = file as File;
  }

  openModal() {
    this.isShowEmerCaracteristicas.update( valueOld => true)
  }

  showSubirArchivo() {
    this.isShowSubirArchivo.update( valueOld => true);
    this.enfermedadService.addImg
  }


  async addEnfermedad(){
    try{
      let rutaImg = environment.imgDefault;

      if(this.imgEnfermedad) rutaImg = await lastValueFrom(this.enfermedadService.addImg(this.imgEnfermedad));
      this.enfermedad.update( valueOld => ({
        ...valueOld,
        imagen_perspectiva: rutaImg
      }));
      const enfermedad = await lastValueFrom(this.enfermedadService.add(this.enfermedad()));
      this.onEnfermedad.emit(enfermedad);
    }catch(err){
      console.log(err)
    }

  }

  async update() {
    try{
      let rutaImg = environment.imgDefault;
      if(this.imgEnfermedad) rutaImg = await lastValueFrom(this.enfermedadService.addImg(this.imgEnfermedad));
      this.enfermedad.update( valueOld => ({
        ...valueOld,
        imagen_perspectiva: rutaImg
      }));
      const {data} = await lastValueFrom(this.enfermedadService.update());
      this.enfermedad.update( dataOld => data );
      this.onEnfermedad.emit(data)
    }catch(err){

    }
  }

}
