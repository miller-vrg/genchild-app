import { Component, output, input, signal } from '@angular/core';
import { ICabeceraTable } from '@/shared/types';

@Component({
  selector: 'info-usuarios',
  templateUrl: './info-usuarios.component.html',
  styleUrl: './info-usuarios.component.scss'
})
export class InfoUsuariosComponent {
  cabecera = input<ICabeceraTable[]>([]);
  listData = input<any>([]);
  onEdit = output<any>();
  onReset = output<void>();
  onDetails = output<any>();
  onSeach = output<{ filtro: string, value: string}>();
  hasAccion = input<number[]>([1,2]);
  options = input<{value:string,name:string}[]>([]);
  filtro = signal<{filtro:string}>({filtro: this.options().shift()?.value as string});
  workToSearch: string = '';
  objectToList(obj: any): any[] {
    return Object.keys(obj).map(key => obj[key]);
  }

  search( value: string) {
    this.onSeach.emit({filtro: this.filtro().filtro, value});
  }

  limpiar(input: HTMLInputElement){
      input.value = '';
      this.onReset.emit();
  }



}
