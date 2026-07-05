import api from "../../../services/api";

import type { LoginResponse } from "../types/auth";
import type { RegisterResponse } from "../types/auth";

export async function login(
  name: string,
  password: string,
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", {
    name,
    password,
  });

  return response.data;
}

export async function register(
  name: string,
  type: string,
  password: string,
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/register", {
    name,
    type,
    password,
  });

  return response.data;
}
