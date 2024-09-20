import { IUsuarioView } from "@/shared/types/interfaces";

export const createLocalUsuarioView = () : IUsuarioView => ({
  nombres: "",
  apellidos: "",
  userName: "",
  rolId: 0,
  rol: ""
})
