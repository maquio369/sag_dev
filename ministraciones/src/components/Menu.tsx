"use client";
import { useEffect, useState } from "react";
import { getMenuItems } from "./forms/actions";
import Link from "next/link";

interface Props {
  expanded?: boolean;
  submenu_expanded?: boolean;
}

interface MenusItems {
  menuitems: {
    id_opcion: number;
    titulo: string;
    items: { icono: string; opcion: string; link: string }[];
  }[];
}

interface MenuItems {
  menuitems: {
    id_opcion: number;
    titulo: string;
    items: { icono: string; opcion: string; link: string }[];
  };
}

interface MenuItem {
  id_opcion: number;
  titulo: string;
  items: { icono: string; opcion: string; link: string }[];
}

const Menu = ({ expanded = false, submenu_expanded = true }: Props) => {
  //const [mnuItems, setMnuItems] = useState<MenuItem[]>([]);
  const [menusItems, setMenusItems] = useState<MenuItem[]>([]);
  const [open, setOpen] = useState(submenu_expanded);

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

  return(
  menusItems.map((i) => (
        <div className="flex flex-col gap-2 text-TextoTablaHeader" key={i.id_opcion}>          
          {i.titulo} 
          <br />
        </div>
        
  ))
    
    )
};

export default Menu;
