
  
 export interface CRUD_Props {
    isOpen: boolean;
    onClose?: () => void;
    type?: "ins" | "upd" | "del" | string;
    className?: string;
    children?: React.ReactNode;
  }

  export interface modelContactos {
    nombres: string;
    correo: string;    
  }