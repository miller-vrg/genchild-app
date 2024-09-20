import { IPaciente, IPacienteEntity } from "@/shared/types";

export const toPaciente = (_model: IPacienteEntity):IPaciente => ({
  id: _model.id,
  dni: _model.dni,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  edad: _model.edad,
  idTipoDni: _model.idTipoDni
})

export const toPacienteEntity = (_model: IPaciente): IPacienteEntity => ({
  id: _model.id,
  dni: _model.dni,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  edad: _model.edad,
  idTipoDni: _model.idTipoDni,
})
