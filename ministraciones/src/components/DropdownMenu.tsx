// src/components/DropdownMenu.tsx
"use client";
import { useState, useRef, useEffect } from "react";
//import FormModal from "@/components/FormModal";

type DropdownMenuProps = {
  recordId: number;
  recordData: any;
};

const DropdownMenu = ({ recordId, recordData }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Calcular posición
  const getMenuPosition = () => {
    if (!buttonRef.current) return {};

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    const spaceBottom = window.innerHeight - rect.bottom;

    if (spaceRight > 200 || spaceRight > spaceBottom) {
      return { left: rect.left, top: rect.bottom + 8 };
    } else {
      return { right: window.innerWidth - rect.right, top: rect.bottom + 8 };
    }
  };

  return (
    <div className="relative overflow-visible" ref={menuRef}>
      <button
        ref={buttonRef}
        className="btnTop mr-1"
        title="Ver opciones"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fa-solid fa-ellipsis-vertical px-1 text-menuIcon"></i>
      </button>

      {isOpen && (
        <div
          className="fixed z-50 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-bordeControl   focus:outline-none dark:bg-fondoObscuroVentana"
          style={getMenuPosition()}
        >
          <ul className="py-1">
            <li
              key={1}
              className={`relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-fondoTablaFilaHover dark:hover:bg-menuFondoOpcion cursor-pointer`}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-regular fa-pen-to-square text-bordeControl mr-1.5 "></i>
              Modificar
            </li>
            <li
              key={2}
              className={`relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-fondoTablaFilaHover dark:hover:bg-menuFondoOpcion cursor-pointer`}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa-regular fa-trash-can text-bordeControl mr-1.5"></i>
              Eliminar
            </li>
          </ul>

        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
