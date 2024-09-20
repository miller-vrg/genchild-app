import { IPacienteView } from "@/shared/types";

export const createLocalPacienteView = () : IPacienteView => ({
  dni: 0,
  nombres: "",
  apellidos: "",
  fullName: "",
  edad: 0,
  tipoDni: "",
  idTipoDni: "",
  nroExamenes: 0
})
