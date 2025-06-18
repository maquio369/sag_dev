"use client";
import { useEffect, useState } from "react";
import { getMenuItems } from "./forms/actions";
import Link from "next/link";

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

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const mnu = await getMenuItems(2, 1);
        //console.log("Menu items fetched:", mnu[0].menuitems);
        setMenusItems(mnu[0].menuitems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        // Optionally handle error state here
      }
    };
    fetchMenuItems();
  }, []);
  
 const [open, setOpen] = useState(submenu_expanded);
  return (
    menusItems.map((i) => (
    
    <div className="mt-0 text-sm px-2 " key={i.id_opcion}>
      <div className="flex flex-col gap-2" key={i.id_opcion}>
        <Link
          className={
            i.titulo.length > 0
              ? "text-menuTextoSeparador hover:text-textoEncabezadoTrans font-light pt-3 flex items-center gap-2 focus:outline-none"
              : "pt-2 text-menuTextoSeparador"
          }
          onClick={
            i.titulo.length > 0 ? () => setOpen((prev) => !prev) : undefined
          }
          href=""
          hidden={!i.titulo || !expanded}
          tabIndex={i.titulo ? 0 : -1}
        >
          {i.titulo}
          {i.titulo && (
            <span
              className={`ml-auto transition-transform duration-200 ease-in-out ${
                open ? "-rotate-270" : ""
              }`}
              style={{ display: "inline-flex" }}
            >
              <i className="fa-solid fa-chevron-right" />
            </span>
          )}
        </Link>
        {open &&
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
    </div>
  )
  )
)
};

export default Menu;
