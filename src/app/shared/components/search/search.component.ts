import { ICabeceraTable, IPagination, Meta } from '@/shared/types';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, effect, inject, input, output, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnChanges{
  private readonly http = inject(HttpClient);
  @Input() showModal = signal<boolean>(false);
  @Input() @Input() listData = signal<any[]>([]);
  @Input() endpoint: string = '';
  cabecera = input<ICabeceraTable[]>([]);
  onDetails = output<any>();
  onReset = output<void>();
  eventPagination=output<number>();
  meta = input<Meta>();
  onSeach = output<{ filtro: string, value: string}>();
  options = input<{value:string,name:string}[]>([]);
  filtro = signal<{filtro:string}>({filtro: this.options().shift()?.value as string});
  workToSearch: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(this.endpoint.length) this.loandData();
  }
  ngOnInit(): void {
    if(this.endpoint.length) this.loandData();
  }
  async loandData(){
      try{
        const { data, meta } = await lastValueFrom(this.http.get(this.endpoint)) as IPagination<any>;
        this.listData.update(dataOld => [...data]);
      }catch(e){

      }
  }

  onDetailsEmit(data: any){
    this.onDetails.emit(data)
    this.showModal.update( valueOld => false );
  }

  objectToList(obj: any): any[] {
    return Object.keys(obj).map(key => obj[key]);
  }

  closed(){
    this.showModal.update( dataOld => false);
  }
  search( value: string) {
    this.onSeach.emit({filtro: this.filtro().filtro, value});
  }

  limpiar(input: HTMLInputElement){
      input.value = '';
      this.onReset.emit();
  }
}
