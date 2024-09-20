import { ExamenView, ExamenViewEntity } from "@/shared/types";

export const toExamenView = ( _model: ExamenView ):ExamenViewEntity  => ({
  examen_id: _model.examen_id,
  codigo: _model.codigo,
  fecha:_model.fecha,
  paciente_id: _model.paciente_id,
  Paciente: _model.Paciente,
  dni: _model.dni
})

export const toExamenViewEntity = ( _model: ExamenViewEntity ):ExamenView  => ({
  examen_id: _model.examen_id,
  codigo: _model.codigo,
  fecha:_model.fecha,
  paciente_id: _model.paciente_id,
  Paciente: _model.Paciente,
  dni: _model.dni
})

