import axios from 'axios';

// APIs separadas
const AUTH_API = process.env.NEXT_PUBLIC_AUTH_API || 'http://172.16.35.75:3011';
const DATA_API = process.env.NEXT_PUBLIC_DATA_API || 'http://172.16.35.75:3013/api';

const CONNECTION_TIMEOUT = 10000;
const IS_DEV_MODE = process.env.MODE === 'DEV';

// Cliente para autenticación (Puerto 3011)
const authApi = axios.create({
 baseURL: AUTH_API,
 timeout: CONNECTION_TIMEOUT,
 headers: {
   'Content-Type': 'application/json',
 }
});

// Cliente para datos (Puerto 3013)
const dataApi = axios.create({
 baseURL: DATA_API,
 timeout: CONNECTION_TIMEOUT,
 headers: {
   'Content-Type': 'application/json',
 }
});

// Interceptores para debugging
if (IS_DEV_MODE) {
 [authApi, dataApi].forEach((client, index) => {
   const clientName = index === 0 ? 'AUTH' : 'DATA';
   
   client.interceptors.request.use(
     (config) => {
       console.log(`🔐 ${clientName} Request: ${config.method?.toUpperCase()} ${config.url}`, {
         data: config.data,
         params: config.params
       });
       return config;
     },
     (error) => {
       console.error(`❌ ${clientName} Request Error:`, error);
       return Promise.reject(error);
     }
   );

   client.interceptors.response.use(
     (response) => {
       console.log(`✅ ${clientName} Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
         status: response.status,
         data: response.data
       });
       return response;
     },
     (error) => {
       console.error(`❌ ${clientName} Response Error:`, {
         status: error.response?.status,
         statusText: error.response?.statusText,
         data: error.response?.data,
         message: error.message,
         url: error.config?.url
       });
       return Promise.reject(error);
     }
   );
 });
}

const api = {
 // Métodos de autenticación (usan authApi - Puerto 3011)
 login: (usuario, contraseña, id_sistema) => {
   return authApi.post('/api/auth', {
     usuario,
     contraseña,
     id_sistema
   });
 },

 getUser: (id) => {
   return authApi.get(`/api/usuarios/getUser/${id}`);
 },

 getMenuItems: (idSistema, idRol) => {
   return authApi.get(`/api/opciones/getmenu/${idSistema}/${idRol}`);
 },

 // Métodos de datos (usan dataApi - Puerto 3013)
 getTableData: (tableName, params = {}) => {
   return dataApi.get(`/tables/${tableName}`, { params }).then(response => {
     return {
       data: {
         data: response.data.data || response.data,
         pagination: response.data.pagination || {
           page: 1,
           limit: 50,
           total: response.data.data?.length || 0,
           totalPages: 1,
           hasNext: false,
           hasPrev: false
         }
       }
     };
   });
 },

 // Alias para getTableData (para compatibilidad con DataPanel)
 getRecords: (tableName, params = {}) => {
   return dataApi.get(`/tables/${tableName}`, { params }).then(response => {
     return {
       data: {
         data: response.data.data || response.data,
         pagination: response.data.pagination || {
           page: 1,
           limit: 50,
           total: response.data.data?.length || 0,
           totalPages: 1,
           hasNext: false,
           hasPrev: false
         }
       }
     };
   });
 },

 getTableSchema: (tableName) => {
   return dataApi.get(`/tables/${tableName}/schema`);
 },

 getTables: () => {
   return dataApi.get('/tables');
 },

 // Método para foreign key options
 getForeignKeyOptions: async (tableName, columnName) => {
   try {
     // Obtener el schema para encontrar la tabla referenciada
     const schemaResponse = await dataApi.get(`/tables/${tableName}/schema`);
     const fkColumn = schemaResponse.data.data.columns.find(col => col.column_name === columnName);
     
     if (fkColumn && fkColumn.foreign_table_name) {
       // Obtener datos de la tabla referenciada
       const response = await dataApi.get(`/tables/${fkColumn.foreign_table_name}`);
       return { data: response.data.data || response.data };
     }
     
     return { data: [] };
   } catch (error) {
     console.warn(`Error cargando opciones FK para ${tableName}.${columnName}:`, error);
     return { data: [] };
   }
 },

 // Métodos CRUD
 createRecord: (tableName, data) => {
   return dataApi.post(`/tables/${tableName}`, data);
 },

 updateRecord: (tableName, id, data) => {
   return dataApi.put(`/tables/${tableName}/${id}`, data);
 },

 deleteRecord: (tableName, id) => {
   return dataApi.delete(`/tables/${tableName}/${id}`);
 },

 // Health checks
 healthCheckAuth: () => {
   return authApi.get('/');
 },

 healthCheckData: () => {
   return dataApi.get('/');
 }
};

export default api;
