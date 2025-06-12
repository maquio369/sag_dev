"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  expanded?: boolean;
  submenu_expanded?: boolean;
}

const menuItems = [
  {
    id_opcion: 8,
    titulo: "",
    items: [
      {
        icono: "fa-solid fa-money-check-dollar",
        opcion: "Ministraciones",
        link: "/ministraciones",
      },
    ],
  },
  {
    id_opcion: 10,
    titulo: "Adecuaciones presupuestarias",
    items: [
      {
        icono: "fa-solid fa-circle-plus",
        opcion : "Ampliaciones",
        link: "/contactos",
      },
      {
        icono: "fa-solid fa-circle-minus",
        opcion : "Reducciones",
        link: "/sistemas",
      },
      {
        icono: "fa-solid fa-money-bill-transfer",
        opcion : "Traspasos",
        link: "/humanos",
      },
    ],
  },

  {
    id_opcion: 20,
    titulo: "Operaciones del gasto",
    items: [
      {
        icono: "fa-regular fa-credit-card",
        opcion : "Gastos",
        link: "/admin",
      },
    ],
  },

  {
    id_opcion: 30,
    titulo: "Consultas" /* "fa-solid fa-sheet-plastic" */,
    items: [
      {
        icono: "fa-solid fa-file-invoice-dollar",
        opcion : "Consulta de saldos por ministración",
        link: "/test",
      },
    ],
  },

  {
    id_opcion: 50,
    titulo: "Configuraciones",
    items: [
      /*{
        icono: "fa-solid fa-user-tag",
        opcion : "Roles",
        link: "/admin",
      },*/
      {
        icono: "fa-solid fa-users",
        opcion : "Usuarios",
        link: "/usuarios",
      },
    ],
  },
  {
    id_opcion: 9999,
    titulo: "",
    items: [
      {
        icono: "fa-solid fa-arrow-right-from-bracket",
        opcion : "Salir",
        link: "/login",
      },
    ],
  },
];

const Menu = ({ expanded = false, submenu_expanded = true }: Props) => {
  return (
    <div className="mt-0 text-sm px-2 ">
      {menuItems.map((i) => {
        const [open, setOpen] = React.useState(submenu_expanded);

        return (
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
                  key={item.opcion }
                  className="flex items-center justify-start gap-2 text-menuTexto py-2 rounded-md hover:bg-menuFondoOpcion hover:text-menuTextoHover"
                >
                  <i
                    className={item.icono.concat(
                      " text-menuIcon hover:text-menuIconHover ml-2 text-lg"
                    )}
                  />
                  {expanded && <span>{item.opcion }</span>}
                </Link>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
