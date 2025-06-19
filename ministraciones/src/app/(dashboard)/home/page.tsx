"use client";
import { useUserCtx } from "@/contexts/UserContext";


const Home = () => {
  const { system } = useUserCtx();
  return (
    <div className="flex flex-col overflow-auto pb-3">
      <span className="lblEncabezado ml-4 mt-3">
        
        <i className={`${system.icono} mr-4 scale-200`}></i>
        {system.descripcion}
        </span>
      <div className="flex flex-wrap w-full gap-4 px-4">
        <hr className="mb-3" />
      </div>
    </div>
  );
};

export default Home;
