import { ICabeceraTable, Meta } from '@/shared/types';
import { Component, input, output, signal, effect } from '@angular/core';

@Component({
  selector: 'table-accion',
  templateUrl: './table-accion.component.html',
  styleUrl: './table-accion.component.scss'
})
export class TableAccionComponent {

  cabecera = input<ICabeceraTable[]>([]);
  listData = input<any>([]);
  actual =  input<number>(1);
  onEdit = output<any>();
  onReset = output<void>();
  onDetails = output<any>();
  onSeach = output<{ filtro: string, value: string}>();
  hasAccion = input<number[]>([1,2]);
  eventPagination=output<number>();
  meta = input<Meta>();
  pages: number[] = [];
  options = input<{value:string,name:string}[]>([]);
  filtro = signal<{filtro:string}>({filtro: this.options().shift()?.value as string});
  workToSearch: string = '';
  objectToList(obj: any): any[] {
    return Object.keys(obj).map(key => obj[key]);
  }


  constructor(){
    effect( () => this.pages = Array.from({length: this.meta()?.pageCount ?? 0}).map( (v,i) => { return i+1}))
  }
  search( value: string) {
    console.log({f: this.filtro().filtro })
    this.onSeach.emit({filtro: this.filtro().filtro, value});
  }

  limpiar(input: HTMLInputElement){
      input.value = '';
      this.onReset.emit();
  }
}
