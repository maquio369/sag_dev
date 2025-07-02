"use client";
import ContactosForm, {
  modelContactos,
} from "@/app/(dashboard)/contactos/ContactosForm";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { aOracion } from "@/utils/util";

import { apiService } from "../services/api";
//import { apiConfig, apiService } from "../utils/api";

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
  const [selectedTable, setSelectedTable] = useState(entity);
  const [records, setRecords] = useState([]);
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({});
  const [foreignKeyMappings, setForeignKeyMappings] = useState<Record<string, any>>({}); // NUEVO: Para mapear FK //anterior = useState({});

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
        apiService.getRecords(tableName, { limit: 50 })
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
    } catch (err:any) {
      setError('Error al cargar la tabla: ' + err.message);
      console.warn('Error loading table:', err);
    } finally {
      setLoading(false);
    }
  };

const renderCellValue = (value:any, column:any, record:any) => {
    if (value === null || value === undefined) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-500 italic">
          null
        </span>
      );
    }

    // NUEVO: Si es una foreign key y tenemos el mapping, mostrar el nombre
    if (column.is_foreign_key && foreignKeyMappings[column.column_name]) {
      const displayField = foreignKeyMappings[column.column_name];
      const displayValue = record[displayField+"_text"];
      
      return (
        <div className="flex flex-col">
          <span className="font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
            {displayValue || 'Sin nombre'}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            ID: {value}
          </span>
        </div>
      );
    }

    if (column.data_type === 'boolean') {
      return (
        <span className={`text-xs text-textoTabla `}> 
          {value ? 'SI' : 'NO'}
        </span>
      );
    }

    if (column.is_primary_key) {
      return (
        <span className="font-normal text-gray-500  px-2 py-1 rounded-full">
          {value}
        </span>
      );
    }

    if ( value.toString().includes("fa-solid") || value.toString().includes("fa-regular")) {
      return (
        <i className={`${value} justify-center px-2`}>           
        </i>
      );
    }

    // Formatear fechas
    if (column.data_type.includes('timestamp') || column.data_type.includes('date')) {
      try {
        const date = new Date(value);
        return (
          <span className="text-gray-700 text-sm">
            {date.toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        );
      } catch {
        return <span className="text-gray-900">{String(value)}</span>;
      }
    }

    return <span className="text-gray-900">{String(value)}</span>;
  };


  const DataTableView = ({ schema }: { schema: any }) => {
    const PK_COLUMN_NAME = process.env.NEXT_PUBLIC_PK_COLUMN_NAME;
  return (
    <div className="flex-1 overflow-auto">
      {/* Tabla de datos */}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
        </div>
      ) : records.length === 0 ? (
        <div className="flex items-center justify-center h-52">
          <div className="text-center">
            <div className="mx-auto mb-2">
              <span className="text-4xl text-textoSeparadorDark"><i className="fa-regular fa-folder"></i></span>
            </div>
            <p className="text-sm text-fondoBlancoTransparenteDark font-medium">No hay registros en esta tabla</p>
            <p className="text-fondoTablaHeader mt-1 text-sm font-light">para añadir un registro usa: +Agregar</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
              <tr>
                {schema.columns.map((column:any) => (
                  <th
                    key={column.column_name}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700  tracking-wider border-b-2 border-gray-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.column_desc? column.is_primary_key? PK_COLUMN_NAME:column.column_desc:column.column_name}</span>
                      <div className="flex space-x-1">
                        
                      </div>
                    </div>
                    
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700  tracking-wider border-b-2 border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {records.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 border-b border-gray-100"
                >
                  {schema.columns.map((column:any) => (
                    <td key={column.column_name} className="px-6 py-4 text-sm">
                      <div className="max-w-xs overflow-hidden">
                        {renderCellValue(record[column.column_name], column, record)}
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-sm">
                    {/* Botones de acción comentados */}
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
                    */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
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

          <DataTableView schema={schema}/>


        </div>
      </div>
    </div>
  );



};

export default DataPanel;
