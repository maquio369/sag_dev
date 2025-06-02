import Image from "next/image";
import Menu from "@/components/Menu";
import ToggleDarkMode from "@/components/elements/ToggleDarkMode";

interface Props {
  sidebarOpen?: boolean;
  isMobile?: boolean;
}

const SideBarMenu = ({ sidebarOpen = true, isMobile = false }: Props) => {
  return (
    <>
      {/*SideBar left*/}
      <div
        className={`
            ${sidebarOpen ? "w-[260px]" : isMobile ? "w-[1px]" : "w-[56px]"} 
            md:relative z-20
            transition-all duration-200 ease-in-out
            
            p-0 bg-[url(/general/rombos-patron-gob.png)] bg-[auto_88px] bg-fondoObscuro
            overflow-x-hidden
            flex flex-col h-screen-48 justify-between
                      `}
      >
        <div
          className={`bg-linear-to-b from-fondoGradienteLogo to-transparent flex ${sidebarOpen ? "pt-1 pr-2" : "pt-1 pr-1"} justify-center`}
        >
          <div
            className={`${sidebarOpen ? " h-56" : "h-7.5 w-8 pt-3 overflow-hidden flex items-center"}`}
          >
            <Image
              src="/general/recurso3(231x305).webp"
              alt=""
              width={sidebarOpen ? 170 : 32}
              height={sidebarOpen ? 224 : 42}
              className="transition-all duration-200  ease-in-out"
            />
          </div>
        </div>
        <div className="  mb-auto h-70">
          <Menu expanded={sidebarOpen} />
        </div>
        <label className="bg-fondoTransparenteObscuroBoton h-10">
          <ToggleDarkMode
            isActive={true}
            className="relative -bottom-1.5 -left-22"
          />
        </label>
      </div>
    </>
  );
};

export default SideBarMenu;
