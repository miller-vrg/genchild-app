import { IAsociacionView, IAsociacionViewEntity } from "@/shared/types";

export const toAsociacionView = (_model: IAsociacionViewEntity): IAsociacionView=> ({
  id: _model.id ?? 0,
  caracteristicaId: _model.caracteristicaId ?? 0,
  codigoCaracteristica: _model.codigoCaracteristica ?? 0,
  caracteristica: _model.caracteristica ?? '',
  enfermedadId: _model.enfermedadId ?? 0,
  Codigoenfermedad: _model.Codigoenfermedad ?? 0,
  enfermedad: _model.enfermedad ?? ''
})

export const toAsociacionViewEntity = (_model: IAsociacionView):IAsociacionViewEntity => ({
  id: _model.id ?? 0,
  caracteristicaId: _model.caracteristicaId ?? 0,
  codigoCaracteristica: _model.codigoCaracteristica ?? 0,
  caracteristica: _model.caracteristica ?? '',
  enfermedadId: _model.enfermedadId ?? 0,
  Codigoenfermedad: _model.Codigoenfermedad ?? 0,
  enfermedad: _model.enfermedad ?? ''
})
