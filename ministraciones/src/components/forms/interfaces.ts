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

export interface iPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface iPaginations {
  data: any;
  pagination: iPagination
}
