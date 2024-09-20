export interface IPacienteView {
  id?: string,
  dni: number,
  nombres: string,
  apellidos: string,
  fullName: string,
  edad: number,
  tipoDni: string,
  idTipoDni: string,
  nroExamenes: number
}
