import React, { useState } from "react";
import Modal from "@/components/elements/Modal";

export interface CrudProps {
  isOpen: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
  type: "ins" | "upd" | "del" | string;
}

export interface modelUsuarios {
  name: string;
  mpio: number;
  email: string;
  role: string;
  password: string;
}

const initialData: modelUsuarios = {
  name: "",
  email: "",
  mpio: -1,
  role: "",
  password: "",
};

const UsuariosForm = ({ isOpen, onClose, onSubmit, type }: CrudProps) => {
  const [formData, setFormData] =
    useState<modelUsuarios>(initialData);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData(initialData);
  };

  const handleClose = () => {
    setFormData(initialData); /*initialData*/
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData ? formData.name : ""}
            onChange={handleChange}
            autoFocus={type != "del"}
          />
        </div>

        <div>
          <select
            className="w-full bg-transparent placeholder:text-bordeControl text-textoControl text-sm border border-amber-300-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-bordeControl hover:border-bordeControlHover shadow-sm focus:shadow-md appearance-none cursor-pointer"
            id="mpio"
            name="mpio"
            value={formData ? formData.mpio : ""}
            onChange={handleChange}
          >
            <option value="-1">Select something...</option>
            <option value="19">Comitán</option>
            <option value="20">San Cristobal</option>
            <option value="101">Tuxtla Gutiérrez</option>
          </select>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData ? formData.email : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData ? formData.role : ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData ? formData.password : ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </Modal>
  );
};
export default UsuariosForm;
