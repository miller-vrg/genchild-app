import { environment } from '@/environments/environment.development';
import { SharedModule } from '@/shared/modules/shared/shared.module';
import { Component, Input, OnInit, effect, output, signal } from '@angular/core';

@Component({
  selector: 'subir-archivo',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.scss']
})
export class SubirArchivoComponent {

  @Input() show = signal<boolean>(false);
  @Input() rutaImg = signal<string>('');
  onFile = output<File>();
  imagenUrl = '';

  constructor(){
    effect( () => this.imagenUrl = (this.rutaImg().length)? this.rutaImg() : environment.imgDefault )
  }

  closed() {
    this.show.update(valueOld => false);
  }

  guardar({files}: HTMLInputElement){
    if(files) this.onFile.emit(files[0] as File);
    this.closed();
  }

  updateRutaImg(ruta = '',input: HTMLInputElement){
    this.rutaImg.update( rutaOld => ruta );
    if(!ruta.length){
      input.files = null;
      input.value = '';
    }
  }

  cargarImg(input: HTMLInputElement) {
    if(input.files) this.updateRutaImg(URL.createObjectURL(input.files[0]),input);
    else this.updateRutaImg('',input);
  }

}
