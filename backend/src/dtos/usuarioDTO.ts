import { UsuarioRegister } from "../types";
import { Usuario } from "@prisma/client";

export class UsuarioDTO {
  uuid: string;
  nome: string;
  email: string;
  constructor(usuario: Usuario) {
    this.uuid = usuario.uuid;
    this.nome = usuario.nome;
    this.email = usuario.email;
  }
}
