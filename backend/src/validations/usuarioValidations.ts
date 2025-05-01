import { UsuarioRegister } from "../types";
import validator from "validator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usuarioRegisterValidations = async (user: UsuarioRegister) => {
  const { nome, email, senha } = user;

  if (!nome?.trim() || !email?.trim() || !senha?.trim()) {
    return { error: "por favor, preencher todos os campos" };
  }

  if (nome.length < 3 || !validator.isAlpha(nome)) {
    return { error: "nome invalido" };
  }

  const existingUser = await prisma.usuario.findFirst({
    where: { email: email },
  });

  if (!validator.isEmail(email) || existingUser) {
    return { error: "email invalido" };
  }

  if (
    !validator.isStrongPassword(senha, {
      minLength: 8,
      minSymbols: 1,
      minUppercase: 1,
      minNumbers: 3,
    })
  ) {
    return { error: "senha fraca" };
  }
};
