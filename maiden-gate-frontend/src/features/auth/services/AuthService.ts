// responsavel por conversar com o back
import api from "../../../services/api.ts";

type LoginData = {
  // dados obrigatórios para o login
  name: string;
  password: string;
};

type RegisterData = {
  // dados obrigatórios para o registro
  type: "master" | "player";
  name: string;
  password: string;
};

const authService = {
  async login(data: LoginData) {
    const response = await api.post("/login", data); // esperando o laravel responder

    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post("/register", data);

    return response.data;
  },
};

export default authService;
