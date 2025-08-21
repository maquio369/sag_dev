// src/components/RecordForm.jsx - Con layout 2x2 para los campos
import react, { useState, useEffect, useRef } from "react";
import apiService from "../services/api";
import { getColumnDisplayName } from "@/utils/util";
import SubmitBtn from "./elements/SubmitBtn";

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

type ForeignKey = {
  column_name: string;
};

type Schema = {
  columns: SchemaColumn[];
  foreignKeys?: ForeignKey[];
};

type RecordFormProps = {
  tableName: string;
  schema: Schema;
  record?: Record<string, any> | null;
  onSave: (data: Record<string, any>) => void;
  onCancel: () => void;
  isLoading?: boolean;
  level?: string;
  titleName: string;
};

const RecordForm = ({
  tableName,
  schema,
  record = null,
  onSave,
  onCancel,
  isLoading = false,
  level,
  titleName,
}: RecordFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [foreignKeyOptions, setForeignKeyOptions] = useState<{
    [key: string]: any[];
  }>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loadingOptions, setLoadingOptions] = useState(false);

  const campoEstaBorrado = process.env.NEXT_PUBLIC_DELETED_COLUMN_NAME;
  let hasFocus = true;

  const isEdit = !!record;

  useEffect(() => {
  initializeForm();
  
  // Validación más robusta para foreign keys
  if (schema && Array.isArray(schema.foreignKeys) && schema.foreignKeys.length > 0) {
    console.log("Cargando opciones FK para RecordForm:", schema.foreignKeys);
    loadForeignKeyOptions();
  } else {
    console.log("No se requiere cargar opciones FK en RecordForm");
  }
}, [schema, record, tableName, level]);

  const initializeForm = () => {
    const initialData: Record<string, any> = {};

    schema.columns.forEach((column) => {
      if (isEdit && record) {
        // Modo edición: usar datos del registro
        initialData[column.column_name] = record[column.column_name] ?? "";
      } else {
        // Modo creación: valores por defecto
        if (column.is_primary_key && column.is_identity) {
          // Primary key auto-increment: no incluir
          return;
        }

        if (column.column_default) {
          if (column.data_type === "boolean") {
            initialData[column.column_name] = column.column_default === "true";
          } else {
            initialData[column.column_name] = column.column_default;
          }
        } else if (column.data_type === "boolean") {
          initialData[column.column_name] = false;
        } else {
          initialData[column.column_name] = "";
        }
      }
    });

    setFormData(initialData);
  };

  const loadForeignKeyOptions = async () => {
  // Validación inicial más robusta
  if (!schema || !schema.foreignKeys || schema.foreignKeys.length === 0) {
    console.log("No hay foreign keys para cargar");
    return;
  }

  setLoadingOptions(true);
  const options: { [key: string]: any } = {};

  try {
    const promises = schema.foreignKeys.map(async (fk) => {
      try {
        // Validar que fk y fk.column_name existan
        if (!fk || !fk.column_name) {
          console.warn("Foreign key inválida:", fk);
          return;
        }

        const response = await apiService.getForeignKeyOptions(
          tableName,
          fk.column_name
        );

        // Validar la estructura de la respuesta
        if (response?.data?.data?.options) {
          options[fk.column_name] = response.data.data.options;
          console.log(`Opciones cargadas para ${fk.column_name}:`, response.data.data.options);
        } else {
          console.warn(`Estructura de respuesta inválida para ${fk.column_name}:`, response);
          options[fk.column_name] = [];
        }

      } catch (error) {
        console.error(`Error cargando opciones para ${fk.column_name}:`, error);
        options[fk.column_name] = [];
      }
    });

    await Promise.all(promises);
    setForeignKeyOptions(options);
  } catch (error) {
    console.error("Error general cargando opciones FK:", error);
  } finally {
    setLoadingOptions(false);
  }
};

  const handleInputChange = (columnName: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [columnName]: value,
    }));

    // Limpiar error del campo al cambiar el valor
    if (errors[columnName]) {
      setErrors((prev) => ({
        ...prev,
        [columnName]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    schema.columns.forEach((column) => {
      const value = formData[column.column_name];

      // Skip auto-increment primary keys
      if (column.is_primary_key && column.is_identity) {
        // Primary key auto-increment: no incluir
        return;
      }

      // Required field validation
      if (column.is_nullable === "NO" && !column.column_default) {
        if (value === null || value === undefined || value === "") {
          newErrors[column.column_name] = `${column.column_name} es requerido`;
        }
      }

      // Type validation
      if (value !== null && value !== undefined && value !== "") {
        if (column.data_type === "integer") {
          const numValue = Number(value);
          if (!Number.isInteger(numValue)) {
            newErrors[column.column_name] = "Debe ser un número entero";
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Preparar datos para envío
    const dataToSend: Record<string, any> = {};

    schema.columns.forEach((column) => {
      const value = formData[column.column_name];

      // Skip auto-increment primary keys in create mode
      if (!isEdit && column.is_primary_key && column.is_identity) {
        // Primary key auto-increment: no incluir
        return;
      }

      // Skip primary key in edit mode
      if (isEdit && column.is_primary_key) {
        return;
      }

      // Only include non-empty values
      if (value !== null && value !== undefined && value !== "") {
        if (column.data_type === "integer") {
          dataToSend[column.column_name] = parseInt(value);
        } else if (column.data_type === "boolean") {
          dataToSend[column.column_name] = Boolean(value);
        } else {
          dataToSend[column.column_name] = value;
        }
      } else if (column.data_type === "boolean") {
        dataToSend[column.column_name] = Boolean(value);
      }
    });

    onSave(dataToSend);
  };

  // 🎯 FUNCIÓN PARA RENDERIZAR CAMPOS DE FOREIGN KEY
  const renderForeignKeyField = (
    column: SchemaColumn,
    value: any,
    error: string | null,
    isRequired: boolean,
    displayName: string
  ) => {
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

    return (
      <div className="mb-2">
        <label className="lbl" htmlFor={column.column_name}>
          <div className="flex items-center space-x-0">
            <span className="pr-0.5">{column.is_primary_key ? "🔑 " : ""}</span>{" "}
            <span>{displayName}</span>
            {isRequired && <span className="text-TextoLblErrorDark">*</span>}
          </div>
        </label>

        <select
          id={column.column_name}
          name={
            !isEdit || (hasFocus && column.is_primary_key === false)
              ? "firstCtrl" + titleName.replace("", "")
              : column.column_name
          }
          value={value}
          onChange={(e) =>
            handleInputChange(
              column.column_name,
              e.target.value ? parseInt(e.target.value) : ""
            )
          }
          className="select1"
          required={isRequired}
          disabled={loadingOptions || (column.is_primary_key && isEdit)}
        >
          <option
            value=""
            className="text-textoSeparadorDark dark:text-textoEtiqueta"
          >
            {loadingOptions
              ? "Cargando opciones..."
              : isRequired
                ? `(Seleccione ${displayName.toLowerCase()})`
                : "≡"}
          </option>
          {foreignKeyOptions[column.column_name]?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-sm text-TextoLblError flex items-center space-x-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  };

  // 🎯 FUNCIÓN PRINCIPAL ACTUALIZADA PARA RENDERIZAR CAMPOS
  const renderField = (column: any, hasFocus: boolean) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        console.log("------------------------>", inputRef.current.name);
      }
    }, []); // Empty dependency array ensures it runs only on mount

    const value = formData[column.column_name] ?? "";
    const error = errors[column.column_name];
    const isRequired = column.is_nullable === "NO" && !column.column_default;
    const columnDisplayName = getColumnDisplayName(
      column.column_name,
      column.column_desc
    );

    // Skip auto-increment primary keys
    if (!isEdit && column.is_primary_key && column.is_identity) {
      // Primary key auto-increment: no incluir
      return null;
    }

    // primary key ReadOnly in edit mode (mostrar como disabled)
    if (isEdit && column.is_primary_key && !column.is_foreign_key) {
      //|| column.is_identity
      return (
        <div className="mb-2">
          <label className="lbl" htmlFor={column.column_name}>
            <div className="">
              <span className="pr-0.5">
                {column.is_foreign_key ? "🔐" : "🔑"}
              </span>
              <span>{columnDisplayName}</span>
            </div>
          </label>

          <input
            type="text"
            id={column.column_name}
            name={column.column_name}
            value={value}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
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
        error,
        isRequired,
        columnDisplayName
      );
    }

    // Resto de campos normales...
    const baseInputClasses =
      "w-full"; /*`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
      error ? "border-red-500 bg-red-50" : "border-gray-300"
    }`;*/

    // Boolean field
    if (column.data_type === "boolean") {
      return (
        <div
          className="mb-2"
          hidden={column.column_name === campoEstaBorrado && level !== "4"}
        >
          <label className="lbl" htmlFor={column.column_name}>
            {column.column_desc}
            <div className="flex items-center space-x-2 mt-1 ml-1">
              <input
                type="checkbox"
                id={column.column_name}
                name={
                  hasFocus
                    ? "firstCtrl" + titleName.replace("", "")
                    : column.column_name
                }
                className="focus:ring-2 focus:ring-offset-2 focus:ring-bordeControlHover ring-rounded-md"
              ></input>
            </div>
          </label>

          {error && (
            <p className="text-sm text-TextoLblError flex items-center space-x-1">
              <span>⚠️</span>
              <span>{error}</span>
            </p>
          )}
        </div>
      );
    }

    // Date/DateTime fields
    if (column.data_type === "date" || column.data_type === "timestamp") {
      return (
        <div className="mb-2">
          <label className="lbl" htmlFor={column.column_name}>
            <div className="flex items-center space-x-2">
              <span className="text-indigo-600">📅</span>
              <span>{columnDisplayName}</span>
              {isRequired && <span className="text-TextoLblErrorDark">*</span>}
            </div>
          </label>
          <input
            id={column.column_name}
            name={
              hasFocus
                ? "firstCtrl" + titleName.replace("", "")
                : column.column_name
            }
            type={column.data_type === "date" ? "date" : "datetime-local"}
            value={value}
            onChange={(e) =>
              handleInputChange(column.column_name, e.target.value)
            }
            className={baseInputClasses}
            required={isRequired}
          />
          {error && (
            <p className="text-sm text-TextoLblError flex items-center space-x-1">
              <span>⚠️</span>
              <span>{error}</span>
            </p>
          )}
        </div>
      );
    }

    // Text area for long text fields
    if (
      column.character_maximum_length > 200 ||
      column.column_name.toLowerCase().includes("descripcion") ||
      column.column_name.toLowerCase().includes("comentario") ||
      column.column_name.toLowerCase().includes("nota") ||
      column.column_name.toLowerCase().includes("observacion") ||
      column.column_name.toLowerCase().includes("objetivo")
    ) {
      return (
        <div className="mb-2">
          <label className="lbl" htmlFor={column.column_name}>
            <div className="flex items-center space-x-2">
              <span>{columnDisplayName}</span>
              {isRequired && <span className="text-TextoLblErrorDark">*</span>}
            </div>
          </label>
          <textarea
            id={column.column_name}
            name={
              hasFocus
                ? "firstCtrl" + titleName.replace("", "")
                : column.column_name
            }
            value={value}
            onChange={(e) =>
              handleInputChange(column.column_name, e.target.value)
            }
            /*rows={4}*/
            className={baseInputClasses + " h-17"}
            placeholder={
              isRequired ? `Ingrese ${columnDisplayName.toLowerCase()}...` : ""
            }
            required={isRequired}
          />
          {error && (
            <p className="text-sm text-TextoLblError flex items-center space-x-1">
              <span>⚠️</span>
              <span>{error}</span>
            </p>
          )}
        </div>
      );
    }

    // Regular input field
    const inputType =
      column.data_type === "integer"
        ? "number"
        : column.column_name.toLowerCase().includes("correo") ||
            column.column_name.toLowerCase().includes("email")
          ? "email"
          : column.column_name.toLowerCase().includes("telefono")
            ? "tel"
            : column.column_name.toLowerCase().includes("password") ||
                column.column_name.toLowerCase().includes("contraseña")
              ? "password"
              : "text";

    return (
      <div className="mb-2">
        <label className="lbl" htmlFor={column.column_name}>
          <div className="flex items-center space-x-2">
            <span>{columnDisplayName}</span>
            {isRequired && <span className="text-TextoLblErrorDark">*</span>}
          </div>
        </label>
        <input
          type={inputType}
          id={column.column_name}
          name={
            hasFocus
              ? "firstCtrl" + titleName.replace("", "")
              : column.column_name
          }
          value={value}
          onChange={(e) =>
            handleInputChange(column.column_name, e.target.value)
          }
          className={baseInputClasses}
          placeholder={
            isRequired ? `Ingrese ${columnDisplayName.toLowerCase()}...` : ""
          }
          required={isRequired}
          min={inputType === "number" ? 0 : undefined}
          autoFocus={hasFocus}
        />
        {error && (
          <p className="text-sm text-TextoLblError flex items-center space-x-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  };

  // 🎯 FILTRAR COLUMNAS VISIBLES (excluir auto-increment PKs) max-h-[calc(100vh-160px)]  max-h-[78vh]
  const visibleColumns = schema.columns.filter((column: any) => {
    // En modo creación, excluir auto-increment primary keys
    if (!isEdit && column.is_primary_key && column.is_identity) {
      // Primary key auto-increment: no incluir
      return false;
    }
    return true;
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-1">
      <div className="pr-2 max-h-[78vh] overflow-y-auto ">
        <div
          className={
            visibleColumns.length <=
            Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_SM)
              ? "grid1col"
              : visibleColumns.length <=
                  Number(process.env.NEXT_PUBLIC_COLUMNS_LENGTH_MD)
                ? "grid2cols"
                : "grid3cols"
          }
        >
          {(hasFocus = true)}
          {visibleColumns.map((column: any) => (
            <div key={column.column_name}>
              <div key={column.column_name}>
                {renderField(column, hasFocus)}
              </div>
              {(hasFocus = column.is_primary_key)}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-fondoTransparenteObscuroBoton dark:border-textoSeparadorDark pt-1.5">
        <SubmitBtn.Save className="" isPending={isLoading} />
      </div>
    </form>
  );
};

export default RecordForm;
