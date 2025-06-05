"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import SubmitBtn from "../elements/SubmitBtn";
import {handleSubmit, handleSubmit3 } from "@/components/forms/actions";

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

  async function handleSubmit2() {
    setIsLoading(true);
    setError("");

    toast.info("Procesando...", { theme: "light" });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Procesando OK", { theme: "light" });
    setIsLoading(false);
    return;
  }

  const handleSubmit4 = async () => {
    /*const handleSubmit = async (e: React.FormEvent) => {*/
    /*
  ( e: React.FormEvent ) 
    e.preventDefault();
*/
    setIsLoading(true);
    setError("");

    /*
    for (let i = 0; i < 9876; i++) {
  console.log(i);
}*/
    toast.success("Procesando...", { theme: "light" });
    await new Promise((resolve) => setTimeout(resolve, 1777));

    // Validación básica
    if (!username.trim() || !password.trim()) {
      setError("Por favor, ingrese usuario y contraseña");
      setIsLoading(false);
      return;
    }

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
          //ok
          console.log("Ok...");
          window.location.href = "/sistemas";
        } else {
          setError(data.message);
          toast.warn("Acceso denegado", toastOptions);
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
    /*< form onSubmit={handleSubmit} className="flex flex-col space-y-6" > */
    //<form action={(e) => {  handleSubmit(); }}>
    <form
      action={async (formData) => {
        handleSubmit(formData);
      }}
    >
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
        {/* <SubmitBtn.Enter className="w-full" /> */}
        <SubmitBtn.Enter className="w-full" />

        <SubmitBtn className="w-full" isPending={isLoading} />

        <button type="submit" className="w-full btn1" disabled={isLoading}>
          <>
            <i
              className={
                "mr-1.5 fa-solid fa-arrow-right-to-bracket" +
                (isLoading ? " fa-beat-fade" : "")
              }
            ></i>
            <span className="pl-2 font-medium">{"-Entrar " + isLoading}</span>
          </>
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default LoginForm;
