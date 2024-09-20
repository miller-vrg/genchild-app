import { ICabeceraTable } from '@/shared/types';
import { Component, input, output, Input, signal } from '@angular/core';


@Component({
  selector: 'tabla-diagnostico',
  templateUrl: './tabla-diagnostico.component.html',
  styleUrl: './tabla-diagnostico.component.scss'
})
export class TablaDiagnosticoComponent {
  cabecera = input<ICabeceraTable[]>([]);
  idPaciente = input<string>();
  @Input() isShow = signal<boolean>(false);
  listData = input<any>([]);
  onEdit = output<any>();
  onDetails = output<any>();

  workToSearch: string = '';
  options = [
    {
      name: 'Dni',
      value: 'Dni'
    },
    {
      name: 'Nombre',
      value: 'Nombre'
    }
  ];
  objectToList(obj: any): any[] {
    return Object.keys(obj).map(key => obj[key]);
  }
  closeModal() {
    this.isShow.update( valueOld => false);
  }

  open() {
    this.isShow.update( valueOld => !valueOld)
  }


}
