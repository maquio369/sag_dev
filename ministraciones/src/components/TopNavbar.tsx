"use client";
import Image from "next/image";
import TitleName from "./elements/TitleName";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

interface Props {
  toggleSidebar: () => void;
  sidebarOpen?: boolean;
}

const TopNavbar = ({ toggleSidebar, sidebarOpen = true }: Props) => {
  const router = useRouter();
  const { user,setuser} = useUser();

  return (
    <div className="flex items-center justify-between p-2 bg-linear-to-b from-fondoGradienteTopFrom to-fondoGradienteTopTo text-textoBoton1 border-t-1 border-black">
      {/*burguer menu*/}
      <button
        onClick={toggleSidebar}
        className="btnTop mr-2"
        title={sidebarOpen ? "Ocultar menú" : "Mostrar menú"}
      >
        <i className={`fa-solid ${sidebarOpen ? "fa-bars" : "fa-bars"}`}></i>
      </button>

      {/*search*/}
      {/*<div
        className="w-fit hidden md:flex items-center gap-2 pr-3 text-md rounded-full ring-2 hover:ring-bordeControlHover px-2
                    bg-fondoControlBlancoTransparente text-textoBoton2"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          name="optionSearch"
          autoFocus
          placeholder="Buscar opción..."
          className="w-32 input-border-zero"
          required
        />
      </div>*/}
      <div className="w-full">
        {/*system name*/}
        <TitleName />
      </div>

      {/*right side icons*/}

      <div className="flex items-center gap-6 justify-end w-full">
        {/*Module name*/}
        <div className="hidden_ sm:inline-flex items-center">
          <span className="__className_721240 text-textoGolden1 font-normal leading-4  bg-fondoTransparenteObscuro py-1 px-2 hidden lg:inline-flex rounded_-l-full">
            FINANCIEROS
          </span>
          <span className="__className_721240 text-textoGolden1 font-medium leading-4 bg-fondoTransparenteObscuro py-1 px-2 hidden_ sm:inline-flex border-l-1 border-bordeBlancoTransparente">
            Ministraciones
          </span>
        </div>

        {/*notifications*/}
        {/*
        <div className="hidden lg:inline-flex">
          <button
            onClick={() => router.push("#")}
            className="btnTop relative"
            title={"0" + " Notificaciones"}
          >
            <i className="fa-solid fa-bell"></i>
            <div className="absolute -top-2 -right-3 w-6 h-5 flex items-center justify-center bg-fondoTransparenteObscuroNotificacion rounded-full text-xs">
              0
            </div>
          </button>
        </div>
        */}
        {/*profile*/}
        <div className="flex flex-row gap-2 items-center cursor-pointer_ hover:scale-105 mr-0">
          <div className="flex flex-col text-right">
            <span className="text-xs leading-4 font-medium hidden sm:inline">
              {user}
            </span>
            <span className="text-sm text-textoEncabezadoTrans text-right hidden xl:inline">
              Administrador Recursos Financieros
            </span>
          </div>
          <Image
            src="/avatars/avatar_jaguar_n.jpg"
            alt=""
            width={36}
            height={36}
            className="rounded-full md:mr-0 min-w-[36px]"
          />
        </div>

        {/*exit*/}
        <button
          onClick={() => router.push("/login")}
          className="btnTop "
          title={"Salir"}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
