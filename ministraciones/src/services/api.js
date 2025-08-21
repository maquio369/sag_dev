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
     const schema = schemaResponse.data.data || schemaResponse.data;
     
     // Buscar la foreign key en el schema
     const fkColumn = schema.foreignKeys?.find(fk => fk.column_name === columnName);
     
     if (!fkColumn || (!fkColumn.referenced_table_name && !fkColumn.foreign_table_name)) {
       console.warn(`No se encontró información FK para ${columnName}`, fkColumn);
       return { 
         data: { 
           data: { 
             options: [] 
           } 
         } 
       };
     }

     // Usar el nombre correcto de la tabla referenciada
     const referencedTable = fkColumn.referenced_table_name || fkColumn.foreign_table_name;
     console.log(`🔍 Cargando opciones para FK ${columnName} -> ${referencedTable}`);
     
     // Obtener datos de la tabla referenciada
     const response = await dataApi.get(`/tables/${referencedTable}`);
     const rawData = response.data.data || response.data;

     if (!Array.isArray(rawData) || rawData.length === 0) {
       console.warn(`No hay datos en tabla ${referencedTable}`);
       return { 
         data: { 
           data: { 
             options: [] 
           } 
         } 
       };
     }

     // 🎯 FORMATEAR LOS DATOS COMO OPCIONES
     const options = rawData.map(record => {
       // Usar la primary key como value
       const primaryKeyValue = record[fkColumn.referenced_column_name] || record.id || Object.values(record)[0];
       
       // Crear label: buscar campo descriptivo o usar la PK
       let label = primaryKeyValue;
       
       // Intentar encontrar un campo descriptivo (nombre, descripcion, titulo, etc.)
       const descriptiveFields = ['nombre', 'nombres', 'descripcion', 'titulo', 'opcion', 'rol', 'empleado'];
       for (const field of descriptiveFields) {
         if (record[field]) {
           label = record[field];
           break;
         }
       }
       
       // Si hay más de un campo descriptivo, combinarlos
       if (record.nombres && record.apellidos) {
         label = `${record.nombres} ${record.apellidos}`;
       } else if (record.nombre && record.apellidos) {
         label = `${record.nombre} ${record.apellidos}`;
       }
       
       return {
         value: String(primaryKeyValue), // Asegurar que sea string
         label: String(label)
       };
     });

     console.log(`✅ ${options.length} opciones formateadas para ${columnName}:`, options);

     return { 
       data: { 
         data: { 
           options: options 
         } 
       } 
     };
     
   } catch (error) {
     console.error(`❌ Error cargando opciones FK para ${tableName}.${columnName}:`, error);
     return { 
       data: { 
         data: { 
           options: [] 
         } 
       } 
     };
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
