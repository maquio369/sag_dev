"use client";
import DataPanel from "@/components/DataPanel";

const Roles = () => {
  return (
    <div className="flex flex-col overflow-auto pb-3">
      <span className="lblEncabezado ml-4 mt-3">
        {/*Administración de usuarios*/}
      </span>

      <DataPanel entity={"Roles"}></DataPanel>
    </div>
  );
};

export default Roles;