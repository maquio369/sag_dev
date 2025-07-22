"use client";
import { useState, useRef, useEffect } from "react";
//import FormModal from "@/components/FormModal";

type DropdownMenuProps = {
  recordId: number;
  recordData: any;
  access_level: string;
  onEdit: (data: Record<string, any>) => void;
  onDelete: () => void;
};

const DropdownMenuCRUD = ({
  recordId,
  recordData,
  access_level,
  onEdit,
  onDelete,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

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
      return { left: rect.left + 36, top: rect.bottom - 32 };
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
          className="fixed z-50 mt-1 w-fit rounded-md bg-fondoControlBlancoTransparente shadow-lg ring-1 ring-bordeControl   focus:outline-none dark:bg-fondoObscuroVentana"
          style={getMenuPosition()}
          onKeyDown={() => handleKeyDown}
        >
          <ul className="py-0.5">
            {access_level === "1" ? (
              <button
                key={0}
                className={`btn4 w-full relative hover:bg-fondoTablaFilaHover focus:bg-fondoTablaFilaHover`}
                onClick={() => onEdit(recordData)}
              >
                <i className="fa-regular fa-eye text-bordeControl mr-1.5 "></i>
                Ver datos
              </button>
            ) : (
              <>{/*access_level 2 & 3 */}
                <button 
                  key={1}
                  className={`btn4 w-full relative hover:bg-fondoTablaFilaHover focus:bg-fondoTablaFilaHover`}
                  onClick={() => onEdit(recordData)}
                >
                  <i className="fa-regular fa-pen-to-square text-bordeControl mr-1.5 "></i>
                  Modificar registro
                </button>

                {access_level === "3" || access_level === "4"? (
                  <>
                    <button
                      key={2}
                      className={`btn4 w-full relative hover:bg-fondoTablaFilaHover focus:bg-fondoTablaFilaHover`}
                      onClick={() => onDelete()}
                    >
                      <i className="fa-regular fa-trash-can hover:text-bordeControl mr-1.5 text-TextoLblError"></i>
                      Eliminar
                    </button>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenuCRUD;
