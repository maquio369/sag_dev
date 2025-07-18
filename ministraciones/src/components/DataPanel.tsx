"use client";
import ContactosForm, {
  modelContactos,
} from "@/app/(dashboard)/contactos/ContactosForm";
import { useState, useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
import { aOracion, getCookie, ofuscad } from "@/utils/util";

import { apiService } from "../services/api";
import DropdownMenuCRUD from "./DropdownMenuCRUD";
import Modal from "./elements/Modal";
import RecordForm from "./RecordForm";
import Spinner from "./elements/Spinner";

//import { apiConfig, apiService } from "../utils/api";

const DataPanel = ({ entity, nivel }: { entity: string; nivel?: string }) => {
  const esta_borrado = process.env.NEXT_PUBLIC_DELETED_COLUMN_NAME;
  const nums =
    typeof window !== "undefined" ? getCookie("nums", document.cookie) : "{}";

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toastOptions = {
    theme:
      typeof window !== "undefined" ? localStorage.getItem("theme") : "light",
  } as ToastOptions;
  const [userData, setUserData] = useState<modelContactos | null>(null);

  const mnuOptions = ["Modificar", "Eliminar", "Agregar"];

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
      toast.warn("El nombre es obligatorio", toastOptions);
      //return { success: false, message: "¡El nombre es obligatorio!" };
    } else {
      await new Promise((resolve) => setTimeout(resolve, 777));
      toast.success("¡Registro guardado con éxito!", toastOptions);
    }

    handleCloseUserModal();
  };
  //const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Cargar tablas al montar el componente
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(entity);
  const [records, setRecords] = useState([]);
  type TableSchema = { columns: any[]; [key: string]: any };
  const [schema, setSchema] = useState<TableSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({});
  const [foreignKeyMappings, setForeignKeyMappings] = useState<
    Record<string, any>
  >({}); // NUEVO: Para mapear FK //anterior = useState({});

  // Estados para modales y CRUD (mantener igual)
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [crudLoading, setCrudLoading] = useState(false);

  useEffect(() => {
    selectTable(entity);
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

  const selectTable = async (tableName: string) => {
    try {
      setLoading(true);
      setSelectedTable(tableName);

      // Cargar schema y registros en paralelo
      const [schemaResponse, recordsResponse] = await Promise.all([
        apiService.getTableSchema(tableName),
        apiService.getRecords(tableName, { limit: 50 }),
      ]);

      setSchema(schemaResponse.data.data);
      setRecords(recordsResponse.data.data);
      setPagination(recordsResponse.data.pagination);

      // NUEVO: Guardar mappings de foreign keys si existen
      if (recordsResponse.data.foreignKeyMappings) {
        setForeignKeyMappings(recordsResponse.data.foreignKeyMappings);
      } else {
        setForeignKeyMappings({});
      }

      setError("");
    } catch (err: any) {
      setError("Error al cargar la tabla: " + err.message);
      console.warn("Error loading table:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderCellValue = (value: any, column: any, record: any) => {
    if (value === null || value === undefined) {
      return (
        <span className="text-textoSeparadorDark dark:text-textoEtiqueta">
          ⓝ
        </span>
      );
    }

    // NUEVO: Si es una foreign key mostrar texto en vez de valor
    if (column.is_foreign_key) {
      const displayValue = record[`${column.column_name}_display`];
      return (
        <div className="flex flex-col">
          <span className="">{displayValue || value}</span>
        </div>
      );
    }

    if (column.data_type === "boolean") {
      return (
        <span className={`flex justify-center`}>{value ? "▣" : "◻"}</span>
      );
    }

    if (column.is_primary_key) {
      return <span className="text-fondoTablaHeader px-1">{value}</span>;
    }

    if (column.column_name.includes("icon")) {
      if (value.toString().includes(" fa-")) {
        return (
          <span className="flex justify-center">
            <i className={`${value}`}></i>
          </span>
        );
      } else {
        return <span className={`flex justify-center `}>{value}</span>;
      }
    }

    // Formatear fechas
    if (
      column.data_type.includes("timestamp") ||
      column.data_type.includes("date")
    ) {
      try {
        const date = new Date(value);
        return (
          <span className="">
            {date.toLocaleDateString("es-ES", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        );
      } catch {
        return <span className="">{String(value)}</span>;
      }
    }

    return <span className="">{String(value)}</span>;
  };

  const DataTableView = ({ schema }: { schema: any }) => {
    return (
      <div className="flex-1 overflow-auto">
        {/* Tabla de datos */}
        {loading ? (
          <Spinner className="h-16 w-16 mt-18 border-4"/>          
        ) : records.length === 0 ? (
          <div className="flex items-center justify-center h-52">
            <div className="text-center">
              <div className="mx-auto mb-2">
                <span className="text-4xl text-textoSeparadorDark">
                  <i className="fa-regular fa-folder"></i>
                </span>
              </div>
              <p className="text-sm text-fondoBlancoTransparenteDark font-medium dark:text-textoEtiqueta tracking-wider ">
                No se encontraron registros
              </p>
              <p className="text-fondoTablaHeader mt-1 text-sm font-light">
                en {aOracion(entity)}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto table_-wrp block_ max-h-[calc(100vh-160px)]">
            <table className="min-w-full">
              <thead className="thead sticky top-0 bg-bordeBlancoTransparente dark:bg-fondoObscuroTransparente">
                <tr className="">
                  <th className="w-1 pl-3">☷</th>
                  {schema.columns.map((column: any) => (
                    <th
                      key={column.column_name}
                      className={`${column.data_type === "boolean" || column.column_name.includes("icon") ? "justify-items-center" : ""} ${column.column_name.includes(esta_borrado) && nivel !== "4" ? "hidden" : ""}`}
                    >
                      <div className="">
                        <span className="">
                          {column.column_desc
                            ? column.column_desc
                            : column.column_name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="">
                {records.map((record, index) => (
                  <tr key={index} className="trZebra">
                    <td className="w-fit relative">
                      <DropdownMenuCRUD
                        recordId={record[0]}
                        recordData={record}
                        access_level={String(nivel)}
                      />
                    </td>
                    {schema.columns.map((column: any) => (
                      <td
                        key={column.column_name}
                        className={`${column.column_name.includes(esta_borrado) && nivel !== "4" ? "hidden" : ""}`}
                      >
                        <div className="max-w-xs overflow-hidden">
                          {renderCellValue(
                            record[column.column_name],
                            column,
                            record
                          )}
                        </div>
                      </td>
                    ))}
                    {/*
                    <td className="w-fit relative">
                      <Dropdown
                        buttonLabel=""
                        items={[
                          {
                            title: "Edit Profile",
                            url: "/edit",
                            icon: <i className="fa-solid fa-pen-to-square" />,
                          },
                          {
                            title: "Delete Activity",
                            url: "/delete",
                            icon: <i className="fa-solid fa-trash-can" />,
                          },
                          {
                            title: "Logout",
                            icon: (
                              <i className="fa-solid fa-right-from-bracket" />
                            ),
                            action: () => alert("Logged out!"),
                          },
                        ]}
                      />

                      <ContextualMenu
                        onEdit={() => {
                          // Lógica para modificar el elemento
                          console.log("Modificar elemento");
                          //openEditModal(record);
                          toast.info("Modificar");
                        }}
                        onDelete={() => {
                          // Lógica para eliminar el elemento
                          console.log("Eliminar elemento");
                          //openDeleteModal(record)
                          toast.error("Eliminar");
                        }}
                      /> */}
                    {/* Botones de acción en menú contextual 
                      
                      <ContextualMenu
                        onEdit={() => {                          // Lógica para modificar el elemento
                          console.log("Modificar elemento");
                          //openEditModal(record);
                          toast.info("Modificar");
                        }}
                        onDelete={() => {                          // Lógica para eliminar el elemento
                          console.log("Eliminar elemento");
                          //openDeleteModal(record)
                          toast.error("Eliminar");
                        }}
                      />
                      */}
                    {/*
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openEditModal(record)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Editar registro"
                      >
                        <span className="w-4 h-4 block">✏️</span>
                      </button>
                      <button 
                        onClick={() => openDeleteModal(record)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Eliminar registro"
                      >
                        <span className="w-4 h-4 block">🗑️</span>
                      </button>
                    </div>
                    
                    </td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // CRUD Operations
  const handleCreateRecord = async (data: any) => {
    try {
      setCrudLoading(true);
      await apiService.createRecord(selectedTable, data);

      await selectTable(selectedTable);
      setShowCreateModal(false);
      toast.success("Registro creado exitosamente", { theme: "light" });
      //showNotification('Registro creado exitosamente', 'success');
    } catch (err: any) {
      toast.error(
        "Error al crear registro: " +
          (err.response?.data?.message || err.message),
        { theme: "dark" }
      );
      //showNotification('Error al crear registro: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setCrudLoading(false);
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
                <button
                  className="btn3"
                  title="Agregar registro"
                  hidden={nivel === "1"}
                  //onClick={contactosHandleOpenModal}
                  onClick={() => setShowCreateModal(true)}
                >
                  <i className="fa-solid fa-plus"></i>
                  <span className="lblBtn">Agregar</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-base">
              <ContactosForm
                isOpen={isModalOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseUserModal}
                type="ins"
              />

              {/*
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
*/}
              {/*
              <button className="btn3 " title="Imprimir">
                <i className="fa-solid fa-print"></i>
                <span className="lblBtn">Imprimir</span>
              </button>
              */}

              <button
                className="btn3 w-[1.6em] justify-center"
                title="Menú contextual"
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
            </div>
          </div>

          <hr className="mb-3" />

          <DataTableView schema={schema} />
        </div>

        {/* Modales existentes */}
        {/* Modal Crear */}
        
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          type={"Nuevo registro" + " de " + selectedTable}
          
          className={schema && schema.columns.length <= Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_SM) ? "w-[88%] md:w-[68%] lg:w-[48%]  fondoVentanaForm fondoVentanaForm-center min-h-3/12" 
            :schema && schema.columns.length <= Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_MD) ? "w-[98%] md:w-[78%] lg:w-[68%] fondoVentanaForm-center min-h-3/12": "fondoVentanaForm-width fondoVentanaForm-center min-h-3/12"}
        >
          {schema && (
            <RecordForm
              tableName={selectedTable}
              schema={schema}
              onSave={handleCreateRecord}
              onCancel={() => setShowCreateModal(false)}
              isLoading={crudLoading}
              level={nivel}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default DataPanel;
