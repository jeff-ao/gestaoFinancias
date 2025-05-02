import axios from "axios";
import { cleanToken, handleNewToken } from "../utils/index";

const API_URL = "http://localhost:3003/transacoes"; //localhost:3003

const token = cleanToken(JSON.stringify(localStorage.getItem("token")));
const refreshToken = cleanToken(
  JSON.stringify(localStorage.getItem("refreshToken"))
);

export const postTransacoes = async (user_uuid: string, {}) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      data: {
        user_uuid: user_uuid,
        transacao: {},
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "x-refresh-token": `${refreshToken}`,
      },
    });
    if (!response) {
      return { error: "erro ao fazer login" };
    }
    handleNewToken(response);
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return errorMessage;
  }
};
