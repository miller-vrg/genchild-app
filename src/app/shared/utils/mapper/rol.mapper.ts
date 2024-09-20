import { IRol } from "@/shared/types/interfaces";
import { IRolEntity } from "@/shared/types/models";

export const toRol = (_model: IRol):IRolEntity => ({
  id:     _model.id,
  nombre: _model.nombre
})

export const toRolEntity = (_model: IRolEntity): IRol => ({
  id:     _model.id,
  nombre: _model.nombre
})
