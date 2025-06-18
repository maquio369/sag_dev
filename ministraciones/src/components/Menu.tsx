"use client";
import { useEffect, useState } from "react";
import { getMenuItems } from "./forms/actions";
import Link from "next/link";

interface Props {
  expanded?: boolean;
  submenu_expanded?: boolean;
}

interface MenuItems {
  menuitems: {
    id_opcion: number;
    titulo: string;
    items: { icono: string; opcion: string; link: string }[];
  }[];
}

interface MenuItem {
  id_opcion: number;
  titulo: string;
  items: { icono: string; opcion: string; link: string }[];
}

const Menu = ({ expanded = false, submenu_expanded = true }: Props) => {
  const [menusItems, setMenusItems] = useState<MenuItems[]>([]);
  useEffect(() => {
    try {
      const fetchMenuItems = async () => {
        const mnu = await getMenuItems(2, 1);
        console.log("Menu items fetched:", mnu[0].menuitems);
        setMenusItems(mnu[0].menuitems);
      };
      fetchMenuItems();
    } catch (error) {
      console.error("Error fetching menu items:", error);
      //setMenusItems([{ api_error: "Error fetching menu items" }]);
    }
  }, []);

  
    return (
      menusItems.map((i: any) => {
      <div className="flex flex-col gap-2 text-TextoTablaHeader" key={i.id_opcion}>
        hey
        {i.titulo}
        hola
      </div>
      })
    );
  
};

export default Menu;
