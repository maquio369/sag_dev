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
    id: 5,
    title: "",
    items: [
      {
        icon: "fa-solid fa-money-check-dollar",
        label: "Ministraciones",
        link: "/ministraciones",
        visible: ["admin"],
      },
    ],
  },
  {
    id: 10,
    title: "Adecuaciones presupuestarias",
    items: [
      {
        icon: "fa-solid fa-circle-plus",
        label: "Ampliaciones",
        link: "/contactos",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
      },
      {
        icon: "fa-solid fa-circle-minus",
        label: "Reducciones",
        link: "/sistemas",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
      },
      {
        icon: "fa-solid fa-money-bill-transfer",
        label: "Traspasos",
        link: "/humanos",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
      },
    ],
  },

  {
    id: 20,
    title: "Operaciones del gasto",
    items: [
      {
        icon: "fa-regular fa-credit-card",
        label: "Gastos",
        link: "/admin",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
      },
    ],
  },

  {
    id: 30,
    title: "Consultas" /* "fa-solid fa-sheet-plastic" */,
    items: [
      {
        icon: "fa-solid fa-file-invoice-dollar",
        label: "Consulta de saldos por ministración",
        link: "/test",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
      },
    ],
  },

  {
    id: 50,
    title: "Configuraciones",
    items: [
      /*{
        icon: "fa-solid fa-user-tag",
        label: "Roles",
        link: "/admin",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
      },*/
      {
        icon: "fa-solid fa-users",
        label: "Usuarios",
        link: "/usuarios",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
      },
    ],
  },
  {
    id: 999,
    title: "",
    items: [
      {
        icon: "fa-solid fa-arrow-right-from-bracket",
        label: "Salir",
        link: "/login",
        visible: [
          "superadmin",
          "admin",
          "sistemas",
          "humanos",
          "planeacion",
          "materiales",
          "financieros",
        ],
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
          <div className="flex flex-col gap-2" key={i.id}>
            <Link
              className={
                i.title.length > 0
                  ? "text-textoEncabezadoTrans font-light pt-3 flex items-center gap-2 focus:outline-none"
                  : "pt-2 text-menuTextoSeparador"
              }
              onClick={
                i.title.length > 0 ? () => setOpen((prev) => !prev) : undefined
              }
              href=""
              hidden={!i.title || !expanded}
              tabIndex={i.title ? 0 : -1}
            >
              {i.title}
              {i.title && (
                <span className="ml-auto">
                  <i
                    className={`fa-solid fa-chevron-${open ? "down" : "right"} transition-transform`}
                  />
                </span>
              )}
            </Link>
            {open &&
              i.items.map((item) => (
                <Link
                  href={item.link}
                  key={item.label}
                  className="flex items-center justify-start gap-2 text-menuTexto py-2 rounded-md hover:bg-menuFondoOpcion hover:text-menuTextoHover"
                >
                  <i
                    className={item.icon.concat(
                      " text-menuIcon hover:text-menuIconHover ml-2 text-lg"
                    )}
                  />
                  {expanded && <span>{item.label}</span>}
                </Link>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
