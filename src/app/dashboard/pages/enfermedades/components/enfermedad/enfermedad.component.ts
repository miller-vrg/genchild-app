import { AuthenticationService } from '@/auth/services/authentication.service';
import { environment } from '@/environments/environment.development';
import { EnfermedadService } from '@/shared/services';
import { IEnfermedad } from '@/shared/types';
import { Component, inject, input, output, Output, signal, effect } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-enfermedad',
  standalone: true,
  imports: [],
  templateUrl: './enfermedad.component.html',
  styleUrl: './enfermedad.component.scss'
})
export class EnfermedadComponent {

  private enfermedadService = inject(EnfermedadService);
  private authService = inject(AuthenticationService);
  isAdmin = this.authService.isAdmin();
  eventEnfermenda = output<void>();
  onDetails = output<IEnfermedad | undefined >();
  onDelete = output<number>();
  enfermedad = input<IEnfermedad>();
  rutaImgDefault = environment.imgDefault;


  emitEvent() {
    this.eventEnfermenda.emit();
    this.enfermedadService.data.update( dataOld => this.enfermedad() as IEnfermedad )
  }

  async delet() {
    //const res: {message:string} = await lastValueFrom(this.enfermedadService.delet(this.enfermedad()?.id));
    this.onDelete.emit(this.enfermedad()?.id as number);
    //console.log(res);
  }

  openModal() {
    if (this.enfermedad()) {
      this.onDetails.emit(this.enfermedad());
      const enfermedad = this.enfermedad() as IEnfermedad;
    } else {
      console.log("No hay datos de enfermedad para visualizar.");
    }
  }

  onLoad(event: Event) {
    const target = event.target as HTMLImageElement;
    target.style.display = 'block';
    const imgNext = target.nextElementSibling as HTMLImageElement;
    imgNext.style.display = 'none';
  }


}
