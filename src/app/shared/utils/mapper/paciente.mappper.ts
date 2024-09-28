import { IPaciente, IPacienteEntity } from "@/shared/types";

export const toPaciente = (_model: IPacienteEntity):IPaciente => ({
  id: _model.id,
  dni: _model.dni,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  edad: _model.edad,
  idTipoDni: _model.tipoDni.id
})

export const toPacienteEntity = (_model: IPaciente): IPacienteEntity => ({
  id: _model.id,
  dni: _model.dni,
  nombres: _model.nombres,
  apellidos: _model.apellidos,
  edad: _model.edad,
  tipoDni: {
    id: _model.idTipoDni,
    nombre: '' // Fill with actual data from API call
  }
})
