export interface IPaciente {
  id?: string,
  dni: number,
  nombres: string,
  apellidos: string,
  edad: number,
  email?: string,
  idTipoDni: number
}
