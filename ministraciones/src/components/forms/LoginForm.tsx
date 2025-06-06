"use client";

import { useEffect, useState } from "react";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import SubmitBtn from "../elements/SubmitBtn";
import { handleSubmit } from "@/components/forms/actions";
//import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  //const router = useRouter();

  const toastOptions = {
    theme:
      typeof window !== "undefined" ? localStorage.getItem("theme") : "dark",
  } as ToastOptions;

  useEffect(() => {
    //Cerrar sesión
    /*
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("message", "Sesión finalizada");
    */
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  return (
    /*< form onSubmit={handleSubmit} className="flex flex-col space-y-6" > */
    //<form action={(e) => {  handleSubmit(); }}>
    <form
      className="flex flex-col space-y-6"
      action={async (formData) => {
        const jsonData = await handleSubmit(formData);
        if (jsonData) {
          /*
          sessionStorage.setItem("token", jsonData.token);
          sessionStorage.setItem("message", jsonData.message);
          */
          if (jsonData.token === undefined || jsonData.token === "") {
            setError(jsonData.message as string);
          } else {
            document.cookie = `access_token=${jsonData.token}; `;//path=/; max-age=3600; secure; SameSite=Strict`;
            window.location.href = "/sistemas";
          }
        }
      }}
    >
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
        <SubmitBtn.Enter className="w-full" />
      </div>
      <ToastContainer />
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-md text-sm">
          <div className="flex items-center">
            <i className="fa-solid fa-triangle-exclamation mr-2"></i>
            <span>{error}</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
