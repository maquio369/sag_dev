import { useEffect, useRef } from "react";
import { CRUD_Props } from "@/components/forms/interfaces";
import { title } from "process";

const Modal = ({
  isOpen,
  onClose,
  //onSubmit,
  iconType,
  title,
  className,
  children,
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
    // Grabbing a reference to the modal in question
    const modalElement = modalRef.current;
    if (!modalElement) return;

    // Open modal when `isOpen` changes to true
    if (isOpen) {
      modalElement.showModal();
      console.log("isOpen------------>",isOpen," ",title);
      firstCtrlFocusByName(title??"");
      //findNextTabStop(modalElement.getElementsByClassName("btnIcon")).focus();      
      //console.log("isOpen------------>",isOpen,title?.replaceAll(" ",""),modalElement.getElementsByClassName("btnIcon"))

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
    >
      {
        <div className="encabezadoVentanaForm">
          <div className="tituloVentanaForm">
            {renderWindowTitle(iconType)}
            <span>
              <button
                id={"exitButton"+title?.replaceAll(" ","")}
                tabIndex={-1}
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
  const firstCtrl = document.getElementsByName( "firstCtrl"+titleName.replace("","") );
  console.log("getElement----------------->",firstCtrl[0]+titleName.replace("",""))
  if (firstCtrl[0]) {
    (firstCtrl[0] as HTMLElement).focus();
    console.log("focused----------------->",firstCtrl[0]+titleName.replace("",""))
  }
};

const firstCtrlFocusByClass = () => {
  const firstCtrl = document.getElementsByClassName("firstCtrl"+title.replace("",""));
  if (firstCtrl[0]) {
    (firstCtrl[0] as HTMLElement).focus();
  console.log("HtmlElementFocus----------------->",firstCtrl[0])
  }
};

 function findNextTabStop(el:any) {
  
  let queryString = 
      'textarea:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), [tabindex]:not([disabled]):not([tabindex="-1"])';

    var universe = document.querySelectorAll(queryString);
    
    var list = Array.prototype.filter.call(universe, function(item) {return item.tabIndex >= "0"});
    //const el=document.getElementById("exitButton");
    var index = list.indexOf(el);
    return list[index + 3] || list[1];
  }
export default Modal;
