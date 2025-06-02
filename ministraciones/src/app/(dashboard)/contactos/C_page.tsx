"use client";
import ContactosForm from "@/app/(dashboard)/contactos/ContactosForm";
import { modelContactos } from "@/components/forms/interfaces";
import { useState } from "react";

const ContactosPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<modelContactos | null>(null);
  const handleOpenContactModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (data: modelContactos): void => {
    setUserData(data);
    handleCloseUserModal();
  };

  return (
    
    <div className=" p-2">
      <h1 className="text-left">Contactos</h1>
      <hr />
      <button className="btn1 " onClick={handleOpenContactModal}>
        + Agregar
      </button>
      <ContactosForm
        isOpen={isModalOpen}
        //onSubmit={handleFormSubmit}
        onClose={handleCloseUserModal}
        type="ins"
      />
      <div className="overflow-x-auto"></div>
      <table className="table table-zebra w-full">
        <caption className=" text-2xl font-bold">
          <i className="fa-solid fa-user"></i> Contactos
        </caption>

        <thead className="bg-[#fFfFfFb2] text-left">
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Pérez</td>
            <td>1234567890</td>
            <td></td>
            <td>
              <button className="btnIcon">
                <i className="fa-solid fa-pen"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ContactosPage;
