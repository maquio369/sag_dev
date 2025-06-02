import React, { useState, useEffect, useRef } from "react";
import Modal from "./elements/Modal";

export interface UserData {
  name: string;
  email: string;
  role: string;
  password: string;
}

const iModalData: UserData = {
  name: "",
  email: "",
  role: "",
  password: "",
};

interface Props {
  isOpen: boolean;
  modalData?: UserData;
  onSubmit: (data: UserData) => void;
  onClose: () => void;
}

const UserModal = ({ isOpen, modalData, onClose, onSubmit }: Props) => {
  const focusInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<UserData>(iModalData); /*iModalData*/

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

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
    setFormData(iModalData);
  };

  const handleClose = () => {
    setFormData(iModalData);
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
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
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
export default UserModal;
