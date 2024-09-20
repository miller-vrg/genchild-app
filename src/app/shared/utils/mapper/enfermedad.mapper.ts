import { IEnfermedad, IEnfermedadEntity } from "../../types"

export const toEnfermedad = ( _model: IEnfermedadEntity ):IEnfermedad => ({
    id: _model.id ?? 0,
    codigo: _model.codigo ?? 0,
    nombre: _model.nombre ?? '',
    sinonimo: _model.sinonimo ?? '',
    herencia: _model.herencia ?? '',
    retardo_mental: _model.retardo_mental ?? '',
    imagen_perspectiva: (!_model.imagen_perspectiva || !_model.imagen_perspectiva.length)? '/assets/img/gril_enferma.jpg' : _model.imagen_perspectiva,
    evolucion: _model.evolucion ?? '',
    examenes_clinicos_utilidad_diagnostica: _model.examenes_clinicos_utilidad_diagnostica ?? '',
    bibliografia: _model.bibliografia ?? '',
    caracteristicaId: toAsociacionArray(_model.asociacion)
})

export const toEnfermedadEntity = ( _model: IEnfermedad ):IEnfermedadEntity => ({
  id: _model.id ?? 0,
  codigo: _model.codigo ?? 0,
  nombre: _model.nombre ?? '',
  sinonimo: _model.sinonimo ?? '',
  herencia: _model.herencia ?? '',
  retardo_mental: _model.retardo_mental ?? '',
  imagen_perspectiva: _model.imagen_perspectiva ?? '',
  evolucion: _model.evolucion ?? '',
  examenes_clinicos_utilidad_diagnostica: _model.examenes_clinicos_utilidad_diagnostica ?? '',
  bibliografia: _model.bibliografia ?? '',
  caracteristicaId: _model.caracteristicaId
})

export const toAsociacionArray = (array:{ id: number}[] = []) => {
    const asociacion : number[] = [];

    array.forEach( ({id}) => {
        asociacion.push(id);
    });
    return asociacion;
}

export const toAsociacionArrayEntity = (array: number[] = []) => {
    const asociacion : { id: number}[] = [];

    array.forEach(id => {
        asociacion.push({ id });
    });
    return asociacion;
}
