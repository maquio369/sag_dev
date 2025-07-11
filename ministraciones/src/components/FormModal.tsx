"use client";

import { useState } from "react";
import PersonalForm from "@/components/forms/PersonalForm";
import React, { Component, useEffect } from "react";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: "areas" | "personal" | "humanos";
  type: "ins" | "upd" | "del";
  data?: any;
  id?: number;
}) => {
  useEffect(() => {
    document.onkeydown = function (e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn3 " title="Agregar" onClick={() => setOpen(true)}>
        <i className="fa-solid fa-plus"></i>
        <span className="lblBtn">Agregar</span>
      </button>

      {open && (
        <div className="pantallaObscura" onFocus={(e) => avoidTabIndexFocusOut2(e)}>
          <div className="fondoVentanaForm w-[98%] md:w-[80%]">
            <div className="encabezadoVentanaForm">
              <span className="pl-2 text-base font-light text-textoControl dark:text-bordeBlancoTransparente ">
                {type === "ins" ? (
                  <>
                    <i className="fa-regular fa-note-sticky text-bordeControl mr-1.5 "></i>
                    Nuevo registro
                  </>
                ) : type === "upd" ? (
                  <>
                    <i className="fa-regular fa-pen-to-square text-bordeControl mr-1.5 "></i>
                    Modificar registro
                  </>
                ) : (
                  <>
                    <i className="fa-regular fa-trash-can text-bordeControl mr-1.5 "></i>
                    Eliminar registro
                  </>
                )}
              </span>
              <input
                type="checkbox"
                className="w-0 h-0"
                onFocus={(e) => avoidTabIndexFocusOut(e)}
              />
              <button
                id="exitButton"
                className="btnIcon"
                onClick={() => setOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <PersonalForm type={type} data={data} />
            <input
              type="checkbox"
              className="w-0 h-0 "
              onFocus={(e) => avoidTabIndexFocusOut(e)}
            />
          </div>
        </div>
      )}
    </>
  );
};
/*HTMLInputElement HTMLDivElement */
const avoidTabIndexFocusOut = (e: React.FocusEvent<HTMLInputElement>) => {
  const exitButton = document.getElementById("exitButton");
  if (exitButton) {
    exitButton.focus();
  }
};
const avoidTabIndexFocusOut2 = (e: React.FocusEvent<HTMLDivElement>) => {
  const exitButton = document.getElementById("exitButton");
  if (exitButton) {
    exitButton.focus();
  }
};
export default FormModal;
