// frontend/src/components/FormStyleFiltersModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "@/components/elements/Modal";
import { getColumnDisplayName } from "@/utils/util";
import { apiService } from "../services/api";

/*
type SchemaColumn = {
  column_name: string;
  column_desc?: string;
  data_type: string;
  is_primary_key?: boolean;
  is_identity?: boolean;
  is_nullable?: string;
  column_default?: any;
  character_maximum_length?: number;
};
*/

const FormStyleFiltersModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  schema,
  currentFilters = {},
  tableName,
  access_level,
}) => {
  const [filters, setFilters] = useState({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const campoEstaBorrado = process.env.NEXT_PUBLIC_DELETED_COLUMN_NAME;

  const [foreignKeyOptions, setForeignKeyOptions] = useState({});

  useEffect(() => {
    if (isOpen && schema) {
      initializeFilters();
    }
  }, [isOpen, schema]);

  useEffect(() => {
    //initializeForm();
    if (schema && schema.foreignKeys && schema.foreignKeys.length > 0) {
      loadForeignKeyOptions();
    }
  }, [schema]);
  //const error = errors[column.column_name];
  /*const isRequired = column.is_nullable === "NO" && !column.column_default;
    const columnDisplayName = getColumnDisplayName(
      column.column_name,
      column.column_desc
    );*/

  // 🎯 FUNCIÓN PARA RENDERIZAR CAMPOS DE FOREIGN KEY
  const renderForeignKeyField = (
    column,
    value,
    //error,
    //isRequired,
    displayName
  ) => {
    /*
    // Si están cargando las opciones, mostrar loading
    if (loadingOptions) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="animateSpin"></div>
              <span className="text-gray-700">
                Cargando opciones de relaciones...
              </span>
            </div>
          </div>
        </div>
      );
    }
      */
    return (
      <div className="mb-2">
        {" "}
        {/* Foreign Key Select */}
        <select
          id={column.column_name}
          name={column.column_name}
          value={value}
          onChange={(e) =>
            updateFilter(column.column_name, { value: e.target.value })
          }
          /*onChange={(e) =>
            handleInputChange(
              column.column_name,
              e.target.value ? parseInt(e.target.value) : ""
            )
          }*/
          className="select1"
        >
          <option
            value=""
            className="text-textoSeparadorDark dark:text-textoEtiqueta"
          >
            Seleccionar...
          </option>
          {foreignKeyOptions[column.column_name]?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/*error && (
          <p className="text-sm text-TextoLblError flex items-center space-x-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )*/}
      </div>
    );
  };
  const loadForeignKeyOptions = async () => {
    if (!schema.foreignKeys || schema.foreignKeys.length === 0) {
      return;
    }

    //setLoadingOptions(true);Type annotations can only be used in TypeScript files
    const options = {};

    try {
      // Cargar opciones para cada foreign key
      const promises = schema.foreignKeys.map(async (fk) => {
        try {
          const response = await apiService.getForeignKeyOptions(
            tableName,
            fk.column_name
          );
          options[fk.column_name] = response.data.data.options;
          //console.log(`Opciones cargadas para ${fk.column_name}:`, response.data.data.options);
        } catch (error) {
          console.error(
            `Error cargando opciones para ${fk.column_name}:`,
            error
          );
          // Si falla, crear opciones vacías
          options[fk.column_name] = [];
        }
      });

      await Promise.all(promises);
      setForeignKeyOptions(options);
    } catch (error) {
      console.error("Error general cargando opciones FK:", error);
      // showNotification('Error al cargar opciones de relaciones', 'error');
    } finally {
      //setLoadingOptions(false);
    }
  };

  // Inicializar filtros vacíos
  const initializeFilters = () => {
    if (!schema || !schema.columns) {
      console.warn("Schema no disponible para inicializar filtros");
      return;
    }

    console.log("🔍 DEBUG - Schema recibido:", {
      tableName: schema.tableName,
      totalColumns: schema.columns.length,
      columns: schema.columns,
    });

    const initialFilters = {};
    const filterableColumns = getFilterableColumns();

    console.log(
      `🔍 DEBUG - ${filterableColumns.length} columnas filtrables encontradas`
    );

    filterableColumns.forEach((column, index) => {
      // Validación más robusta
      if (!column || !column.column_name) {
        console.warn("Columna inválida encontrada:", column);
        return;
      }

      // Usar data_type con fallback
      const dataType = column.data_type || "text";

      initialFilters[column.column_name] = {
        operator: getDefaultOperator(dataType),
        value: "",
        value2: "",
        connector: index < filterableColumns.length - 1 ? "AND" : null,
        column: {
          ...column,
          data_type: dataType, // Asegurar que data_type esté definido
        },
      };
    });

    setFilters(initialFilters);
    updateActiveCount(initialFilters);
  };

  // Obtener operador por defecto según tipo de campo
  const getDefaultOperator = (dataType) => {
    if (!dataType) {
      console.warn("data_type no definido, usando operador por defecto");
      return "=";
    }

    switch (dataType) {
      case "text":
      case "varchar":
      case "character varying":
        return "like";
      case "date":
      case "timestamp":
      case "datetime":
      case "timestamp without time zone":
      case "timestamp with time zone":
        return "M"; // Por defecto "igual a" para fechas
      default:
        return "=";
    }
  };

  // Obtener operadores disponibles por tipo - MEJORADO con mejor presentación
  const getOperators = (dataType) => {
    if (!dataType) {
      return [
        { value: "=", label: "=", title: "igual a" },
        { value: "like", label: "≈", title: "contiene" },
        { value: "!=", label: "≠", title: "diferente de" },
      ];
    }

    // 🗓 OPERADORES ESPECIALES PARA FECHAS
    if (
      dataType === "date" ||
      dataType === "timestamp" ||
      dataType === "datetime" ||
      dataType === "timestamp without time zone" ||
      dataType === "timestamp with time zone"
    ) {
      return [
      {
          value: "between_same_day",
          label: "==",
          title: "filtrar por día",
        }, //considera en value2 la hr: Fecha2+' 23:59:59' (timestamp with time zone)        
        {
          value: "M",
          label: "🗓",
          title: "filtrar por mes",
        },
        {
          value: "between",
          label: "//",
          title: "filtrar por rango de fechas",
        },
        
      ];
    }

    // Operadores para números
    if (
      dataType === "integer" ||
      dataType === "numeric" ||
      dataType === "serial" ||
      dataType === "decimal" ||
      dataType === "real" ||
      dataType === "bigint"
    ) {
      return [
        { value: "=", label: "=", title: "igual a" },
        { value: "!=", label: "≠", title: "diferente de" },
        { value: ">", label: ">", title: "mayor que" },
        { value: "<", label: "<", title: "menor que" },
        { value: ">=", label: "≥", title: "mayor o igual a" },
        { value: "<=", label: "≤", title: "menor o igual a" },
      ];
    }

    // Operadores para números
    if (dataType === "boolean") {
      return [
        { value: "=", label: "=", title: "igual a" },
        { value: "!=", label: "≠", title: "diferente de" },
      ];
    }

    // Operadores para texto
    return [
      { value: "like", label: "≈", title: "contiene" },
      { value: "not_like", label: "!≈", title: "no contiene" },
      { value: "=", label: "=", title: "igual a" },
      { value: "<>", label: "≠", title: "diferente de" },
    ];
  };

  // Obtener las columnas filtrables
  const getFilterableColumns = () => {
    if (!schema || !schema.columns) {
      console.warn("Schema o columns no disponible");
      return [];
    }

    return schema.columns.filter((column) => {
      // Validación básica de columna
      if (!column || !column.column_name) {
        console.warn("Columna sin column_name:", column);
        return false;
      }
      if (
        column.column_name.includes("contraseña") ||
        column.column_name.includes("password")
      ) {
        return false;
      }
      //if (column.is_primary_key) return false;
      /*
      const systemColumns = [
        "deleted",
        "created_at",
        "updated_at",
        "fecha_creacion",
        "fecha_actualizacion",
      ];
      if (systemColumns.includes(column.column_name)) return false;//and Nivel=4
*/
      // ✅ AGREGADO: timestamp without time zone
      const dataType = column.data_type || "text";

      const filterableTypes = [
        "text",
        "varchar",
        "character varying",
        "integer",
        "numeric",
        "boolean",
        "date",
        "timestamp",
        "datetime",
        "timestamp without time zone",
        "timestamp with time zone",
      ];

      return filterableTypes.includes(dataType);
    });
  };

  // Actualizar filtro
  const updateFilter = (fieldName, updates) => {
    const newFilters = {
      ...filters,
      [fieldName]: {
        ...filters[fieldName],
        ...updates,
      },
    };

    setFilters(newFilters);
    updateActiveCount(newFilters);
  };

  // Actualizar contador de filtros activos
  const updateActiveCount = (currentFilters = filters) => {
    const count = Object.values(currentFilters).filter(
      (filter) => filter.value && filter.value.trim() !== ""
    ).length;
    setActiveFiltersCount(count);
  };

  // Renderizar input dinámico según operador - ✨ MEJORADO PARA FECHAS
  const renderValueInput = (fieldName, filter) => {
    const column = filter.column || {};
    const operator = filter.operator || "=";
    const value = filter.value || "";
    const dataType = column.data_type || "text";

    // 🗓 CAMPOS DE FECHA - Lógica especial
    const isDateField = [
      "date",
      "timestamp",
      "datetime",
      "timestamp without time zone",
      "timestamp with time zone",
    ].includes(dataType);

    if (isDateField) {
      switch (operator) {
        case "M": // Mes específico
          const meses = [
            { value: "01", label: "Enero" },
            { value: "02", label: "Febrero" },
            { value: "03", label: "Marzo" },
            { value: "04", label: "Abril" },
            { value: "05", label: "Mayo" },
            { value: "06", label: "Junio" },
            { value: "07", label: "Julio" },
            { value: "08", label: "Agosto" },
            { value: "09", label: "Septiembre" },
            { value: "10", label: "Octubre" },
            { value: "11", label: "Noviembre" },
            { value: "12", label: "Diciembre" },
          ];

          return (
            <div className="flex items-center space-x-2 flex-1">
              <select
                value={value}
                onChange={(e) =>
                  updateFilter(fieldName, { value: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm flex-1"
              >
                <option value="">Seleccionar mes...</option>
                {meses.map((mes) => (
                  <option key={mes.value} value={mes.value}>
                    {mes.label}
                  </option>
                ))}
              </select>
            </div>
          );

        case "between": // Rango de fechas
          const values = value ? value.split(" - ") : ["", ""];
          return (
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                value={values[0] || ""}
                onChange={(e) =>
                  updateFilter(fieldName, {
                    value: `${e.target.value} - ${values[1] || ""}`,
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />

              <span className="text-gray-400 text-sm font-bold">→</span>

              <input
                type="date"
                value={values[1].split(" 23:59:59")[0] || ""}
                onChange={(e) =>
                  updateFilter(fieldName, {
                    value: `${values[0] || ""} - ${e.target.value} 23:59:59`,
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          );

        case "between_same_day": // Fecha exacta
        default:
          const values2 = value ? value.split(" - ") : ["", ""];
          return (
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                value={values2[0] || ""}
                onChange={(e) =>
                  updateFilter(fieldName, {
                    value: `${e.target.value} - ${e.target.value} 23:59:59`,
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm flex-1"
              />
            </div>
          );
      }
    }

    //usar select si es boolean
    if (dataType === "boolean") {
      //console.log("--------------------> formFilterBoolean");
      //className={`${column.column_name.includes(campoEstaBorrado) && access_level !== "4" ? "hidden" : ""}`}
      if (fieldName.includes(campoEstaBorrado) && access_level !== "4")
        return null;
      return (
        <select
          value={value}
          onChange={(e) => updateFilter(fieldName, { value: e.target.value })}
          className="select1"
        >
          <option value="">Seleccionar...</option>
          <option value="true">☑ Si</option>
          <option value="false">◻ No</option>
        </select>
      );
    }

    // 🚀 NUEVA LÓGICA: Verificar si es foreign key
    const isForeignKey = schema.foreignKeys?.some(
      (fk) => fk.column_name === column.column_name
    );
    if (isForeignKey) {
      return renderForeignKeyField(
        column,
        value,
        //error,
        //isRequired,
        getColumnDisplayName(fieldName)
      );
    }

    // 🔢 CAMPOS: NUMÉRICO o TEXTO
    const inputType =
      dataType === "integer" || dataType === "numeric" ? "number" : "text";

    return (
      <input
        type={inputType}
        value={value}
        onChange={(e) => updateFilter(fieldName, { value: e.target.value })}
        placeholder={`(${dataType}>${inputType}) Filtrar por ${getColumnDisplayName(fieldName).toLowerCase()}...`}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm flex-1"
      />
    );
  };

  // Construir query para el backend
  const buildFilterQuery = () => {
    const activeFilters = {};
    const connectors = [];

    Object.entries(filters).forEach(([fieldName, filter]) => {
      if (filter.value && filter.value.trim() !== "") {
        activeFilters[fieldName] = {
          operator: filter.operator,
          value: filter.value,
          value2: filter.value2 || null,
        };

        if (filter.connector) {
          connectors.push({
            field: fieldName,
            connector: filter.connector,
          });
        }
      }
    });

    return {
      filters: activeFilters,
      connectors: connectors,
    };
  };

  // Aplicar filtros
  const handleApplyFilters = () => {
    const filterQuery = buildFilterQuery();
    onApplyFilters(filterQuery);
    onClose();
  };

  // Limpiar todos los filtros
  const handleClearFilters = () => {
    const clearedFilters = { ...filters };
    Object.keys(clearedFilters).forEach((key) => {
      clearedFilters[key] = {
        ...clearedFilters[key],
        value: "",
        value2: "",
      };
    });

    setFilters(clearedFilters);
    setActiveFiltersCount(0);
    onApplyFilters({});
    onClose();
  };

  const filterableColumns = getFilterableColumns();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      iconType="fa-solid fa-filter"
      title={`Filtros de búsqueda para ${tableName}`}
      className={
        schema &&
        schema.columns.length <=
          Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_SM)
          ? "w-[88%] md:w-[68%] lg:w-[48%] fondoVentanaForm fondoVentanaForm-center min-h-3/12"
          : schema &&
              schema.columns.length <=
                Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_MD)
            ? "w-[98%] md:w-[78%] lg:w-[68%] fondoVentanaForm-center min-h-3/12"
            : "fondoVentanaForm-width fondoVentanaForm-center min-h-3/12"
      }
      resizable={true}
      noModal={false}
    >
      <div className="space-y-1">
        {/* Lista de filtros max-h-[calc(100vh-135px)]   */}
        <div className="max-h-[78vh] overflow-y-auto space-y-3">
          <div
            className={
              filterableColumns.length <=
              Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_SM)
                ? "grid1col"
                : filterableColumns.length <=
                    Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_MD)
                  ? "grid2cols"
                  : "grid3cols"
            }
          >
            {filterableColumns.length > 0 ? (
              filterableColumns.map((column, index) => {
                if (!column || !column.column_name) {
                  return null;
                }

                if (
                  column.column_name.includes(campoEstaBorrado) &&
                  access_level !== "4"
                )
                  return null;

                const fieldName = column.column_name;
                const filter = filters[fieldName] || {};
                const operators = getOperators(column.data_type || "text");
                const hasValue = filter.value && filter.value.trim() !== "";
                const isLastField = index === filterableColumns.length - 2;

                return (
                  <div key={fieldName} className="mb-2">
                    <div className="flex flex-row items-center">
                      {/* Nombre del Campo */}
                      <span className="lbl">
                        {getColumnDisplayName(
                          column.column_name,
                          column.column_desc
                        )}
                      </span>
                      {/* Selector de Operador */}

                      <select
                        value={
                          filter.operator ||
                          getDefaultOperator(column.data_type || "text")
                        }
                        onChange={(e) =>
                          updateFilter(fieldName, {
                            operator: e.target.value,
                            value: "",
                            value2: "",
                          })
                        }
                        className="select2 font-bold ml-1.5"
                      >
                        {operators.map((op) => (
                          <option
                            key={op.value}
                            value={op.value}
                            title={op.title}
                          >
                            {op.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Input de Valor */}
                    <div className="flex items-center">
                      {renderValueInput(fieldName, filter)}

                      {/* Selector AND/OR */}
                      <div className="flex items-center">
                        {!isLastField ? (
                          <select
                            value={filter.connector || "AND"}
                            onChange={(e) =>
                              updateFilter(fieldName, {
                                connector: e.target.value,
                              })
                            }
                            className="select2 font-bold ml-1.5 text-xs w-min-52"
                            disabled={fieldName===campoEstaBorrado}
                          >
                            <option value="AND">Y</option>
                            <option value="OR">O</option>
                          </select>
                        ) : (
                          <span>&nbsp;&nbsp;&nbsp;</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-2 block">📋</span>
                <p>No hay campos filtrables disponibles</p>
              </div>
            )}
          </div>
        </div>

        {/* Vista previa de filtros activos */}
        {access_level == "4" && activeFiltersCount > 0 && (
          <div className="p-1 bg-green-50 border border-green-200 rounded-lg text-xs">
            <h5 className=" text-gray-500 mb-0">Filtros activos:</h5>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)
                .filter(
                  ([_, filter]) => filter.value && filter.value.trim() !== ""
                )
                .map(([fieldName, filter], index, array) => (
                  <div key={fieldName} className="flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded ">
                      <strong>{fieldName}</strong>{" "}
                      {getOperators(filter.column?.data_type || "text").find(
                        (op) => op.value === filter.operator
                      )?.label || filter.operator}{" "}
                      <em>{filter.value}</em>
                    </span>
                    {index < array.length - 1 && (
                      <span className="text-green-600 font-bold mx-2">
                        {filter.connector === "OR" ? "O" : "Y"}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Footer con botones */}
        <div className="pt-1 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={handleApplyFilters}
              disabled={activeFiltersCount === 0}
              className="btn1"
            >
              <i className="fa-solid fa-filter mr-1.5"></i>
              <span>Aplicar Filtros</span>
            </button>

            <button onClick={handleClearFilters} className="btn2">
              <i className="fa-solid fa-xmark mr-1.5"></i>
              <span>Limpiar filtros</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FormStyleFiltersModal;
