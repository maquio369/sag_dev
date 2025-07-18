"use client";

const Spinner = function ({ className }: { className?: string }) {
  {
    className ?? " h-16 w-16 ";
  }
  return (
    <div className="flex items-center justify-center h_-96">
      <div className="relative">
        <div
          className={
            className +
            " animate-spin rounded-full border-4 border-textoBoton1"
          }
        ></div>
        <div
          className={
            className +" absolute top-0 left-0"+
            " animate-spin rounded-full h-4 w-4 border-2 shadow-lg border-fondoBoton2Hover border-t-transparent"
            //animateSpin
          }
        ></div>
      </div>
    </div>
  );
};
export default Spinner;
