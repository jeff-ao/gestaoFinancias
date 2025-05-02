import axios from "axios";
import { AxiosResponse } from "axios";
import { cleanToken, handleNewToken } from "@/utils";

const APILink: string = "http://localhost:3003/usuarios"; //localhost:3003
const token = cleanToken(JSON.stringify(localStorage.getItem("token")));
const refreshToken = cleanToken(
  JSON.stringify(localStorage.getItem("refreshToken"))
);

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${APILink}/login`, {
      email: email,
      senha: password,
    });

    if (response.status === 400) {
      return response.status;
    }

    return response.data;
  } catch (error) {
    return error instanceof Error
      ? error.message
      : "Ocorreu um erro desconhecido";
  }
};

export const userRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${APILink}/`, {
      name: name,
      email: email,
      password: password,
    });
    if (!response) {
      return { error: "erro ao fazer login" };
    }
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
    return errorMessage;
  }
};

export const transacoes = async (user_uuid: string) => {
  try {
    console.log("token: ", token);
    console.log("refreshToken: ", refreshToken);
    const response = await axios.get(`${APILink}/transacoes/${user_uuid}`, {
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
