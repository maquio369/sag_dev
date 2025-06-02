export let role = "Enlace"
export const personalData = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: role,
        password: "password1"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@mail.com",
        role: role,
        password: "password2"
    },
    {
        id: 3,
        name: "Balam Atziri",
        email: "a.balam@gmail.com",
        role: "Administrador",
        password: "password3"
    },
    {
        id: 4,
        name: "Julio Arizmendi",
        email: "jperex0002@gmail.com",
        role: "Administrador",
        password: "password4"
    },
];

export const rolesData = [
    {
        rol_id: 1,
        rol: "Super Administrador",
        abreviatura: "sa",
    },
    {
        rol_id: 2,
        rol: "Administrador",
        abreviatura: "Admin",
    },
    {
        rol_id: 3,
        rol: "Usuario",
        abreviatura: "Usr",    
    },
    {
        rol_id: 4,
        rol: "Usuario Avanzado",
        abreviatura: "Avanzado",
    },
    {
        rol_id: 5,
        rol: "Usuario sólo lectura",
        abreviatura: "Lectura",
    },
    {
        rol_id: 6,
        rol: "Enlace",
        abreviatura: "Enlace",
        
    },
    {
        rol_id: 7,
        rol: "Enlace Especializado",
        abreviatura: "Enl.Esp.",
    },
];
export const puestosData = [
    {
        puesto_id: 1,
        puesto: "Jefe de Oficina",
    },
    {
        puesto_id: 2,
        puesto: "Coordinador",
    },
    {
        puesto_id: 3,
        puesto: "Jefe de Unidad",
    },
    {
        puesto_id: 4,
        puesto: "Jefe de Área",
    },
    {
        puesto_id: 5,
        puesto: "Asesor",
    },
    {
        puesto_id: 6,
        puesto: "Asistente",
    },
    {
        puesto_id: 7,
        puesto: "Secretaría",
    },
    {
        puesto_id: 8,
        puesto: "Chofer",
    },
];

export const sistemasData = [
    {
        sistema_id: 1,
        grupo: "Gobierno del Estado de Chiapas",
        sistema: "Sistema Administrativo Gubernamental",
        objetivo: "Integra los sistemas informáticos de la Oficina del Gobernador",
        abreviatura: "SAG",
        sistema_padre_id: 0,
    },
    {
        sistema_id: 2,
        grupo: "Humanos",
        sistema: "Registro de Personal",
        objetivo: "Gestión del capital humano de la Oficina del Gobernador",
        abreviatura: "Personal",
        sistema_padre_id: 1,
    },
    {
        sistema_id: 3,
        grupo: "Financieros",
        sistema: "Ministraciones",
        objetivo: "Gestión de las ministraciones de la Oficina del Gobernador",
        abreviatura: "Ministraciones",
        sistema_padre_id: 1,
        
    },
    {
        sistema_id: 4,
        grupo: "Materiales",
        sistema: "Vales de Gasolina",
        objetivo: "Control de vales de gasolina y parque vehicular",
        abreviatura: "Gasolina",
        sistema_padre_id: 1,
    },
    {
        sistema_id: 5,
        grupo: "Materiales",
        sistema: "Sistema de Almacen",
        objetivo: "Gestión del almacén de la Oficina del Gobernador",
        abreviatura: "Almacén",
        sistema_padre_id: 1,
    },  
];