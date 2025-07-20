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
  icon = "fa-solid fa-floppy-disk",
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
      <span className="mx-1.5">
        <i
          className={
            "mr-1.5 " + icon + (isPending ? " fa-beat-fade" : "")
          }
        />
        {text}
      </span>
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
      className={"" + className}
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
      icon="fa-solid fa-floppy-disk"
      className={"" + className}
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
      icon="fa-solid fa-trash-can"
      className={"" + className}
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
      icon="fa-solid fa-paper-plane"
      className={"" + className}
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
      icon="fa-solid fa-check"
      className={"" + className}
      isPending={isPending}
    />
  );
};
/* Guardar,fa-floppy-disk Eliminar,fa-trash-can Enviar,fa-paper-plane Aceptar,fa-check Entrar,fa-arrow-right-to-bracket */
export default SubmitBtn;
