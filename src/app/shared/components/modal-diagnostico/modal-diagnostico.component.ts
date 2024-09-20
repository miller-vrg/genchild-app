import { ModalComponent, ResultadoComponent } from '@/shared/components';
import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'modal-diagnostico',
  templateUrl: './modal-diagnostico.component.html',
  styleUrl: './modal-diagnostico.component.scss'
})
export class ModalDiagnosticoComponent {

  namePaciente = input<string>();
  codigoExamen = input<string>('');
  @Input() showDiagnostico = signal<boolean>(false);

  closeModal() {
   this.showDiagnostico.update( valueOld => false );
  }
}
