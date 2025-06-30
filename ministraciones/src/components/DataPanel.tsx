"use client";
import PersonalListPage from "@/app/(dashboard)/list/personal/page";
import ContactosForm, {
  modelContactos,
} from "@/app/(dashboard)/contactos/ContactosForm";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { aOracion } from "@/utils/util";

import { apiConfig, apiService } from "../services/api";

const DataPanel = ({ entity }: { entity: string }) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<modelContactos | null>(null);

  const contactosHandleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = async (data: modelContactos): Promise<void> => {
    setUserData(data);

    console.log("Form submitted:", { data });
    // No need to preventDefault or reset form - React handles it
    if (data.nombres === "") {
      toast.warn("El nombre es obligatorio", { theme: "dark" });
      //return { success: false, message: "¡El nombre es obligatorio!" };
    } else {
      await new Promise((resolve) => setTimeout(resolve, 777));
      toast.success("¡Registro guardado con éxito!", { theme: "light" });
    }

    handleCloseUserModal();
  };
  //const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Cargar tablas al montar el componente
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [records, setRecords] = useState([]);
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTables();
      setTables(response.data.data);
      setError("");
    } catch (err: any) {
      setError("Error al cargar las tablas: " + err.message);
      console.error("Error loading tables:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col overflow-auto pb-3">
      <div className="flex flex-wrap w-full gap-4 px-4">
        <div
          className="flex-1 bg-bordeBlancoTransparente rounded-lg shadow-sm p-4 dark:bg-fondoBlancoTransparenteDark
        text-textoEtiqueta dark:text-fondoBlancoTransparente"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-0">
              <div className="inline-flex">
                <span className="text-bordeControl">■</span>
                <span className="mr-6 text-lg">&nbsp;{aOracion(entity)}</span>
              {/*
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>{tables.length} tablas detectadas</span>
              */}
              </div>
            </div>
            <div className="flex items-center gap-4 text-base">
              <ContactosForm
                isOpen={isModalOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseUserModal}
                type="ins"
              />

              <button
                className="btn3 "
                title="Agregar registro"
                onClick={contactosHandleOpenModal}
              >
                <i className="fa-solid fa-plus"></i>
                <span className="lblBtn">Agregar</span>
              </button>

              <button className="btn3 " title="Buscar">
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="lblBtn">Buscar</span>
              </button>
              {/*<button className="btn3 " title="Filtrar">
                <i className="fa-solid fa-filter"></i>
                <span className="lblBtn">Filtrar</span>
              </button>
              */}
              <button className="btn3 " title="Exportar">
                <i className="fa-solid fa-file-export"></i>
                <span className="lblBtn">Exportar</span>
              </button>
              {/*
              <button className="btn3 " title="Imprimir">
                <i className="fa-solid fa-print"></i>
                <span className="lblBtn">Imprimir</span>
              </button>
              */}

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

export default DataPanel;
