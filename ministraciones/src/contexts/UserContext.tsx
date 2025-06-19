import { createContext, use, useState } from "react";

interface UserCtxType {
  /*usuario: string;
  id_sistema: number;
  id_rol: number;
  setusuario: (usuario: string) => void;
*/
  user: {
    id_usuario: number;
    id_rol: number;
    usuario: string;
    rol: string;
    nombre: string;
    email: string;
  };
  system: {
    id_sistema: number;
    grupo: string;
    nombre: string;
    descripcion: string;
  };
  setuser?: (user: UserCtxType["user"]) => void;
}

export const UserCtx = createContext<UserCtxType>({
  /*id_sistema: 0,
  usuario: "",
  id_rol: 0,
  setusuario: () => {},*/
  user: {
    id_usuario: 0,
    id_rol: 0,
    usuario: "",
    rol: "",
    nombre: "",
    email: "",
  },
  system: {
    id_sistema: 0,
    grupo: "",
    nombre: "",
    descripcion: "",
  },
  setuser: () => {},
});

export function UserCtxProvider({ children }: { children: React.ReactNode }) {
  /*const [usuario, setusuario] = useState("JC");
  const id_sistema = 2;
  const id_rol = 1;*/
  const [user, setuser] = useState({
    id_usuario: 1,
    id_rol: 5,
    usuario: "JC",
    rol: "Administrador",
    nombre: "Julio Arizmendi",
    email: "jperex0002@example.com",
    //setusuario: (usuario: string) => setuser({ ...user, usuario }),
  });
  const system = {
    id_sistema: 2,
    grupo: "Financieros",
    nombre: "Ministraciones",
    descripcion: "Sistema de Control de Ministraciones",
    icono: "fa-solid fa-money-check-dollar",
  };
  return (
    <UserCtx.Provider value={{ user, system, setuser }}>
      {children}
    </UserCtx.Provider>
  );
}

export const useUserCtx = () => {
  return use(UserCtx);
};
