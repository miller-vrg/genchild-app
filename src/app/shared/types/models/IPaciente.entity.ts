import { TipoDniEntity } from "./TipoDni.entity";

export interface IPacienteEntity {
  id?: string,
  dni: number,
  nombres: string,
  apellidos: string,
  edad: number,
  tipoDni: TipoDniEntity
}
