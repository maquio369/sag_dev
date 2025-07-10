import Image from "next/image";
import TopBar from "@/components/TopBar";
import LoginForm from "@/components/forms/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-fondoObscuro bg-[url(/general/wallpaper--33-01.webp)] bg-cover bg-center">
      <TopBar />
      {/*Login*/}
      <div className=" min-h-screen antialiased pt-24 pb-5 ">
        <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
         
          <div className=" justify-center items-center mb-15 ml-10">
            <Image
              src="/general/siag-007(322x91).webp"
              alt=""
              width={322}
              height={91}
              className="absolute top-[85px] animate-ping "
              style={{
                animationIterationCount: 1,
                animationFillMode: "forwards",
                animationDelay: "8s",
              }}
            />
            <Image
              src="/general/siag-007(322x91).webp"
              alt=""
              width={322}
              height={91}
              className="absolute top-[85px] "
            />
            </div>
            <div
              className="flex flex-col bg-[url(/general/rombos-patron-gob.png)] bg-[auto_88px] z-0 bg-fondoControl mt-1 pt-4 pb-7 px-10 rounded-lg shadow-lg space-y-6 text-textoControl dark:text-menuTexto dark:bg-fondoBlancoTransparenteDark"
            >
              <div className="text-lg text-center ">
                Bienvenido al sistema de 
              </div>
                            
              <LoginForm />
              
            </div>
          
          <div className="flex justify-center font-light text-textoGolden1 text-xs ">
            <p>Gobierno del Estado de Chiapas · Administración 2024-2030</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
