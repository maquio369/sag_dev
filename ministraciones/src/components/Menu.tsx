"use client";
import Image from "next/image";
import Link from "next/link";

interface Props {
  expanded?: boolean;
}

const menuItems = [
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
    id: 30,
    title: "Consultas",/* "fa-solid fa-sheet-plastic" */
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

const Menu = ({ expanded = false }: Props) => {
  return (
    <div className="mt-0 text-sm px-2 ">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.id}>
          {expanded && (
            <span
              className={
                i.title.length > 0
                  ? "text-menuTextoSeparador font-light pt-3"
                  : "pt-1"
              }
            >
              {i.title}
            </span>
          )}
          {i.items.map((item) => (
            <Link
              href={item.link}
              key={item.label}
              className="flex items-center justify-start gap-2 text-menuTexto py-2 rounded-md hover:bg-menuFondoOpcion hover:text-menuTextoHover"
            >
              {/*TODO: si es .svg tomar en cuenta como imagen en vez de fa-icon */}
              {/*<Image
                src={item.icon}
                alt=""
                width={20}
                height={20}
                className=" ml-1"
              />
              */}
              <i
                className={item.icon.concat(
                  " text-menuIcon hover:text-menuIconHover ml-2 text-lg"
                )}
              />
              {expanded && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
