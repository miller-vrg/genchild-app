import { TipoDniEntity } from "@/shared/types"
import { TipoDni } from "@/shared/types/interfaces"

export const toTipoDni = ( _model: TipoDniEntity ): TipoDni => ({
  id: _model.id,
  nombre: _model.nombre
})

export const toTipoDniEntity = ( _model: TipoDni ): TipoDniEntity => ({
  id: _model.id,
  nombre: _model.nombre
})
