import { useEffect, useRef } from "react";
import { CRUD_Props } from "@/components/forms/interfaces";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  type?: "ins" | "upd" | "del" | string;
  className?: string;
  children: React.ReactNode;
}
const Modal = ({ isOpen, onClose, type, className, children }: CRUD_Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };
  useEffect(() => {
    // Grabbing a reference to the modal in question
    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Open modal when `isOpen` changes to true
    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  function renderSwitch(type?: string) {
    switch (type) {
      case "ins":
        return (
          <>
            <i className="fa-regular fa-note-sticky text-bordeControl mr-1.5 "></i>
            Nuevo registro
          </>
        );
      case "upd":
        return (
          <>
            <i className="fa-regular fa-pen-to-square text-bordeControl mr-1.5 "></i>
            Modificar registro
          </>
        );
      case "del":
        return (
          <>
            <i className="fa-regular fa-trash-can text-bordeControl mr-1.5 "></i>
            Eliminar registro
          </>
        );
      default:
        return (
          <>
            <span className="text-sm text-bordeControl mr-1 ">■ </span>
            {type}
          </>
        );
    }
  }

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className={"fondoVentanaForm " + "  " + className}
    >
      {
        <div className="encabezadoVentanaForm">
          <div className="tituloVentanaForm">
            <span>
              {renderSwitch(type)}
            </span>
            <span>
              {
              <button
                id="saveButton"
                className="btnIcon"
                title="Guardar"
                aria-label="Guardar"
                onClick={() => alert("Registro guardado satisfactoriamente")}
                //onClick={() => setOpen(false)}
              >
                <i className="fa-solid fa-save"></i> Guardar
              </button>
              }
              <button
                id="exitButton"
                className="btnIcon"
                title="Cerrar"
                aria-label="Cerrar"
                onClick={handleCloseModal}
                //onClick={() => setOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </span>
          </div>
        </div>
      }
      <div className="px-3">
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
