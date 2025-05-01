import { PrismaClient } from "@prisma/client";
import { UsuarioRegister } from "../types/index";
import bcrypt, { compare } from "bcryptjs";
import { usuarioRegisterValidations } from "../validations/usuarioValidations";
import validator from "validator";

const prisma = new PrismaClient();

const usuarioService = {
  cadastrarService: async (usuario: UsuarioRegister) => {
    try {
      const validations = await usuarioRegisterValidations(usuario);
      if (validations?.error) return { error: validations.error };

      const senha = usuario.senha;
      const hashedPassword = await bcrypt.hash(senha, 10);

      const usuarioCadastrado = await prisma.usuario.create({
        data: { ...usuario, senha: hashedPassword },
      });
      return usuarioCadastrado;
    } catch (error) {
      console.error("Error in cadastrarService:", error);
      return { error: "Erro ao cadastrar usuário" };
    }
  },
  comparePassword: async (senha: string, senhaHash: string) => {
    try {
      if (!senha || !senhaHash) {
        return false;
      }

      const isPasswordValid = await compare(senha, senhaHash);
      return isPasswordValid;
    } catch (error) {
      console.error("Error in comparePassword:", error);
      return false;
    }
  },
  getUsuarioByEmail: async (email: string) => {
    try {
      if (!email || typeof email !== "string" || !validator.isEmail(email)) {
        return { error: "email ou senha invalidos" };
      }
      const usuario = await prisma.usuario.findFirst({
        where: { email: email },
      });
      if (!usuario) return { error: "Usuário não encontrado" };
      return usuario;
    } catch (error) {
      console.error("Error in buscarUsuarioPorEmail:", error);
      return { error: "Erro ao buscar usuário" };
    }
  },
};

export default usuarioService;
