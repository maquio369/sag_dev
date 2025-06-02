import Image from "next/image";
import PersonalListPage from "@/app/(dashboard)/list/personal/page";
import { Form } from "react-hook-form";
import FormModal from "@/components/FormModal";

const HumanosPage = () => {
  return (
    <div className="flex flex-col overflow-auto pb-3">
      <span className="lblEncabezado ml-4 mt-3">Plantilla de personal</span>
      <div className="flex flex-wrap w-full gap-4 px-4">
        <div
          className="flex-1 bg-bordeBlancoTransparente rounded-lg shadow-sm p-4 dark:bg-fondoBlancoTransparenteDark
        text-textoEtiqueta dark:text-fondoBlancoTransparente"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-0">
              <div className="inline-flex">
                <span className="text-bordeControl">■</span>
                <span className="mr-6">&nbsp;Empleados</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-base">
              <FormModal table="humanos" type="ins" />
              <button className="btn3 " title="Buscar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="lblBtn">Buscar</span>
              </button>
              <button className="btn3 " title="Filtrar">
                <i className="fa-solid fa-filter"></i>
                <span className="lblBtn">Filtrar</span>
              </button>
              <button className="btn3 " title="Exportar">
                <i className="fa-solid fa-file-export"></i>
                <span className="lblBtn">Exportar</span>
              </button>

              <button className="btn3 " title="Imprimir">
                <i className="fa-solid fa-print"></i>
                <span className="lblBtn">Imprimir</span>
              </button>
              <button className="btn3 w-[2em]" title="Menú contextual">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>
          </div>

          <hr className="mb-3" />

          <PersonalListPage />
        </div>
      </div>
    </div>
  );
};

export default HumanosPage;
