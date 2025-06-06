"use client";
import { useEffect, useState } from "react";
import UsuariosForm, { modelUsuarios } from "@/components/forms/UsuariosForm";
import { verificarToken } from "@/utils/helpers";

const TestPage = () => {
  useEffect(() => {
    //verificarToken();
  }, []);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<modelUsuarios | null>(null);

  const handleOpenUserModal = () => {
    setModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (data: modelUsuarios): void => {
    setUserData(data);
    handleCloseUserModal();
  };

  return (
    <>
      <span className="font-semibold text-left text-emerald-900 mb-2 p-1">
        Plantilla de personal
      </span>

      <div style={{ display: "flex", gap: "1em" }}>
        <button onClick={handleOpenUserModal}>Open Form (Modal)</button>
      </div>

      {userData && userData.email && (
        <div className="msg-box">
          <b>{userData.email}</b> requested a <b>{userData.name}</b> name.
        </div>
      )}

      <UsuariosForm
        isOpen={isModalOpen}
        onSubmit={handleFormSubmit}
        onClose={handleCloseUserModal}
        type="ins"
      />

      <div className="flex flex-row w-full gap-4 xs:flex-col">
        <div className="flex-none w-75 bg-bordeBlancoTransparente p-4 rounded-lg shadow-sm dark:bg-fondoBlancoTransparenteDark">
          <h1 className="flex justify-between">
            <span className="text-textoLink hover:text-textoLinkHover">
              <i className="fa-solid fa-filter p-1"></i> Filtrar
            </span>
            <span className="text-textoEtiqueta hover:text-textoLinkHover dark:text-menuTexto">
              <i className="fa-solid fa-arrow-down-short-wide"></i> Ordenar
            </span>
          </h1>
          <hr className="" />
          <div className="max-w-md w-full p-1">
            <form>
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
                  required
                />
              </div>
              <div className="mb-4">
                <label id="lblEmail" className="lbl">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email1"
                  name="email2"
                  className="w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label id="lblPassword" className="lbl">
                  Rango de fechas de inserción
                </label>
                <input
                  type="date"
                  id="password"
                  name="password"
                  className="w-full"
                  required
                />
              </div>
              <div className="mb-6">
                <label id="confirmPassword" className="lbl">
                  Status
                </label>
                <input
                  type="select"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full"
                  required
                />

                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="lbl">Municipio</label>

                  <div className="relative">
                    <select className="w-full bg-transparent placeholder:text-bordeControl text-textoControl text-sm border border-amber-300-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-bordeControl hover:border-bordeControlHover shadow-sm focus:shadow-md appearance-none cursor-pointer">
                      <option className="" value="19">
                        Comitán
                      </option>
                      <option value="20">San Cristobal</option>
                      <option value="101">Tuxtla Gutiérrez</option>
                    </select>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.2"
                      stroke="currentColor"
                      className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-textoControl"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full btn1">
                <i className="fa-solid fa-magnifying-glass-arrow-right pr-1"></i>
                Mostrar registros
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col cols-auto w-full bg-[#fFfFfFb2] rounded-lg shadow-sm p-4">
          <h1>
            <div className="bg-sky-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>{" "}
            Modificar0
          </h1>
          <h1>
            <div className="bg-cyan-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>{" "}
            Modificar1
          </h1>
          <h1>
            <div className="bg-fondoBoton2Hover text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-plus "></i>
            </div>{" "}
            Agregar
          </h1>

          <h1 className="flex flex-row">
            <div className="bg-teal-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>
            &nbsp;
            <div className="bg-green-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>
            &nbsp; Modificar2
          </h1>
          <h1>
            <div className="bg-red-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>{" "}
            Modificar3
          </h1>
          <h1>
            <div className="bg-lime-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>{" "}
            Modificar4
          </h1>
          <h1>
            <div className="bg-orange-300 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>{" "}
            Modificar5
          </h1>
          <h1>
            <div className="bg-amber-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>{" "}
            Modificar6
          </h1>
          <h1>
            <div className="bg-yellow-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-pen "></i>
            </div>{" "}
            Modificar7
          </h1>
          <h1>
            <div className="bg-rose-400 text-textoBoton1 w-fit py-0.5 px-2 rounded">
              <i className="fa-solid fa-trash-can "></i>
            </div>{" "}
            Eliminar
          </h1>
          <br />
          <h1>
            <i className="fa-solid fa-circle-plus text-fondoBoton1"></i>{" "}
            Insertar{" "}
            <i className="fa-solid fa-square-plus text-fondoBoton1"></i>
            <br />
            <i className="fa-solid fa-circle-minus text-rose-600"></i> Borrar{" "}
            <i className="fa-solid fa-trash text-rose-600"></i>{" "}
            <i className="fa-solid fa-eraser text-orange-600"></i>
          </h1>

          <p>
            <i className="fa-solid fa-eye text-fondoBoton1Hover"></i> Mostrar
            <br />
            <i className="fa-solid fa-eye-slash text-fondoBoton1Hover"></i>{" "}
            Ocultar
          </p>
          <p>
            <i className="fa-solid fa-circle-info text-sky-400"></i> Información
            &nbsp; <i className="fa-solid fa-circle-info text-blue-400"></i>
          </p>
          <p>
            <i className="fa-solid fa-square-arrow-up-right text-textoControl"></i>{" "}
            Abrir{" "}
            <i className="fa-solid fa-arrow-up-right-from-square text-textoControl"></i>
          </p>

          <p>
            <i className="fa-solid fa-user-tie text-fondoBoton1Hover"></i>{" "}
            Usuario
          </p>
          <p>
            <i className="fa-solid fa-unlock-keyhole text-amber-500"></i>{" "}
            Password <i className="fa-solid fa-key text-amber-500"></i>
          </p>
          <p>
            <i className="fa-solid fa-xmark text-rose-700"></i> Cerrar{" "}
            <i className="fa-solid fa-circle-xmark text-rose-600"></i>
          </p>
          <p>
            <i className="fa-solid fa-floppy-disk text-teal-700"></i> Cerrar{" "}
            <i className="fa-regular fa-floppy-disk text-teal-700"></i>
          </p>
        </div>
      </div>
    </>
  );
};

export default TestPage;
