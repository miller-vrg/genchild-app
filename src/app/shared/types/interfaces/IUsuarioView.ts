export interface IUsuarioView {
  id?:        string;
  nombres:   string;
  apellidos: string;
  password?: string;
  fullname?:  string;
  userName:  string;
  rolId:     number;
  rol?:       string;
}
