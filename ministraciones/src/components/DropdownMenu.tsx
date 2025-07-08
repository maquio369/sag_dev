// src/components/DropdownMenu.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import FormModal from "@/components/FormModal";

type DropdownMenuProps = {
  userId: number;
  userData: any;
};

const DropdownMenu = ({ userId, userData }: DropdownMenuProps) => {
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
          className="fixed z-50 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-fondoObscuroVentana"
          style={getMenuPosition()}
        >
          <div className="py-1">
            <FormModal
              table="humanos"
              type="upd"
              data={userData}
              id={userId}
              //buttonLabel="Editar"
              //buttonIcon="fa-pen"
              //onClose={() => setIsOpen(false)}
            />
            <FormModal
              table="humanos"
              type="del"
              data={userData}
              id={userId}
              /*buttonLabel="Eliminar"
              buttonIcon="fa-trash-can"
              onClose={() => setIsOpen(false)}*/
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;