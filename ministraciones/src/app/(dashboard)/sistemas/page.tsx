"use client";
import Image from "next/image";
import { useEffect } from "react";
import { verify } from "jsonwebtoken";

const SistemasPage = () => {
  useEffect(() => {
    //Verificar token
    var token = sessionStorage.getItem("token");
    var payload=null;
    if (token) {
      /*
      //JWT verification      
      try {
        var secret = process.env.JWT_SECRET || "";
        payload = verify(token, secret, { complete: true });
        console.log("verifyToken:", payload);
      } catch (error: any) {
        token = "";
        console.log("verifyToken:", error.message);
        payload = null;
      }
      */
      if (!token) {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div className="flex flex-col">
      <span
        className="font-medium_ text-left text-textoTabla bg-fondoTransparenteObscuro dark:bg-fondoTransparenteObscuroNotificacion py-1
      flex  flex_-col dark:text-fondoControlBlancoTransparente"
      >
        <span className="mx-2 ">Usuarios</span>
      </span>
      <span className="lblEncabezado ml-4 mt-3">Catálogo de Usuarios</span>
      <div className="px-4 flex gap-4 flex-col xl:flex-row">
        <div className="flex flex-row w-full gap-4 xs:flex-col">
          <div className="flex-none w-full bg-bordeBlancoTransparente p-4 rounded-lg shadow-sm dark:bg-fondoBlancoTransparenteDark ">
            <h1 className="flex justify-between">
              <span className="pl-2 font-light text-textoControl dark:text-bordeBlancoTransparente">
                {/*<span className=" text-bordeControl">+ </span> */}
                <i className="fa-regular fa-note-sticky text-bordeControl mr-1.5 "></i>
                {/*<i className="fa-solid fa-plus text-bordeControl mr-1.5"></i>
                 */}
                Nuevo registro
              </span>
              <div>
                <i className="fa-solid fa-pen-to-square text-bordeControl"></i>
                <span className="pl-2 font-light text-textoControl dark:text-bordeBlancoTransparente">
                  Modificar registro 654
                </span>
              </div>
            </h1>
            <hr />
            <div className="max-w-md w-full p-1">
              <form>
                {/*Editar img*/}
                <div className="flex justify-center mb-2 ">
                  <div className="flex flex-col items-center relative ">
                    <Image
                      src="/avatars/avatar_jaguar_n.webp"
                      alt=""
                      width={100}
                      height={100}
                      className=""
                    />
                    {/*boton Editar img*/}
                    <i className="fa-solid fa-pen p-1 bg-fondoBlancoTransparente border-1 border-bordeControl text-textoBoton2 rounded-full hover:scale-105 absolute -bottom-3 -right-3 cursor-pointer "></i>
                  </div>
                </div>

                <div className="mb-4">
                  <label id="nombre" className="lbl">
                    Nombres
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label id="apellido" className="lbl">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    className="w-full"
                  />
                </div>
                <div className="mb-4">
                  <label id="email" className="lbl">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full"
                    required
                    placeholder="mi_correo@mail.com"
                  />
                </div>
                <div className="mb-4">
                  <label id="password" className="lbl">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label id="confirmPassword" className="lbl">
                    Repetir contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 justify-normal ">
                  <button type="submit" className="md:w-1/3 btn1">
                    <i className="fa-solid fa-save"></i>
                    <span className="pl-2 ">Guardar</span>
                  </button>
                  <button type="submit" className="md:w-1/3 btn2">
                    <i className="fa-solid fa-reply"></i>
                    <span className="pl-2 ">Cancelar</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SistemasPage;
