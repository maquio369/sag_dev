import { useEffect, useRef } from "react";
import { CRUD_Props } from "@/components/forms/interfaces";
import { makeDialogDraggable } from "dialog-draggable"

const Modal = ({
  isOpen,
  onClose,
  //onSubmit,
  iconType,
  title,
  className,
  children,
  resizable,
  noModal,
}: CRUD_Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };
/*
  const handleSubmitModal = () => {
    if (onSubmit) {
      onSubmit(null);
    }
  };
*/
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };
  
  useEffect(() => {
      makeDialogDraggable();    
  }, []);

  useEffect(() => {
    // Grabbing a reference to the modal in question
    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Open modal when `isOpen` changes to true
    if (isOpen) {      
      noModal?modalElement.show():modalElement.showModal();
      firstCtrlFocusByName(title??"");
    } else {
      modalElement.close();
    }
  }, [isOpen]);
  
  function renderWindowTitle(iconType?: string) {
    let faIcon = "";
    switch (iconType) {
      case "ins":
        faIcon = "fa-regular fa-note-sticky";
        break;
      case "upd":
        faIcon = "fa-regular fa-pen-to-square";
        break;
      case "del":
        faIcon = "fa-regular fa-trash-can";
        break;
      default:
        faIcon = "■";
    }

    return (
      <div className="flex items-center">
        {faIcon.toString().includes(" fa-") ? (
          <i className={`${faIcon} text-bordeControl mr-1.5 `}></i>
        ) : (
          <span className="text-sm text-bordeControl mr-1 ">■ </span>
        )}
        {title}
      </div>
    );
  }

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className={"fondoVentanaForm " + "  " + className}
      style={{ resize: resizable ? "both" : "none" }}
    >
      {
        <div className="encabezadoVentanaForm cursor-grab" data-dialog-draggable>

          <div className="tituloVentanaForm">
            {renderWindowTitle(iconType)}
            <span>
              <button
                id={"exitButton"}
                className="btnIcon"
                title="Cerrar"
                aria-label="Cerrar"
                onClick={handleCloseModal}
                //onClick={() => setOpen(false)}
                //onFocus={(e) => firstCtrlFocus()}
                //onFocus={(e) => findNextTabStop().focus()}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </span>
          </div>
        </div>
      }
      <div className="px-3 text-textoControl dark:text-textoEncabezadoDark">
        {children}
      </div>
    </dialog>
  );
};

/* HTMLInputElement HTMLDivElement HTMLButtonElement */
const firstCtrlFocusByName = (titleName:string) => {
  const firstCtrl = document.getElementsByName( "firstCtrl"+titleName );
  //console.log("getElement----------------->",firstCtrl[0]+titleName)
  if (firstCtrl[0]) {
    (firstCtrl[0] as HTMLElement).focus();    
  }
};

export default Modal;
