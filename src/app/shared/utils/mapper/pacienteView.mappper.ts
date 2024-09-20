import { IPacienteView, IPacienteViewEntity } from "@/shared/types"


export const toPacienteView = (_model: IPacienteViewEntity):IPacienteView => ({
  id: _model.id,
  dni: _model.dni,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  fullName: _model.fullName,
  edad: _model.edad,
  tipoDni: _model.tipoDni,
  idTipoDni: _model.idTipoDni,
  nroExamenes: _model.nroExamenes
})

export const toPacienteViewEntity = (_model: IPacienteView): IPacienteViewEntity => ({
  id: _model.id,
  dni: _model.dni,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  fullName: _model.fullName,
  edad: _model.edad,
  tipoDni: _model.tipoDni,
  idTipoDni: _model.idTipoDni,
  nroExamenes: _model.nroExamenes
})
