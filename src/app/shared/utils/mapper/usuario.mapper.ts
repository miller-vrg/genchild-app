import { IUserLogin } from "@/shared/types/interfaces";
import { IUsuarioEntity } from "@/shared/types/models";

export const toUsuario = (_model: IUsuarioEntity):IUserLogin => ({
  userName: _model.userName,
  password: _model.password
})

export const toUsuarioEntity = (_model: IUserLogin): IUsuarioEntity => ({
  userName: _model.userName,
  password: _model.password
})
