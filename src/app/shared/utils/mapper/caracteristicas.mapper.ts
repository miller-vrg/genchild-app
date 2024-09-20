import { ICaracteristica } from "@/shared/types";
import { ICaracteristicaEntity } from "@/shared/types/models/caracteristica.entity";

export const toCaracteristica = ( _model: ICaracteristicaEntity ): ICaracteristica => ({
  id: _model.id ?? 0,
  codigo: _model.codigo ?? 0,
  nombre: _model.nombre ?? ''
})

export const toCaracteristicaEntity = ( _model: ICaracteristica ): ICaracteristicaEntity => ({
  id: _model.id ?? 0,
  codigo: _model.codigo ?? 0,
  nombre: _model.nombre ?? ''
})
