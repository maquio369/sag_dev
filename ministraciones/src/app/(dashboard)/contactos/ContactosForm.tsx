"use client";
import { useActionState } from "react";
import { CRUD_Props } from "@/components/forms/interfaces";
import Modal from "@/components/elements/Modal";
import { ToastContainer, toast } from "react-toastify";
import SubmitBtn from "@/components/elements/SubmitBtn";

const ContactosForm = ({ isOpen, onClose, type }: CRUD_Props) => {
  const submitContact = async (
    prevState: { success: boolean; message: string },
    formData: FormData
  ) => {
    // 'use server';
    const name = formData.get("nombres");
    const email = formData.get("correo");
    // Process form data (e.g., send to API)
    console.log("Form submitted:", { name, email });
    // No need to preventDefault or reset form - React handles it
    if (name === "") {
      toast.warn("El nombre es obligatorio", { theme: "dark" });
      return { success: false, message: "¡El nombre es obligatorio!" };
    } else {
      await new Promise((resolve) => setTimeout(resolve, 777));
      toast.success("¡Registro guardado con éxito!", { theme: "light" });
      handleClose();
      return { success: true, message: `Thanks ${name}!` };
    }
  };
  const handleClose = () => {
    //setFormData(initialData); /*initialData*/
    if (onClose) {
      onClose();
    }
  };
  const [state, formAction] = useActionState(submitContact, {
    success: false,
    message: "",
  });

  return (
    <div className="">
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        type={type}
        className="fondoVentanaForm-width fondoVentanaForm-center min-h-3/12"
      >
        <form action={formAction} className="">
          <div className="grid3cols">
            <div>
              <label htmlFor="nombres" className="lbl">
                Nombres
              </label>
              <input type="text" name="nombres" className="w-full" autoFocus />
            </div>
            <div>
              <label htmlFor="correo" className="lbl">
                Correo
              </label>
              <input type="email" name="correo" className="w-full" />
            </div>
            <div>
              <label htmlFor="telefono" className="lbl">
                Teléfono
              </label>
              <input type="text" name="telefono" className="w-full" />
            </div>
          </div>
          <div>
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
