"use client";
import DataPanel from "@/components/DataPanel";
import { getCookie } from "@/utils/util";
import { useEffect, useState } from "react";

const Data = () => {
  const [entity, setEntity] = useState("registros");

  useEffect(() => {
    setEntity(getCookie("option", document.cookie));
  }, []);

  return (
    entity && (
      <div className="flex flex-col overflow-auto pb-3">
        <span className="lblEncabezado ml-4 mt-3">
          {"Administración de " + entity}
        </span>

        <DataPanel entity={"Roles"}></DataPanel>
      </div>
    )
  );
};

export default Data;
