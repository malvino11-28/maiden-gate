import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./features/auth/contexts/AuthProvider";

{/* reactDom converte as instruções do React para elementos HTML */}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode> {/* componente que destaca problemas em desenvolvimento */}
    <BrowserRouter> {/* gerenciador de navegações e rotas */}
      <AuthProvider> 
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
