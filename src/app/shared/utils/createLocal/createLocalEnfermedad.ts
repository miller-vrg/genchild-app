import { IEnfermedad } from "@/shared/types";

export const createLocalEnfermedad = ():IEnfermedad => ({
  codigo: 0,
  nombre: "",
  sinonimo: "",
  herencia: "",
  retardo_mental: "",
  imagen_perspectiva: "",
  evolucion: "",
  examenes_clinicos_utilidad_diagnostica: "",
  bibliografia: ""
})
