export interface IEnfermedad {
  id?:                                    number;
  codigo:                                 number;
  nombre:                                 string;
  sinonimo:                               string;
  herencia:                               string;
  retardo_mental:                         string;
  imagen_perspectiva:                     string;
  evolucion:                              string;
  examenes_clinicos_utilidad_diagnostica: string;
  bibliografia:                           string;
  caracteristicaId?:                      number[];
}
