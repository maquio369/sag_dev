"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/*.email("Correo contiene datos NO válidos")*/
const Schema = z.object({
  name: z
    .string()
    .min(0, "Nombre es un dato requerido")
    .max(
      50,
      "Nombre contiene datos NO válidos. Debe tener entre 2 y 50 caracteres."
    )
    .regex(
      /^[a-zA-Z\s]+$/,
      "Nombre contiene datos NO válidos. Sólo se permiten letras y espacios."
    ),
  email: z
    .literal("")
    .or(
      z
        .string()
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Correo contiene datos NO válidos"
        )
    ),
  role: z.enum(
    ["Administrador", "Usuario", "Humanos", "Financieros", "Materiales"],
    {
      errorMap: () => ({ message: "Rol es un dato requerido" }),
    }
  ),
  password: z
    .string()
    .min(
      3,
      "Contraseña contiene datos NO válidos. Debe tener al menos 3 caracteres, combinando: Mayúsculas, minúsculas, números y algún signo de puntuación"
    ),
});

const PersonalForm = ({
  type,
  data,
}: {
  type: "ins" | "upd" | "del";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: type === "ins" ? "" : data.name,
      email: type === "ins" ? "" : data.email,
      role: type === "ins" ? "" : data.role,
      password: type === "ins" ? "" : data.password,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="frmEdit">
      <div className="flex flex-col flex-wrap columns-auto gap-1">
        <>
          <label className="lbl mt-0" hidden={errors.name ? true : false}>
            Nombre
          </label>
          {errors.name && (
            <span className="lblError mt-0">
              {errors.name?.message?.toString()}
            </span>
          )}

          <input
            required
            type="text"
            {...register("name")}
            className=""
            autoFocus={type != "del"}
            /*defaultValue={type != "ins" ? data.name : ""}*/
          />
        </>
        <>
          <label className="mt-4 " hidden={errors.email ? true : false}>
            Correo
          </label>
          {errors.email && (
            <span className="lblError mt-4 ">
              {errors.email.message?.toString()}
            </span>
          )}

          <input type="email" {...register("email")} className="" />
        </>
        <>
          <label className="lbl mt-4" hidden={errors.role ? true : false}>
            Rol
          </label>
          {errors.role && (
            <span className="lblError mt-4 ">
              {errors.role.message?.toString()}
            </span>
          )}

          <select
            {...register("role")}
            className="border border-b-bordeControl "
          >
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
            <option value="Humanos">Humanos</option>
            <option value="Financieros">Financieros</option>
            <option value="Materiales">Materiales</option>
          </select>
        </>
        <>
          <label className="lbl  mt-4" hidden={errors.password ? true : false}>
            Contraseña
          </label>
          {errors.password && (
            <span className="lblError mt-4 ">
              {errors.password.message?.toString()}
            </span>
          )}

          <input
            type="password"
            {...register("password")}
            className=""
            title="Debe tener al menos 3 caracteres. Se recomienda el uso de: Mayúsculas, minúsculas, números y signos"
          />
        </>
        {type === "del" ? (
          <>
            <button type="submit" className="btnDanger w-26" autoFocus>
              <i className="fa-solid fa-trash-can"></i> Eliminar
            </button>
          </>
        ) : (
          <>
            <button type="submit" className="btn1 w-26">
              <i className="fa-solid fa-floppy-disk"></i> Guardar
            </button>
          </>
        )}
      </div>
    </form>
  );
};
export default PersonalForm;
