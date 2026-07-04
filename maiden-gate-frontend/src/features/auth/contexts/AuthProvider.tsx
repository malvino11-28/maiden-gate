import { useState } from "react";

import { AuthContext } from "./AuthContext";
import type { User } from "../types/auth";

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
