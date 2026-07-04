export interface User {
  id: number;
  type: "master" | "player";
  name: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}
