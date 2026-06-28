import { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  type: "player" | "master";
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null); // recipiente

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  // guarda o usuario e entrega para a aplicação (children)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    // login para toda aplicação saber
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData)); // persistindo dados mesmo ao fechar o nav
  };

  const logout = () => {
    // logout deixando usuário null
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
