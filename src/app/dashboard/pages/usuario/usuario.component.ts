import { Component, Input, OnInit, inject, signal, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared/modules/shared/shared.module';
import { ICabeceraTable, IUsuarioView, Meta} from '@/shared/types';
import { filtros } from './helpers/filtros';
import { cabeceraUsuarioView, createLocalUsuarioView } from '@/shared/utils';
import { RolService, UsuarioService} from '@/shared/services';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'page-usuario',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class RegistrarUsuarioComponent implements OnInit {

  private readonly rolServices = inject(RolService);
  private readonly usuarioService = inject(UsuarioService);
  @Input() showModal = signal<boolean>(false);
  @Input() isShow = signal<boolean>(false);
  cabecera: ICabeceraTable[] = [...cabeceraUsuarioView];
  opcions = filtros;
  options = signal<{ value: string, name: string}[]>([{ value: '0', name: 'Seleccione'}]);
  usuarios = signal<IUsuarioView[]>([]);
  usuario = signal<IUsuarioView>(createLocalUsuarioView());

  ngOnInit(): void {
    this.loadingUsuarios();
    this.loadingRoles();
  }

  closed(){
    this.showModal.update( dataOld => false);
  }


  open() {
    this.usuario.update( dataOld => (createLocalUsuarioView()));
    this.showModal.update( valueOld => !valueOld);
  }

  onEdit( usuario: IUsuarioView ) {
    this.usuario.update( dataOld => ({...usuario}));
    this.showModal.update( valueOld => !valueOld);
  }

  async loadingRoles(){
    try{
      const roles  = await lastValueFrom(this.rolServices.getAll());
      this.options.update( optOld =>  {
        const optsNew: { value: string, name: string}[] = [{ value: '0', name: 'Seleccione'}];
        roles.forEach( role => {
          optsNew.push({ value: role.id+'', name: role.nombre});
        });
        return optsNew;
      } )
    }catch(e){
      this.options.update( optOld => [{ value: '0', name: 'Seleccione'}])
    }
  }

  async loadingUsuarios(query: string = ''){
    try{
      const {data, meta}  = await lastValueFrom(this.usuarioService.getAll(query));
      this.usuarios.update( listOld => [...data])
      this.meta.update( metaOld => meta)
    }catch(e){
      console.log(e);
    }
  }

  onReset() {
     this.loadingUsuarios();
  }

  onSeach({ filtro, value }: { filtro: string; value: string; }) {
    if(!( filtro.length && value.length )) return;
    this.loadingUsuarios(`?nameFiel=${filtro}&valueFiel=${value}`);
  }

  async createUsuario(){
    const usuario = {
      userName: this.usuario().userName,
      nombres: this.usuario().nombres,
      apellidos: this.usuario().apellidos,
      password:  this.usuario().password,
      idrol: this.usuario().rolId
    }
      const usuarioNew = await lastValueFrom( this.usuarioService.create( usuario ))
     this.usuario.update( usuarioOld => ({...usuarioNew}));
  }

  async update() {
    const usuario: any = {
      userName: this.usuario().userName,
      nombres: this.usuario().nombres,
      apellidos: this.usuario().apellidos,
      idrol: this.usuario().rolId
    }

    if(this.usuario().password) usuario.password = this.usuario().password;

    try{
        const usuarioNew = await lastValueFrom( this.usuarioService.update(this.usuario().id as string, usuario));
        this.usuario.update( usuarioOld => ({...usuarioNew}));
    }catch(e){
      console.log(e)
    }
  }
  actual = signal<number>(1)
  meta = signal<Meta>({
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasNextPage: false,
    hasPreviousPage: false
  });

  loandPagniation(page: number) {
    this.loadingUsuarios(`?page=${page}`);
    this.actual.update( pageOld => page );
  }
}
