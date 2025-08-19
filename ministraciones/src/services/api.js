require('dotenv').config();
import axios from "axios";

// Configuración desde variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE+'/api';
const CONNECTION_TIMEOUT =  10000;
const IS_DEV_MODE = process.env.MODE === 'DEV';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: CONNECTION_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging en desarrollo
api.interceptors.request.use(
  (config) => {
    if (IS_DEV_MODE) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
        headers: config.headers
      });
    }
    return config;
  },
  (error) => {
    if (IS_DEV_MODE) {
      console.error('❌ API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (IS_DEV_MODE) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
        timing: response.headers['x-response-time']
      });
    }
    return response;
  },
  (error) => {
    if (IS_DEV_MODE) {
      console.error('❌ API Response Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
        method: error.config?.method
      });
    }

    // Manejar errores de conexión
    if (error.code === 'ECONNABORTED') {
      error.message = 'Tiempo de espera agotado. Verifica la conexión con el servidor.';
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      error.message = 'Error de conexión. Verifica que el servidor backend esté ejecutándose.';
    } else if (error.response?.status >= 500) {
      error.message = 'Error interno del servidor. Intenta nuevamente más tarde.';
    }

    return Promise.reject(error);
  }
);

// Función para reintentar requests automáticamente
const retryRequest = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (IS_DEV_MODE) {
        console.warn(`🔄 Retry attempt ${i + 1}/${maxRetries} for failed request`);
      }
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
};

// Mapeo de tablas a endpoints existentes
const ENDPOINT_MAP = {
  'usuarios': {
    findAll: '/usuarios/findAll',
    find: '/usuarios/find',
    save: '/usuarios/save',
    delete: '/usuarios/softDelete'
  },
  'sistemas': {
    findAll: '/sistemas/findAll',
    find: '/sistemas/find',
    save: '/sistemas/save',
    delete: '/sistemas/softDelete'
  },
  'roles': {
    findAll: '/roles/findAll',
    find: '/roles/find',
    save: '/roles/save',
    delete: '/roles/softDelete'
  },
  'productos': {
    findAll: '/productos/findAll',
    find: '/productos/find',
    save: '/productos/save',
    delete: '/productos/softDelete'
  },
  'requisiciones': {
    findAll: '/requisiciones/findAll',
    find: '/requisiciones/find',
    save: '/requisiciones/save',
    delete: '/requisiciones/softDelete'
  },
  'areas': {
    findAll: '/areas/findAll',
    find: '/areas/find',
    save: '/areas/save',
    delete: '/areas/softDelete'
  },
  'puestos': {
    findAll: '/puestos/findAll',
    find: '/puestos/find',
    save: '/puestos/save',
    delete: '/puestos/softDelete'
  },
  'categorias': {
    findAll: '/categorias/findAll',
    find: '/categorias/find',
    save: '/categorias/save',
    delete: '/categorias/softDelete'
  },
  'unidades_de_medida': {
    findAll: '/unidades_de_medida/findAll',
    find: '/unidades_de_medida/find',
    save: '/unidades_de_medida/save',
    delete: '/unidades_de_medida/softDelete'
  }
};

// Esquemas básicos para cada tabla
const TABLE_SCHEMAS = {
  usuarios: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'email', data_type: 'varchar' },
      { column_name: 'rol_id', data_type: 'integer', is_foreign_key: true, reference_table: 'roles' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  sistemas: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'descripcion', data_type: 'text' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  roles: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'permisos', data_type: 'json' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  productos: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'descripcion', data_type: 'text' },
      { column_name: 'categoria_id', data_type: 'integer', is_foreign_key: true, reference_table: 'categorias' },
      { column_name: 'unidad_medida_id', data_type: 'integer', is_foreign_key: true, reference_table: 'unidades_de_medida' },
      { column_name: 'precio', data_type: 'decimal' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  requisiciones: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'folio', data_type: 'varchar' },
      { column_name: 'usuario_id', data_type: 'integer', is_foreign_key: true, reference_table: 'usuarios' },
      { column_name: 'area_id', data_type: 'integer', is_foreign_key: true, reference_table: 'areas' },
      { column_name: 'fecha_solicitud', data_type: 'date' },
      { column_name: 'estado', data_type: 'varchar' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  areas: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'descripcion', data_type: 'text' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  puestos: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'area_id', data_type: 'integer', is_foreign_key: true, reference_table: 'areas' },
      { column_name: 'descripcion', data_type: 'text' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  categorias: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'descripcion', data_type: 'text' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  },
  unidades_de_medida: {
    columns: [
      { column_name: 'id', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombre', data_type: 'varchar' },
      { column_name: 'abreviacion', data_type: 'varchar' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id'
  }
};

// Servicios de API - Redirección a endpoints existentes
export const apiService = {
  // Mapear rutas /tables/ a rutas existentes
  getTables: () => {
    return Promise.resolve({
      data: Object.keys(ENDPOINT_MAP)
    });
  },
  
  getTableSchema: (tableName) => {
    const schema = TABLE_SCHEMAS[tableName];
    if (!schema) {
      return Promise.reject(new Error(`Schema for table ${tableName} not found`));
    }
    return Promise.resolve({ data: schema });
  },
  
  // REDIRECCIONAR a endpoints existentes
  getRecords: (tableName, params = {}) => {
    const tableEndpoints = ENDPOINT_MAP[tableName];
    if (!tableEndpoints) {
      return Promise.reject(new Error(`Table ${tableName} not found`));
    }
    
    // Validar parámetros
    const validatedParams = {
      ...params,
      limit: Math.min(params.limit || 50, 200), // Máximo 200 registros
      page: Math.max(params.page || 1, 1), // Mínimo página 1
    };
    
    // Llamar al endpoint existente y formatear respuesta
    return api.get(tableEndpoints.findAll, { params: validatedParams }).then(response => {
      // Formatear para que coincida con lo que espera el frontend
      const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
      return {
        data: {
          data: data,
          pagination: {
            page: validatedParams.page,
            limit: validatedParams.limit,
            total: data.length,
            totalPages: Math.ceil(data.length / validatedParams.limit),
            hasNext: false,
            hasPrev: validatedParams.page > 1
          }
        }
      };
    });
  },
  
  getRecord: (tableName, id, params = {}) => {
    if (!id) throw new Error('ID is required');
    
    const tableEndpoints = ENDPOINT_MAP[tableName];
    if (!tableEndpoints) {
      return Promise.reject(new Error(`Table ${tableName} not found`));
    }
    
    return api.get(`${tableEndpoints.find}/${encodeURIComponent(id)}`, { params });
  },
  
  createRecord: (tableName, data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Valid data object is required');
    }
    
    const tableEndpoints = ENDPOINT_MAP[tableName];
    if (!tableEndpoints) {
      return Promise.reject(new Error(`Table ${tableName} not found`));
    }
    
    return api.post(tableEndpoints.save, data);
  },
  
  updateRecord: (tableName, id, data) => {
    if (!id) throw new Error('ID is required');
    if (!data || typeof data !== 'object') {
      throw new Error('Valid data object is required');
    }
    
    const tableEndpoints = ENDPOINT_MAP[tableName];
    if (!tableEndpoints) {
      return Promise.reject(new Error(`Table ${tableName} not found`));
    }
    
    // Incluir el ID en los datos para la actualización
    return api.post(tableEndpoints.save, { ...data, id });
  },
  
  deleteRecord: (tableName, id) => {
    if (!id) throw new Error('ID is required');
    
    const tableEndpoints = ENDPOINT_MAP[tableName];
    if (!tableEndpoints) {
      return Promise.reject(new Error(`Table ${tableName} not found`));
    }
    
    return api.delete(`${tableEndpoints.delete}/${encodeURIComponent(id)}`);
  },
  
  // Utilidades adaptadas
  getForeignKeyOptions: (tableName, columnName) => {
    if (!tableName || !columnName) {
      throw new Error('Table name and column name are required');
    }
    
    const schema = TABLE_SCHEMAS[tableName];
    if (!schema) {
      return Promise.reject(new Error(`Schema for table ${tableName} not found`));
    }
    
    const column = schema.columns.find(col => col.column_name === columnName);
    if (!column || !column.is_foreign_key) {
      return Promise.reject(new Error(`Column ${columnName} is not a foreign key`));
    }
    
    // Obtener opciones de la tabla referenciada
    const referenceTable = column.reference_table;
    return this.getRecords(referenceTable).then(response => {
      return {
        data: response.data.data.map(item => ({
          value: item.id,
          label: item.nombre || item.name || `ID: ${item.id}`
        }))
      };
    });
  },
  
  validateData: (tableName, data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Valid data object is required');
    }
    
    const schema = TABLE_SCHEMAS[tableName];
    if (!schema) {
      return Promise.reject(new Error(`Schema for table ${tableName} not found`));
    }
    
    // Validación básica del lado cliente
    const errors = [];
    const requiredColumns = schema.columns.filter(col => 
      !col.is_primary_key && col.column_name !== 'esta_borrado'
    );
    
    requiredColumns.forEach(col => {
      if (col.column_name === 'nombre' && !data[col.column_name]) {
        errors.push(`${col.column_name} is required`);
      }
    });
    
    if (errors.length > 0) {
      return Promise.reject(new Error(`Validation errors: ${errors.join(', ')}`));
    }
    
    return Promise.resolve({ data: { valid: true } });
  },
  
  searchRecords: (tableName, searchData) => {
    if (!searchData || typeof searchData !== 'object') {
      throw new Error('Valid search data is required');
    }
    
    // Por ahora, usar getRecords con filtros básicos
    return this.getRecords(tableName, searchData);
  },

  // Método para verificar la salud del backend
  healthCheck: () => {
    const healthUrl = process.env.NEXT_PUBLIC_API_BASE+'/health';
    return axios.get(healthUrl, { timeout: 5000 });
  },

  // Métodos de conveniencia para manejo de errores
  handleApiError: (error, customMessage = '') => {
    const message = customMessage || error.message || 'Error desconocido';
    
    if (IS_DEV_MODE) {
      console.error('API Error Details:', {
        message,
        status: error.response?.status,
        data: error.response?.data,
        stack: error.stack
      });
    }

    // Retornar un objeto de error estructurado
    return {
      message,
      status: error.response?.status,
      code: error.code,
      isNetworkError: !error.response,
      isServerError: error.response?.status >= 500,
      isClientError: error.response?.status >= 400 && error.response?.status < 500,
      details: error.response?.data
    };
  },

  // Método para cancelar requests
  createCancelToken: () => axios.CancelToken.source(),
  
  // Método para verificar si un error es de cancelación
  isCancel: (error) => axios.isCancel(error)
};

// Función helper para construir URLs de manera segura
export const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, API_BASE_URL);
  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

// Exportar configuración para uso en otros módulos
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: CONNECTION_TIMEOUT,
  isDev: IS_DEV_MODE
};

export default api;
