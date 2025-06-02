import Image from "next/image";
import TopBar from "@/components/TopBar";
const LoginPage = () => {
  return (
    <div className="bg-fondoObscuro bg-[url(/general/wallpaper--33-01.webp)] bg-cover bg-center">
      <TopBar />
      {/*Login*/}
      <div className=" min-h-screen antialiased pt-24 pb-5 ">
        <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
          <div className="mb-20"></div>
          <form
            action="/sistemas"
            className="flex flex-col items-center relative top-center"
          >
            <Image
              src="/general/siag-007(322x91).webp"
              alt=""
              width={322}
              height={91}
              className="absolute -left-center -top-[90px] animate-ping "
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
              className="absolute -left-center -top-[90px] "
            />
            <div
              className="flex flex-col bg-[url(/general/rombos-patron-gob.png)] bg-[auto_88px] bg-fondoControl mt-2 p-10 rounded-lg shadow-lg space-y-6 text-textoControl dark:text-menuTexto dark:bg-fondoBlancoTransparenteDark"
            >
              <h1 className="text-xl text-center ">
                Bienvenido al Sistema Integral Administrativo Gubernamental
              </h1>

              <div className="flex flex-col space-y-1">
                <span className="lbl">Usuario</span>
                <input
                  type="text"
                  autoFocus
                  name="username"
                  id="username"
                  className="w-full"
                  placeholder="Usuario"
                  required
                  autoComplete="on"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <span className="lbl">Contraseña</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className=""
                  placeholder="Contraseña"
                />
              </div>

              <div className="items-center gap-2 ">
                <button type="submit" className="w-full btn1">
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span className="pl-2 font-medium">Entrar</span>
                </button>
                {/* 
                <button type="submit" className="mt-2 w-full btn2 ">
                  Solicitar registro
                </button>

                <a href="#" className="inline-block mt-2 ahref">
                  ¿Olvisdaste tu contraseña?
                </a>
                */}
              </div>
            </div>
          </form>
          <div className="flex justify-center font-light text-textoGolden1 text-xs ">
            <p>Gobierno del Estado de Chiapas · Administración 2024-2030</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
