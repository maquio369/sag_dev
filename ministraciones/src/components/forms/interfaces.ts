export interface CRUD_Props {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (data: any) => any;
  iconType?: "ins" | "upd" | "del" | string;
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface modelContactos {
  nombres: string;
  correo: string;
}
