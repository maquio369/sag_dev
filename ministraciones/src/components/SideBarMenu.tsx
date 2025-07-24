import Image from "next/image";
import Menu from "@/components/Menu";
import ToggleDarkMode from "@/components/elements/ToggleDarkMode";
import Link from "next/link";

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
          ><Link href="/home" >
            <Image
              src="/general/Recurso3a(231x178).webp"
              alt=""
              width={sidebarOpen ? 170 : 32}
              height={sidebarOpen ? 131 : 24}
              className={`transition-all duration-200 ease-in-out ${sidebarOpen ? "" : " pb-3.5"} `}
            />
            </Link>
            
            <Image
              src="/general/Recurso3b(231x127).webp"
              //src="/general/Recurso3b(231x127).gif"
              alt=""
              width={sidebarOpen ? 170 : 32}
              height={sidebarOpen ? 93 : 17}
              className={`transition-all duration-200 ease-in-out ${sidebarOpen ? "" : " h-0 w-0"} `}
            />

          </div>
        </div>
        <div className="  mb-auto h-70">
          <Menu expanded={sidebarOpen} />
        </div>
      </div>
    </>
  );
};

export default SideBarMenu;
