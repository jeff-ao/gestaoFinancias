import usuarioService from "../services/usuarioService";
import { Request, Response } from "express";
import { UsuarioRegister } from "../types/index";
import axios from "axios";
import { UsuarioDTO } from "../dtos/usuarioDTO";

const AUTH_SERVICE_URL = "http://localhost:3002/api/auth";

const usuarioController = {
  cadastrarService: async (req: Request, res: Response) => {
    try {
      const usuario: UsuarioRegister = req.body;

      const response = await usuarioService.cadastrarService(usuario);
      if ("error" in response)
        return res.status(400).json({ error: response.error });

      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso", usuario: response });
    } catch (error) {
      console.error("Error in cadastrarService:", error);
      return res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body as { email: string; senha: string };

      const usuario = await usuarioService.getUsuarioByEmail(email);
      if ("error" in usuario)
        return res.status(400).json({ error: usuario.error });

      console.log("bateu aqui 0", usuario);

      const isPasswordValid = await usuarioService.comparePassword(
        senha,
        usuario.senha
      );

      console.log("bateu aqui 1", isPasswordValid);
      if (!isPasswordValid)
        return res.status(401).json({ error: "email ou senha invalidos" });

      let authResponse;
      try {
        authResponse = await axios.post<{
          token: string;
          error?: boolean;
          refreshToken: string;
        }>(`${AUTH_SERVICE_URL}/login`, { email: email, password: senha });
      } catch (axiosError) {
        console.error("Error in authentication request:", axiosError);
        return res.status(500).json({
          error: "Erro na autenticação",
          message: "Erro ao autenticar. Tente novamente mais tarde.",
        });
      }

      console.log("bateu aqui");
      if (authResponse.data.error) {
        return res.status(500).json({
          error: "Erro na autenticação",
          message: "Erro ao autenticar. Tente novamente mais tarde.",
        });
      }

      return res.status(200).json({
        user: new UsuarioDTO(usuario),
        token: authResponse.data.token,
        refreshToken: authResponse.data.refreshToken,
      });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({ error: "Erro ao realizar login" });
    }
  },
};

export default usuarioController;
