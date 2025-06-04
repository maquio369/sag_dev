"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, ToastOptions, toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const toastOptions = {
    theme:
      typeof window !== "undefined" ? localStorage.getItem("theme") : "dark",
  } as ToastOptions;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!username.trim() || !password.trim()) {
      setError("Por favor, ingrese usuario y contraseña");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Iniciando proceso de login para usuario:", username);
      var apiHost =
        process.env.API_URL !== undefined ? process.env.API_URL : "";
      apiHost = "http://172.16.35.43:3011/";

      // Realizar petición al endpoint de login
      const response = await fetch(apiHost + "api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario: username, clave: password }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
sessionStorage.setItem("auth_token", data.token);
          console.log(data.message);
          sessionStorage.setItem("userData", data.message);
      if (data && "token" in data) {
        if (data.token != "") {
          console.log("Ok...");          
          //ok
          window.location.href = "/sistemas";
        } else {
          setError(data.message);

          //throw new Error("No se recibió token de autenticación");
        }
      }
    } catch (err: any) {
      console.log("Error autorizando inicio de sesión");
      setError("Error autorizando inicio de sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-md text-sm">
          <div className="flex items-center">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-1">
        <span className="lbl">Usuario</span>
        <input
          type="text"
          autoFocus
          name="username"
          id="username"
          className="w-full"
          placeholder="Usuario o correo electrónico"
          required
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <span className="lbl">Contraseña</span>
        <input
          type="password"
          name="password"
          id="password"
          className=""
          placeholder="Contraseña"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="items-center gap-2 ">
        <button type="submit" className="w-full btn1" disabled={isLoading}>
          {isLoading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              <span className="pl-2 font-medium">Verificando...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              <span className="pl-2 font-medium">Entrar</span>
            </>
          )}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default LoginForm;
