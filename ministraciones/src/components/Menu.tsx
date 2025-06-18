"use client";
import { useEffect, useState } from "react";
import { getMenuItems } from "./forms/actions";
import Link from "next/link";
import { useUserCtx } from "@/contexts/UserContext";
import { toast } from "react-toastify";

interface Props {
  expanded?: boolean;
  submenu_expanded?: boolean;
}

interface MenuItem {
  id_opcion: number;
  titulo: string;
  items: { icono: string; opcion: string; link: string }[];
}

const Menu = ({ expanded = false, submenu_expanded = true }: Props) => {
  const [menusItems, setMenusItems] = useState<MenuItem[]>([]);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});
  const { user, system } = useUserCtx();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const mnu = await getMenuItems(system.id_sistema, user.id_rol);
        setMenusItems(mnu[0].menuitems);
        // Inicializar el estado de los ítems abiertos
        const initialOpenState = mnu[0].menuitems.reduce(
          (acc: any, item: any) => {
            acc[item.id_opcion] = submenu_expanded;
            return acc;
          },
          {} as Record<number, boolean>
        );
        setOpenItems(initialOpenState);
      } catch (error) {
        console.log("Error fetching menu items:", error);        
        sessionStorage.setItem("msg","Su rol no tiene permisos asignados para este sistema");
        window.location.href = "/login";
      }
    };
    fetchMenuItems();
  }, [submenu_expanded]);

  const toggleItem = (id_opcion: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id_opcion]: !prev[id_opcion],
    }));
  };

  return (
    <div className="mt-0 text-sm px-2 ">
      {menusItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.id_opcion}>
          <Link
            className={
              i.titulo.length > 0
                ? "text-menuTextoSeparador hover:text-textoEncabezadoTrans font-light pt-3 flex items-center gap-2 focus:outline-none"
                : "pt-2 text-menuTextoSeparador"
            }
            onClick={
              i.titulo.length > 0 ? () => toggleItem(i.id_opcion) : undefined
            }
            href=""
            hidden={!i.titulo || !expanded}
            tabIndex={i.titulo ? 0 : -1}
          >
            {i.titulo}
            {i.titulo && (
              <span
                className={`ml-auto transition-transform duration-200 ease-in-out ${
                  openItems[i.id_opcion] ? "-rotate-270" : ""
                }`}
                style={{ display: "inline-flex" }}
              >
                <i className="fa-solid fa-chevron-right" />
              </span>
            )}
          </Link>
          {openItems[i.id_opcion] &&
            i.items.map((item) => (
              <Link
                href={item.link}
                key={item.opcion}
                className="flex items-center justify-start gap-2 text-menuTexto py-2 rounded-md hover:bg-menuFondoOpcion hover:text-menuTextoHover"
              >
                <i
                  className={item.icono.concat(
                    " text-menuIcon hover:text-menuIconHover ml-2 text-lg"
                  )}
                />
                {expanded && <span>{item.opcion}</span>}
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
