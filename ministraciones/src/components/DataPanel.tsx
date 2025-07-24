"use client";
import { useState, useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
import { aOracion, getCookie, ofuscad } from "@/utils/util";

import { apiService } from "../services/api";
import DropdownMenuCRUD from "./DropdownMenuCRUD";
import Modal from "./elements/Modal";
import RecordForm from "./RecordForm";
import Spinner from "./elements/Spinner";

const DataPanel = ({ entity, nivel }: { entity: string; nivel?: string }) => {
  const esta_borrado = process.env.NEXT_PUBLIC_DELETED_COLUMN_NAME;
  const fk_postfix = process.env.NEXT_PUBLIC_FK_COLUMN_POSTFIX;

  const nums =
    typeof window !== "undefined" ? getCookie("nums", document.cookie) : "{}";

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toastOptions = {
    theme:
      typeof window !== "undefined" ? localStorage.getItem("theme") : "light",
  } as ToastOptions;

  const contactosHandleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setModalOpen(false);
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
  const [text2display, setText2display] = useState("");

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
      const displayValue = record[`${column.column_name + fk_postfix}`];
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
      return (
        <span className="text-fondoTablaHeader px-1 text-xs">{value}</span>
      );
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
    if (
      column.column_name.includes("clave") ||
      column.column_name.includes("constraseña") ||
      column.column_name.includes("password")
    ) {
      return <span className={`flex justify-center `}>•••••</span>;
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
          <Spinner className="h-16 w-16 mt-18 border-4" />
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
                        onEdit={() => openEditModal(record)}
                        onDelete={() => openDeleteModal(record)} //{() => openEditModal(record)}
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
      toast.success("Registro creado exitosamente", toastOptions);
      //showNotification('Registro creado exitosamente', 'success');
    } catch (err: any) {
      toast.error(
        "Error al crear registro: " +
          (err.response?.data?.message || err.message),
        toastOptions
      );
      //showNotification('Error al crear registro: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setCrudLoading(false);
    }
  };

  const handleEditRecord = async (data: any) => {
    try {
      setCrudLoading(true);
      if (!schema) {
        toast.error(
          "No se puede editar el registro: esquema no disponible",
          toastOptions
        );
        return;
      }
      const primaryKey = schema.primaryKey;
      if (!selectedRecord) {
        toast.error(
          "No se puede editar el registro: registro no seleccionado",
          toastOptions
        );
        setCrudLoading(false);
        return;
      }
      const recordId = selectedRecord[primaryKey];

      await apiService.updateRecord(selectedTable, recordId, data);

      await selectTable(selectedTable);
      setShowEditModal(false);
      setSelectedRecord(null);
      toast.success("Registro actualizado exitosamente", toastOptions);
      //showNotification('Registro actualizado exitosamente', 'success');
    } catch (err: any) {
      toast.error(
        "Error al actualizar registro: " +
          (err.response?.data?.message || err.message),
        toastOptions
      );
      //showNotification('Error al actualizar registro: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setCrudLoading(false);
    }
  };

  const openEditModal = (record: any) => {
    setSelectedRecord(record);
    setShowEditModal(true);
  };

  const handleDeleteRecord = async (record: any) => {
    try {
      setCrudLoading(true);
      if (!schema) {
        toast.error(
          "No se puede eliminar el registro: esquema no disponible",
          toastOptions
        );
        setCrudLoading(false);
        return;
      }
      const primaryKey = schema.primaryKey;
      if (!selectedRecord) {
        toast.error(
          "No se puede eliminar el registro: registro no seleccionado",
          toastOptions
        );
        setCrudLoading(false);
        return;
      }
      const recordId = selectedRecord[primaryKey];

      await apiService.deleteRecord(selectedTable, recordId);

      await selectTable(selectedTable);
      setShowDeleteModal(false);
      setSelectedRecord(null);

      toast.success("Registro eliminado exitosamente", toastOptions);
    } catch (err: any) {
      toast.error(
        "Error al eliminar registro: " +
          (err.response?.data?.message || err.message),
        toastOptions
      );
    } finally {
      setCrudLoading(false);
    }
  };

  const openDeleteModal = (record: any) => {
    setSelectedRecord(record);
    //console.log(record);
    setShowDeleteModal(true);
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
          //onSubmit={handleCreateRecord}
          iconType="ins"
          title={`Nuevo registro de ${selectedTable}`}
          className={
            schema &&
            schema.columns.length <=
              Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_SM)
              ? "w-[88%] md:w-[68%] lg:w-[48%]  fondoVentanaForm fondoVentanaForm-center min-h-3/12"
              : schema &&
                  schema.columns.length <=
                    Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_MD)
                ? "w-[98%] md:w-[78%] lg:w-[68%] fondoVentanaForm-center min-h-3/12"
                : "fondoVentanaForm-width fondoVentanaForm-center min-h-3/12"
          }
        >
          {schema && (
            <RecordForm
              tableName={selectedTable}
              schema={schema}
              onSave={handleCreateRecord}
              onCancel={() => setShowCreateModal(false)}
              isLoading={crudLoading}
              level={nivel}
              titleName={`Nuevo registro de ${selectedTable}`.replace("","")}
            />
          )}
        </Modal>

        {/* Modal Editar */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          iconType="upd"
          title={`Modificar registro de ${selectedTable}`}
          //onSubmit={handleEditRecord}
          className={
            schema &&
            schema.columns.length <=
              Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_SM)
              ? "w-[88%] md:w-[68%] lg:w-[48%]  fondoVentanaForm fondoVentanaForm-center min-h-3/12"
              : schema &&
                  schema.columns.length <=
                    Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_MD)
                ? "w-[98%] md:w-[78%] lg:w-[68%] fondoVentanaForm-center min-h-3/12"
                : "fondoVentanaForm-width fondoVentanaForm-center min-h-3/12"
          }
        >
          {schema && selectedRecord && (
            <RecordForm
              tableName={selectedTable}
              schema={schema}
              record={selectedRecord}
              onSave={handleEditRecord}
              onCancel={() => setShowEditModal(false)}
              isLoading={crudLoading}
              level={nivel}
              titleName={`Modificar registro de ${selectedTable}`.replace("","")}
            />
          )}
        </Modal>

        {/* Modal Eliminar */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          iconType="del"
          title={`Confirmar eliminación en ${selectedTable}`}
          className="w-150  fondoVentanaForm fondoVentanaForm-center min-h-2/12"
        >
          {selectedRecord && (
            <div>
              <div className="mb-6">
                <div className="flex items-start mb-6">
                  <div className="w-15 h-15 bg-TextoLblErrorSoft dark:bg-fondoTransparenteObscuroNotificacion rounded-xl flex items-center justify-center mr-4">
                    <span className="text-3xl text-textoGolden2">⚠️</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold  mb-2">
                      ¿Estás seguro que desea eliminar este registro?
                    </h4>
                    <p className="text-fondoBlancoTransparenteDark font-medium dark:text-textoBlancoDark">
                      {(() => {
                        // Ensure selectedRecord is an object
                        if (
                          typeof selectedRecord === "object" &&
                          selectedRecord !== null
                        ) {
                          const keys = Object.keys(selectedRecord);
                          const fkPostfix =
                            process.env.NEXT_PUBLIC_FK_COLUMN_POSTFIX || "";
                          const val0 =
                            selectedRecord[keys[0] + fkPostfix] ??
                            selectedRecord[keys[0]];
                          const val1 =
                            keys.length > 1
                              ? (selectedRecord[keys[1] + fkPostfix] ??
                                selectedRecord[keys[1]])
                              : "";
                          const val2 =
                            keys.length > 2
                              ? (selectedRecord[keys[2] + fkPostfix] ??
                                selectedRecord[keys[2]])
                              : "";
                          return (
                            <>
                              {val0} ({val1}
                              {val2 && `, ${val2}`})
                            </>
                          );
                        }
                        return null;
                      })()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-start">
                <button
                  onClick={handleDeleteRecord}
                  disabled={crudLoading}
                  className="btn4 bg-TextoLblError hover:bg-bordeControlInvalido focus:bg-bordeControlInvalido text-textoBoton1 hover:text-textoBoton1Hover"
                >
                  {crudLoading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  )}
                  <i className="fa-solid fa-trash-can mx-1.5"></i>
                  <span className="mr-1.5">Eliminar</span>
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default DataPanel;
