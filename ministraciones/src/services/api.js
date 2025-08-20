require('dotenv').config();
import axios from "axios";

// MANTENER: /api en el base URL
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

// Interceptores... (mantener igual)
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

// MAPEO CORREGIDO: Sin /api porque ya está en baseURL
const ENDPOINT_MAP = {
  'usuarios': '/usuarios',              // ✅ Sin /api
  'sistemas': '/sistemas',              // ✅ Sin /api
  'roles': '/roles',
  'productos': '/productos',
  'requisiciones': '/requisiciones',
  'areas': '/areas',
  'puestos': '/puestos',
  'categorias': '/categorias',
  'unidades_de_medida': '/unidades_de_medida'
};

// Esquemas (mantener igual)
const TABLE_SCHEMAS = {
  usuarios: {
    columns: [
      { column_name: 'id_usuario', data_type: 'integer', is_primary_key: true },
      { column_name: 'nombres', data_type: 'varchar', is_nullable: 'NO' },
      { column_name: 'apellidos', data_type: 'varchar', is_nullable: 'NO' },
      { column_name: 'correo', data_type: 'varchar' },
      { column_name: 'usuario', data_type: 'varchar' },
      { column_name: 'contraseña', data_type: 'varchar' },
      { column_name: 'id_rol', data_type: 'integer' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id_usuario'
  },
  sistemas: {
    columns: [
      { column_name: 'id_sistema', data_type: 'integer', is_primary_key: true },
      { column_name: 'sistema', data_type: 'varchar', is_nullable: 'NO' },
      { column_name: 'descripcion', data_type: 'text' },
      { column_name: 'esta_borrado', data_type: 'boolean' }
    ],
    primaryKey: 'id_sistema'
  },
  // ... resto de esquemas
};

// Servicios de API - CORREGIDOS
export const apiService = {
  getTables: () => {
    return Promise.resolve({
      data: {
        data: [
          'sistemas', 'usuarios', 'roles', 'productos', 'requisiciones',
          'areas', 'puestos', 'categorias', 'unidades_de_medida'
        ]
      }
    });
  },

  getTableSchema: (tableName) => {
    console.log(`🔍 Getting schema for: ${tableName}`);
    
    const schema = TABLE_SCHEMAS[tableName] || {
      columns: [
        { column_name: 'id', data_type: 'integer', is_primary_key: true },
        { column_name: 'nombre', data_type: 'varchar' }
      ],
      primaryKey: 'id'
    };
    
    console.log(`✅ Schema for ${tableName}:`, schema);
    return Promise.resolve({ data: schema });
  },
  
  // CORREGIDO: URLs sin /api duplicado
  getRecords: (tableName, params = {}) => {
    const endpointMap = {
      'usuarios': '/usuarios/findAll',     // ✅ Sin /api
      'sistemas': '/sistemas/findAll',     // ✅ Sin /api
      'roles': '/roles/findAll',
      'productos': '/productos/findAll'
    };

    const endpoint = endpointMap[tableName];
    if (!endpoint) {
      return Promise.reject(new Error(`Table ${tableName} not found`));
    }

    console.log(`🚀 Calling endpoint: ${API_BASE_URL}${endpoint}`);
    // Esto generará: http://172.16.35.75:3011/api/sistemas/findAll ✅

    return api.get(endpoint, { params }).then(response => {
      return {
        data: {
          data: response.data,
          pagination: {
            page: 1,
            limit: 50,
            total: response.data?.length || 0,
            totalPages: 1,
            hasNext: false,
            hasPrev: false
          }
        }
      };
    });
  },

  // Otros métodos corregidos
  getRecord: (tableName, id, params = {}) => {
    const endpointMap = {
      'usuarios': `/usuarios/find/${id}`,
      'sistemas': `/sistemas/find/${id}`,
      'roles': `/roles/find/${id}`
    };
    const endpoint = endpointMap[tableName];
    return endpoint ? api.get(endpoint, { params }) : Promise.reject(new Error('Not found'));
  },

  createRecord: (tableName, data) => {
    const endpointMap = {
      'usuarios': '/usuarios/save',
      'sistemas': '/sistemas/save',
      'roles': '/roles/save'
    };
    const endpoint = endpointMap[tableName];
    return endpoint ? api.post(endpoint, data) : Promise.reject(new Error('Not found'));
  },

  updateRecord: (tableName, id, data) => {
    return this.createRecord(tableName, { ...data, id });
  },

  deleteRecord: (tableName, id) => {
    const endpointMap = {
      'usuarios': `/usuarios/softDelete/${id}`,
      'sistemas': `/sistemas/softDelete/${id}`,
      'roles': `/roles/softDelete/${id}`
    };
    const endpoint = endpointMap[tableName];
    return endpoint ? api.delete(endpoint) : Promise.reject(new Error('Not found'));
  },

  // Método para health check CORREGIDO
  healthCheck: () => {
    const healthUrl = `${API_BASE_URL}/health`; // ✅ Sin /api duplicado
    return axios.get(healthUrl, { timeout: 5000 });
  }
};

export default api;
