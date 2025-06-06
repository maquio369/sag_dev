"use client";
import { useActionState, useState } from "react";
import { CRUD_Props } from "@/components/forms/interfaces";
import Modal from "@/components/elements/Modal";
import { ToastContainer, toast } from "react-toastify";
import SubmitBtn from "@/components/elements/SubmitBtn";

export interface CrudProps {
  isOpen: boolean;
  onSubmit: (data: any) => void;
  onClose: () => void;
  type: "ins" | "upd" | "del" | string;
}

export interface modelContactos {
  id?: string;
  nombres: string;
  correo: string;
  telefono?: string;
}

const initialData: modelContactos = {
  id: "",
  nombres: "",
  correo: "",
  telefono: "",
};

const ContactosForm = ({ isOpen, onClose, onSubmit, type }: CrudProps) => {
  //const ContactosForm = ({ isOpen, onClose, type }: CRUD_Props) => {
  const [formData, setFormData] = useState<modelContactos>(initialData);

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

  /*formAction submitContact*/
  const submitContact = async (
    prevState: { success: boolean; message: string },
    formData: FormData
  ) => {
    // 'use server';
    const name = formData.get("nombres");
    const email = formData.get("correo");
    // Process form data (e.g., send to API)
    console.log("Form submitted:", { formData });
    // No need to preventDefault or reset form - React handles it
    if (name === "") {
      toast.warn("El nombre es obligatorio", { theme: "dark" });
      return { success: false, message: "¡El nombre es obligatorio!" };
    } else {
      await new Promise((resolve) => setTimeout(resolve, 777));
      toast.success("¡Registro guardado con éxito!", { theme: "light" });
      handleClose();
      return { success: true, message: `Gracias ${name}!` };
    }
  };
  const [state, formAction] = useActionState(submitContact, {
    success: false,
    message: "",
  });
  /*-----------------------------*/

  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        type={type}
        className="fondoVentanaForm-width fondoVentanaForm-center min-h-3/12"
        //onSubmit={handleSubmit} action={formAction}
      >
        <form onSubmit={handleSubmit} className="">
          <div className="grid3cols">
            <div>
              <label htmlFor="nombres" className="lbl">
                Nombres
              </label>
              <input
                type="text"
                id="nombres"
                name="nombres"
                className="w-full"
                value={formData ? formData.nombres : ""}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <div>
              <label htmlFor="correo" className="lbl">
                Correo
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                className="w-full"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="telefono" className="lbl">
                Teléfono
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                className="w-full"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <SubmitBtn.Save />
            {state.success && <p>{state.message}</p>}
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
};
export default ContactosForm;
