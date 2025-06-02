import { useFormStatus } from "react-dom";

const SubmitBtn = function ({
  text = "Guardar",
  icon = "fa-floppy-disk",
  className = "",
}: {
  text?: string;
  icon?: string;
  className?: string;
}) {
  /* Guardar,fa-floppy-disk Eliminar,fa-trash-can Enviar,fa-paper-plane Aceptar,fa-check */
  const { pending } = useFormStatus();
  return (
    <button className={"btn1 " + className} disabled={pending}>
      <i
        className={"mr-1 fa-solid " + icon + (pending ? " fa-beat-fade" : "")}
      />
      {text}
    </button>
  );
};

SubmitBtn.Save = function () {
  return <SubmitBtn text="Guardar" icon="fa-floppy-disk" className="mt-2" />;
};
SubmitBtn.Delete = function () {
  return <SubmitBtn text="Eliminar" icon="fa-trash-can" className="mt-2" />;
};
SubmitBtn.Send = function () {
  return <SubmitBtn text="Enviar" icon="fa-paper-plane" className="mt-2" />;
};
SubmitBtn.Accept = function () {
  return <SubmitBtn text="Aceptar" icon="fa-check" className="mt-2" />;
};
export default SubmitBtn;
