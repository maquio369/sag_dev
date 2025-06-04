"use client";
import { useFormStatus } from "react-dom";

/***
 * Ejemplo con Form onSubmit. Se utilizará parametro/variable: isPending
 *      <form onsubmit="myFunction()">
 * Ejemplo configurado con Form action. Se usara el useFormStatus: pending
 *      <Form action={async (formData) => {
 *         const errorMsg = await handleSubmit(formData);
 *         setError(errorMsg as string);
 *       }}>
 */
const SubmitBtn = function ({
  text = "Guardar",
  icon = "fa-floppy-disk",
  className,
  isPending,
}: {
  text?: string;
  icon?: string;
  className?: string;
  isPending?: boolean;
}) {
  const { pending } = useFormStatus();
  isPending = isPending === undefined ? pending : isPending;

  return (
    <button className={"btn1 " + className} disabled={isPending}>
      <i
        className={
          "mr-1.5 fa-solid " + icon + (isPending ? " fa-beat-fade" : "")
        }
      />
      {text}
    </button>
  );
};

SubmitBtn.Enter = function ({
  className,
  isPending,
}: {
  className?: string;
  isPending?: boolean;
}) {
  return (
    <SubmitBtn
      text="Entrar"
      icon="fa-solid fa-arrow-right-to-bracket"
      className={"mt-2 " + className}
      isPending={isPending}
    />
  );
};

SubmitBtn.Save = function ({
  className,
  isPending,
}: {
  className?: string;
  isPending?: boolean;
}) {
  return (
    <SubmitBtn
      text="Guardar"
      icon="fa-floppy-disk"
      className={"mt-2 " + className}
      isPending={isPending}
    />
  );
};

SubmitBtn.Delete = function ({
  className,
  isPending,
}: {
  className?: string;
  isPending?: boolean;
}) {
  return (
    <SubmitBtn
      text="Eliminar"
      icon="fa-trash-can"
      className={"mt-2 " + className}
      isPending={isPending}
    />
  );
};

SubmitBtn.Send = function ({
  className,
  isPending,
}: {
  className?: string;
  isPending?: boolean;
}) {
  return (
    <SubmitBtn
      text="Enviar"
      icon="fa-paper-plane"
      className={"mt-2 " + className}
      isPending={isPending}
    />
  );
};

SubmitBtn.Accept = function ({
  className,
  isPending,
}: {
  className?: string;
  isPending?: boolean;
}) {
  return (
    <SubmitBtn
      text="Aceptar"
      icon="fa-check"
      className={"mt-2 " + className}
      isPending={isPending}
    />
  );
};
/* Guardar,fa-floppy-disk Eliminar,fa-trash-can Enviar,fa-paper-plane Aceptar,fa-check Entrar,fa-arrow-right-to-bracket */
export default SubmitBtn;
