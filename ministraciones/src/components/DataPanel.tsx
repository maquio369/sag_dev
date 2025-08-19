"use client";
import { useState, useEffect } from "react";
import { toast, ToastOptions } from "react-toastify";
import { aOracion, getCookie, getColumnDisplayName } from "@/utils/util";

import { apiService } from "../services/api";
import DropdownMenuCRUD from "./DropdownMenuCRUD";
import Modal from "./elements/Modal";
import RecordForm from "./RecordForm";
import Spinner from "./elements/Spinner";

import { iPagination } from "./forms/interfaces";
import FormStyleFiltersModal from "@/components/FormStyleFiltersModal";

import ExcelJS from "exceljs";

const DataPanel = ({ entity, nivel }: { entity: string; nivel?: string }) => {
  const campoEstaBorrado = process.env.NEXT_PUBLIC_DELETED_COLUMN_NAME;
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
  const [records, setRecords] = useState<any[]>([]);
  type TableSchema = { columns: any[]; [key: string]: any };
  const [schema, setSchema] = useState<TableSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState<iPagination>({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
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

  // Estados para filtros inteligentes
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [smartFilters, setSmartFilters] = useState({}); // 🚀 NUEVO: Para almacenar filtros inteligentes
  const [exportLoading, setExportLoading] = useState(false); // Estado para exportación

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

  const loadPage = async (page: any) => {
    if (!selectedTable) return;

    try {
      setLoading(true);
      const response = await apiService.getRecords(selectedTable, {
        page,
        limit:
          pagination && typeof (pagination as any).limit === "number"
            ? (pagination as any).limit
            : 50,
      });

      setRecords(response.data.data);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError("Error al cargar la página: " + err.message);
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
        <span className={`flex justify-center text-lg`}>
          {value ? "☑" : "◻"}
        </span>
      );
    }

    if (column.is_primary_key) {
      return (
        <span className="text-fondoTablaHeader px-1 text-xs font-light">
          {value}
        </span>
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
      column.column_name.includes("contraseña") ||
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
          <div className="flex flex-col">
            <span className="font_-light text_-xs">
              {date.toLocaleDateString("es-MX", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
            {column.data_type.includes("timestamp") &&
              column.column_desc.includes("Hr") && (
                <span className="text-xs font-light">
                  {date.toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
          </div>
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
        ) : (!records || records.length === 0) ? (
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
              <thead className="thead sticky top-0 bg-bordeBlancoTransparente dark:bg-fondoObscuroTransparente h-10">
                <tr className="">
                  <th className="w-1 pl-3">☷</th>
                  {schema.columns.map((column: any) => (
                    <th
                      key={column.column_name}
                      className={`${column.data_type === "boolean" || column.column_name.includes("icon") ? "justify-items-center" : ""} ${column.column_name.includes(campoEstaBorrado) && nivel !== "4" ? "hidden" : ""}`}
                    >
                      <div className="">
                        <span className="">
                          {getColumnDisplayName(
                            column.column_name,
                            column.column_desc
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="">
                {records.map((record, index) => (
                  <tr key={index} className="trZebra">
                    <td className="w-fit relative py-2">
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
                        className={`${column.column_name.includes(campoEstaBorrado) && nivel !== "4" ? "hidden" : ""}`}
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

        {/* Paginación */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-2 flex items-center justify_-between shadow text-sm">
            <div className="flex items-center space-x-0.5 mr-3 ">
              <button
                onClick={() => loadPage(1)}
                disabled={!pagination || !pagination.hasPrev}
                className="btn4 text-fondoBoton1 hover:bg-fondoBoton1Hover hover:text-textoBoton1Hover"
              >
                <i className="fa-solid fa-angles-left"></i>
              </button>
              <button
                onClick={() => loadPage((pagination?.page || 1) - 1)}
                disabled={!pagination || !pagination.hasPrev}
                className="btn4 text-fondoBoton1 hover:bg-fondoBoton1Hover hover:text-textoBoton1Hover"
              >
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <div className="flex items-center space-x-0.5">
                {Array.from(
                  { length: Math.min(5, pagination?.totalPages || 1) },
                  (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => loadPage(pageNum)}
                        className={`btn4  ${
                          (pagination?.page || 1) === pageNum
                            ? "bg-fondoBoton1 text-textoBoton1"
                            : "text-fondoBoton1 hover:bg-fondoBoton1Hover hover:text-textoBoton1Hover"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
              </div>
              <button
                onClick={() => loadPage((pagination?.page || 1) + 1)}
                disabled={!pagination || !pagination.hasNext}
                className="btn4 text-fondoBoton1 hover:bg-fondoBoton1Hover hover:text-textoBoton1Hover"
              >
                <i className="fa-solid fa-angle-right"></i>
              </button>
              <button
                onClick={() => loadPage(pagination?.totalPages || 1)}
                disabled={!pagination || !pagination.hasNext}
                className="btn4 text-fondoBoton1 hover:bg-fondoBoton1Hover hover:text-textoBoton1Hover"
              >
                <i className="fa-solid fa-angles-right"></i>
              </button>
            </div>
            <div className="text-xs font-light">
              [ {((pagination?.page || 1) - 1) * (pagination?.limit || 50) + 1}-
              {Math.min((pagination?.page || 1) * (pagination?.limit || 50), pagination?.total || 0)} ]
              de <span className="font-medium">{pagination?.total || 0}</span>{" "}
              registros
            </div>
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

  // 🚀 FUNCIÓN CORREGIDA PARA APLICAR FILTROS
  const handleApplyFilters = async (filterData: any) => {
    try {
      setLoading(true);
      console.log("🔍 Aplicando filtros:", filterData);

      // Detectar el formato del filtro
      let processedFilters: Record<string, any> = {};
      let activeCount = 0;

      // Formato del FormStyleFiltersModal: { filters: {...}, connectors: [...] }
      if (filterData.filters && typeof filterData.filters === "object") {
        console.log("📋 Procesando formato FormStyleFiltersModal");
        let j = 0;
        Object.entries(filterData.filters).forEach(
          ([fieldName, filterConfig]) => {
            let logicalOperator = "AND";
            try {
              logicalOperator = filterData.connectors[j].connector;
            } catch (error) {}

            j++;
            // Add a type guard to ensure filterConfig is an object with operator and value
            if (
              filterConfig &&
              typeof filterConfig === "object" &&
              "operator" in filterConfig &&
              "value" in filterConfig
            ) {
              const { operator, value, value2 } = filterConfig as {
                operator: string;
                value: string;
                value2?: string;
              };

              if (value && value.trim() !== "") {
                console.log(
                  `🔧 Aplicando filtro: ${fieldName} ${operator} "${value}"`
                );

                switch (operator) {
                  case "=":
                    processedFilters[`${fieldName}~equal~${logicalOperator}`] =
                      value;
                    break;
                  case "<>":
                    processedFilters[
                      `${fieldName}~text_not_equal~${logicalOperator}`
                    ] = value;
                    break;
                  case "!=":
                    processedFilters[
                      `${fieldName}~not_equal~${logicalOperator}`
                    ] = value;
                    break;

                  case ">":
                    processedFilters[`${fieldName}~gt~${logicalOperator}`] =
                      value;
                    break;

                  case "<":
                    processedFilters[`${fieldName}~lt~${logicalOperator}`] =
                      value;
                    break;

                  case ">=":
                    processedFilters[`${fieldName}~gte~${logicalOperator}`] =
                      value;
                    break;

                  case "<=":
                    processedFilters[`${fieldName}~lte~${logicalOperator}`] =
                      value;
                    break;

                  case "==":
                  case "between_same_day":
                  case "between":
                    if (value.includes(" - ")) {
                      const [min, max] = value.split(" - ");
                      if (min && max) {
                        processedFilters[`${fieldName}~gte`] = min.trim();
                        processedFilters[
                          `${fieldName}~lte~${logicalOperator}`
                        ] = max.trim();
                      }
                    }
                    break;

                  case "M":
                    // Para filtro de mes
                    processedFilters[`${fieldName}~month~${logicalOperator}`] =
                      value;
                    break;

                  case "!≈":
                  case "not_like":
                    processedFilters[
                      `${fieldName}~not_like~${logicalOperator}`
                    ] = value;
                    break;
                  case "like":
                  default:
                    // Para LIKE, enviar directamente el valor (el backend ya maneja el ILIKE)
                    //processedFilters[fieldName] = value;
                    processedFilters[`${fieldName}~like~${logicalOperator}`] =
                      value;
                    break;
                  /*
                  default:
                    // Para operadores no reconocidos, usar valor directo
                    processedFilters[fieldName] = value;
                    break;*/
                }

                activeCount++;
              }
            }
          }
        );
      }
      // Formato de otros modales (SmartFiltersModal, AdvancedFilterModal)
      else if (typeof filterData === "object" && !filterData.filters) {
        console.log("📋 Procesando formato SmartFiltersModal");

        Object.entries(filterData).forEach(([fieldName, config]) => {
          if (
            config &&
            typeof config === "object" &&
            "value" in config &&
            typeof (config as any).value === "string" &&
            (config as any).value.trim() !== ""
          ) {
            const value = (config as any).value;
            const operator = (config as any).operator;
            switch (operator) {
              case "LIKE":
                processedFilters[fieldName] = value;
                break;
              case "BETWEEN":
                if (value.includes(",")) {
                  const [min, max] = value.split(",");
                  if (min && max) {
                    processedFilters[`${fieldName}_gte`] = min.trim();
                    processedFilters[`${fieldName}_lte`] = max.trim();
                  }
                }
                break;
              case "IS_NULL":
                processedFilters[`${fieldName}_is_null`] = "true";
                break;
              case "IS_NOT_NULL":
                processedFilters[`${fieldName}_is_not_null`] = "true";
                break;
              default:
                processedFilters[`${fieldName}_${operator.toLowerCase()}`] =
                  value;
                break;
            }
            activeCount++;
          }
        });
      }

      // Actualizar estado de filtros
      setCurrentFilters(processedFilters);
      setActiveFiltersCount(activeCount);

      // Construir parámetros para el backend
      const params = {
        page: "1", // Resetear a primera página al filtrar
        limit: "50",
        ...processedFilters,
      };

      console.log("🚀 Parámetros enviados al backend:", params);

      const response = await apiService.getRecords(selectedTable, params);
      console.log("📊 Respuesta del filtro:", response);

      // Extraer los datos correctamente según la estructura de respuesta
      let recordsData, paginationData;

      if (response.data && response.data.data) {
        recordsData = response.data.data;
        paginationData = response.data.pagination;
      } else if (response.data) {
        recordsData = response.data;
        paginationData = {};
      } else {
        recordsData = response;
        paginationData = {};
      }

      // Asegurar que recordsData es un array
      if (!Array.isArray(recordsData)) {
        console.warn("Records data is not an array:", recordsData);
        recordsData = [];
      }

      setRecords(recordsData);
      setPagination(paginationData || {});

      // Mostrar mensaje de filtros aplicados
      if (activeCount > 0) {
        console.log(
          `✅ Se aplicaron ${activeCount} filtro(s), encontrados ${recordsData.length} registros`
        );
      }
    } catch (error) {
      console.error("❌ Error al aplicar filtros:", error);
      setRecords([]);
      setPagination({
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar filtros
  const handleClearAllFilters = () => {
    setCurrentFilters({});
    setActiveFiltersCount(0);
    fetchRecords(selectedTable, 1); // Recargar datos sin filtros
  };

  // Función principal de exportación Excel (con ExcelJS)
  const handleExportToExcel = async () => {
    if (!selectedTable || !records || records.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    try {
      setExportLoading(true);
      //console.log("📊 Iniciando exportación a Excel...");

      // Obtener todos los registros (sin paginación) con filtros aplicados
      const exportParams = {
        limit: "10000", // Exportar todos los registros
        page: "1",
        ...currentFilters, // Mantener filtros aplicados
      };

      const response = await apiService.getRecords(selectedTable, exportParams);

      let allRecords;
      if (response.data && response.data.data) {
        allRecords = response.data.data;
      } else if (response.data) {
        allRecords = response.data;
      } else {
        allRecords = response;
      }

      if (!Array.isArray(allRecords) || allRecords.length === 0) {
        alert("No hay registros para exportar");
        return;
      } else {
        console.log(
          aOracion(selectedTable),
          "- Registros para exportación:",
          allRecords.length
        );
      }

      // Crear workbook y worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(
        selectedTable.charAt(0).toUpperCase() + selectedTable.slice(1)
      );
      
      // Preparar datos para Excel
      const excelData = prepareDataForExcel(allRecords);

      if (excelData) {
        if (excelData.length === 0) {
          alert("No hay datos para exportar");
          return;
        }

        // Agregar headers con estilo
        const headers = Object.keys(excelData[0]);
        const headerRow = worksheet.addRow(headers);
        
        worksheet.getRow(1).height = 30; // Set the height to 30 units (default is usually 15)
        // Estilizar headers
        headerRow.eachCell((cell, colNumber) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF181818" }, // Color encabezado
          };
          cell.font = {
            color: { argb: "FFFFFFFF" }, // Texto blanco
            bold: true,
            size: 11,
          };
          cell.alignment = {
            vertical: "middle",
            horizontal: "left",
          };
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
        });

        // Agregar datos
        excelData.forEach((record: any, index: number) => {
          const row = worksheet.addRow(Object.values(record));

          // Aplicar estilos alternados a las filas
          row.eachCell((cell, colNumber) => {
            // Bordes
            cell.border = {
              top: { style: "thin", color: { argb: "FFE5E7EB" } },
              left: { style: "thin", color: { argb: "FFE5E7EB" } },
              bottom: { style: "thin", color: { argb: "FFE5E7EB" } },
              right: { style: "thin", color: { argb: "FFE5E7EB" } },
            };

            // Color de fondo alternado
            if (index % 2 === 0) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFF9FAFB" }, // Gris muy claro
              };
            }

            // Alineación
            cell.alignment = {
              vertical: "top",
              horizontal: "left",
            };
          });
        });

        // Ajustar ancho de columnas automáticamente
        worksheet.columns.forEach((column, index) => {
          let maxLength = headers[index].length;

          // Calcular el ancho máximo basado en el contenido
          excelData.forEach((record: any) => {
            const value = Object.values(record)[index];
            if (value && value.toString().length > maxLength) {
              maxLength = value.toString().length;
            }
          });

          // Establecer ancho con límites
          column.width = Math.min(Math.max(maxLength + 2, 10), 50);
        });

        // Agregar filtros automáticos
        worksheet.autoFilter = {
          from: "A1",
          to: worksheet.lastColumn?.letter + "1",
        };

        // Congelar primera fila (headers)
        worksheet.views = [{ state: "frozen", ySplit: 1 }];

        // Generar archivo y descargar
        const buffer = await workbook.xlsx.writeBuffer();
        downloadExcelFile(buffer, selectedTable);

        //console.log(`✅ Exportación Excel completada`);

        // Mostrar mensaje de éxito
        const exportedCount = allRecords.length;
        /*alert(
          `✅ Exportación exitosa!\n\n📊 ${exportedCount} registros exportados\n📁 Formato: Excel (.xlsx)\n🎨 Con estilos y filtros`
        );*/
      }
    } catch (error: any) {
      console.error("❌ Error durante la exportación:", error);
      alert(
        "Error al exportar: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setExportLoading(false);
    }
  };

  const prepareDataForExcel = (records: any) => {
    if (!records.length || !schema) return [];

    return records.map((record: any) => {
      const excelRow: { [key: string]: any } = {};

      // Procesar cada columna según su tipo
      schema.columns.forEach((column) => {
        if (column.column_name !== campoEstaBorrado) {
          const columnName = column.column_name;
          let value = record[columnName];
          const displayName = getColumnDisplayName(
            column.column_name,
            column.column_desc
          );

          // Manejar claves foráneas - mostrar el texto descriptivo
          if (schema.foreignKeys) {
            const fkColumn = schema.foreignKeys.find(
              (fk: any) => fk.column_name === columnName
            );
            if (fkColumn) {
              const displayField = `${columnName}_display`;
              const displayValue = record[displayField];

              if (displayValue) {
                excelRow[displayName] = value ? `${value} ${displayValue}` : "";
                return;
              }
            }
          }

          // Procesar según tipo de dato
          if (value === null || value === undefined) {
            excelRow[displayName] = "";
          } else if (typeof value === "boolean") {
            excelRow[displayName] = value ? "Sí" : "No";
          } else if (
            column.data_type === "timestamp" ||
            column.data_type === "date"
          ) {
            try {
              const date = new Date(value);
              // ExcelJS maneja fechas nativas de JavaScript automáticamente
              excelRow[displayName] = date;
            } catch {
              excelRow[displayName] = value;
            }
          } else if (typeof value === "number") {
            // Mantener números como números para que Excel los reconozca
            excelRow[displayName] = value;
          } else {
            excelRow[displayName] = value.toString();
          }
        }
      });

      return excelRow;
    });
  };

  // Función para descargar archivo Excel
  const downloadExcelFile = (buffer: any, tableName: string) => {
    // Crear blob
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Crear URL temporal
    const url = URL.createObjectURL(blob);

    // Crear elemento de descarga
    const link = document.createElement("a");
    link.href = url;

    // Generar nombre de archivo
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    link.download = `${tableName}_export_${timestamp}.xlsx`;

    // Simular click para descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpiar URL temporal
    URL.revokeObjectURL(url);
  };

  const fetchSchema = async (table: any) => {
    try {
      console.log(`📋 Obteniendo schema de ${table}...`);
      const response = await apiService.getTableSchema(table);
      console.log("Schema response:", response); // Debug

      // Extraer los datos correctamente según la estructura de respuesta
      let schemaData;
      if (response.data && response.data.data) {
        schemaData = response.data.data;
      } else if (response.data) {
        schemaData = response.data;
      } else {
        schemaData = response;
      }

      setSchema(schemaData);
      console.log(
        `✅ Schema de ${table} cargado, columnas:`,
        schemaData.columns?.length || 0
      );
    } catch (error) {
      console.error("Error fetching schema:", error);
      setSchema(null);
    }
  };
  // Función modificada para mantener filtros al cambiar de página
  const fetchRecords = async (
    table: any,
    page = 1,
    maintainFilters = false
  ) => {
    if (!table) return;

    try {
      setLoading(true);
      console.log(`📖 Cargando registros de ${table}, página ${page}`);

      // Mantener filtros actuales si se especifica
      const filters = maintainFilters ? currentFilters : {};

      // Construir parámetros
      const params = {
        page: page.toString(),
        limit: "50",
        ...filters,
      };

      const response = await apiService.getRecords(table, params);
      console.log("Records response:", response); // Debug

      // Extraer los datos correctamente según la estructura de respuesta
      let recordsData, paginationData;

      if (response.data && response.data.data) {
        recordsData = response.data.data;
        paginationData = response.data.pagination;
      } else if (response.data) {
        recordsData = response.data;
        paginationData = {};
      } else {
        recordsData = response;
        paginationData = {};
      }

      // Asegurar que recordsData es un array
      if (!Array.isArray(recordsData)) {
        console.warn("Records data is not an array:", recordsData);
        recordsData = [];
      }

      setRecords(recordsData);
      setPagination(paginationData || {});

      console.log(`✅ Se cargaron ${recordsData.length} registros de ${table}`);
    } catch (error) {
      console.error("Error fetching records:", error);
      setRecords([]);
      setPagination({
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
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
              <div className="inline-flex space-x-1">
                <span className="text-bordeControl">■</span>
                <span className="mr-6 text-lg">&nbsp;{aOracion(entity)}</span>
                {/*
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span>{tables.length} tablas detectadas</span>
              */}
                {/* Agregar */}
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

                {/* 🚀 BOTÓN FILTROS DE BÚSQUEDA */}
                <button
                  className={`btn3 ${
                    activeFiltersCount > 0
                      ? "bg-fondoTablaFilaZebra dark:bg-textoSeparadorDark"
                      : ""
                  }`}
                  title="Ver filtros de búsqueda"
                  onClick={() => setShowFilterModal(true)}
                >
                  <i className="fa-solid fa-filter"></i>
                  <span className="lblBtn">Filtrar</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-menuIcon text-white text-xs ml-2 mr-3 rounded-full min-w-[20px] flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearAllFilters}
                    className="text-TextoLblError relative right-5.5 z-2 hover:scale-100 scale-75"
                    title="Limpiar filtros"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}

                {/* Exportar */}
                <button
                  className="btn3 "
                  title="Exportar registros a Excel"
                  onClick={handleExportToExcel}
                  disabled={exportLoading || !selectedTable || !Array.isArray(records) || records.length === 0}
                >
                  <i className="fa-solid fa-file-export"></i>
                  <span className="lblBtn">Exportar</span>
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
              titleName={`Nuevo registro de ${selectedTable}`}
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
          resizable={true}
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
              titleName={`Modificar registro de ${selectedTable}`}
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
                  <div className="w-15 h-15 dark:bg-fondoTransparenteObscuroNotificacion rounded-xl flex items-center justify-center mr-4">
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
                  className="btn4 ml-19 bg-TextoLblError hover:bg-bordeControlInvalido focus:bg-bordeControlInvalido text-textoBoton1 hover:text-textoBoton1Hover"
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

        {/* 🚀 NUEVO: Modal Filtros Inteligentes */}
        <FormStyleFiltersModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={handleApplyFilters}
          schema={schema}
          currentFilters={currentFilters}
          tableName={selectedTable}
          access_level={String(nivel)}
        />
      </div>
    </div>
  );
};

export default DataPanel;
