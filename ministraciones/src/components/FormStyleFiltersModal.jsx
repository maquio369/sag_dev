// frontend/src/components/FormStyleFiltersModal.jsx
import React, { useState, useEffect } from "react";
import Modal from "@/components/elements/Modal";

const FormStyleFiltersModal = ({
  isOpen,
  onClose,
  onApplyFilters,
  schema,
  currentFilters = {},
  tableName,
}) => {
  const [filters, setFilters] = useState({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    if (isOpen && schema) {
      initializeFilters();
    }
  }, [isOpen, schema]);

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
        return "="; // Por defecto "igual a" para fechas
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
          value: "M",
          label: "🗓",
          title: "filtrar por mes",
        },
        {
          value: "between",
          label: "//",
          title: "filtrar por rango de fechas",
        },
        { value: "=", label: "=", title: "filtrar por día" },
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

    // Operadores para texto
    return [
      { value: "=", label: "=", title: "igual a" },
      { value: "like", label: "≈", title: "contiene" },
      { value: "!=", label: "≠", title: "diferente de" },
      { value: ">=", label: "≥", title: "mayor o igual a" },
      { value: "<=", label: "≤", title: "menor o igual a" },
    ];
  };

  // Obtener las columnas filtrables
  const getFilterableColumns = () => {
    if (!schema || !schema.columns) {
      console.warn("Schema o columns no disponible");
      return [];
    }

    return schema.columns.filter((col) => {
      // Validación básica de columna
      if (!col || !col.column_name) {
        console.warn("Columna sin column_name:", col);
        return false;
      }

      //if (col.is_primary_key) return false;

      const systemColumns = [
        "esta_borrado_",
        "created_at",
        "updated_at",
        "fecha_creacion",
        "fecha_actualizacion",
      ];
      if (systemColumns.includes(col.column_name)) return false;//and Nivel=4

      // ✅ AGREGADO: timestamp without time zone
      const dataType = col.data_type || "text";
      console.log(dataType,"<-------herewego-------->",col.data_type);
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

  // Obtener el nombre display de la columna
  const getColumnDisplayName = (columnName) => {
    const translations = {
      nombres: "Nombre",
      apellidos: "Apellidos",
      correo: "Correo Electrónico",
      usuario: "Usuario",
      id_rol: "Rol",
      rol: "Rol",
      esta_borrado: "Estado",
      descripcion: "Descripción",
      activo: "Activo",
      estado: "Estado",
      telefono: "Teléfono",
      direccion: "Dirección",
      fecha_nacimiento: "Fecha de Nacimiento",
      salario: "Salario",
      departamento: "Departamento",
      cargo: "Cargo",
      codigo: "Código",
      nombre: "Nombre",
      precio: "Precio",
      cantidad: "Cantidad",
      categoria: "Categoría",
    };

    return (
      translations[columnName] ||
      columnName.charAt(0).toUpperCase() +
        columnName.slice(1).replace(/_/g, " ")
    );
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
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                📅{" "}
                {value
                  ? meses.find((m) => m.value === value)?.label || "Mes"
                  : "Mes"}
              </div>
            </div>
          );

        case "between": // Rango de fechas
          const values = value ? value.split(" - ") : ["", ""];
          return (
            <div className="flex items-center space-x-2 flex-1">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Desde:</label>
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
              </div>
              <div className="flex items-center justify-center mt-5">
                <span className="text-gray-400 text-sm font-bold">→</span>
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Hasta:</label>
                <input
                  type="date"
                  value={values[1] || ""}
                  onChange={(e) =>
                    updateFilter(fieldName, {
                      value: `${values[0] || ""} - ${e.target.value}`,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          );

        case "=": // Fecha exacta
        default:
          return (
            <div className="flex items-center space-x-2 flex-1">
              <input
                type="date"
                value={value}
                onChange={(e) =>
                  updateFilter(fieldName, { value: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm flex-1"
              />
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {operator === "="
                  ? "📅 Exacta"
                  : operator === ">="
                    ? "📅 Desde"
                    : operator === "<="
                      ? "📅 Hasta"
                      : "📅"}
              </div>
            </div>
          );
      }
    }
console.log(column.data_type,dataType);
    if (dataType === "boolean") {
      console.log("--------------------> formFilterBoolean");

      return (
        <input
          type="checked"
          //value={value}
          onChange={(e) => updateFilter(fieldName, { value: e.target.checked })}
          //placeholder={`Filtrar por ${getColumnDisplayName(fieldName).toLowerCase()}...`}
          className="focus:ring-2 focus:ring-offset-2 focus:ring-bordeControlHover ring-rounded-md"
        />
      );
    }

    // 🔢 CAMPOS NUMÉRICOS
    const inputType =
      dataType === "integer" || dataType === "numeric"
        ? "number"
        : dataType === "boolean"
          ? "checkbox"
          : "text";

    return (
      <input
        type={inputType}
        value={value}
        onChange={(e) => updateFilter(fieldName, { value: e.target.value })}
        placeholder={`Filtrar por ${getColumnDisplayName(fieldName).toLowerCase()}...`}
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
                  : "grid3col"
            }
          >
            {filterableColumns.length > 0 ? (
              filterableColumns.map((column, index) => {
                if (!column || !column.column_name) {
                  return null;
                }

                const fieldName = column.column_desc ?? column.column_name;
                const filter = filters[fieldName] || {};
                const operators = getOperators(column.data_type || "text");
                const hasValue = filter.value && filter.value.trim() !== "";
                const isLastField = index === filterableColumns.length - 1;

                return (
                  <div key={fieldName} className="mb-2">
                    <div className="flex flex-row items-center">
                      {/* Nombre del Campo */}
                      <span className="lbl">{fieldName}</span>
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
