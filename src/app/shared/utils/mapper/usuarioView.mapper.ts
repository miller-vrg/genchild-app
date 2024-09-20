import { IUsuarioViewEntity } from "@/shared/types/models"
import { IUsuarioView } from '@/shared/types/interfaces';

export const toUsuarioView = (_model: IUsuarioViewEntity):IUsuarioView => ({
  id: _model.id,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  userName: _model.userName,
  rolId: _model.rolId,
  rol: _model.rol
})

export const toUsuarioViewEntity = (_model: IUsuarioView): IUsuarioViewEntity => ({
  id: _model.id,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  userName: _model.userName,
  rolId: _model.rolId,
  rol: _model.rol
})
