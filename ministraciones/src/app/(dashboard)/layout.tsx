"use client";
import TopNavbar from "@/components/TopNavbar";
import { useState, useEffect } from "react";
import SideBarMenu from "@/components/SideBarMenu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si el dispositivo es móvil
  useEffect(() => {
    // Verificar que estamos en el navegador
    if (typeof window !== "undefined") {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      let localStorageVar = localStorage.getItem("isSidebarOpen");
      let isSidebarOpen = true;
      //console.log(localStorageVar);
      if (localStorageVar === null) {
        localStorage.setItem("isSidebarOpen", "true");
      } else {
        isSidebarOpen = localStorageVar === "true";
      }
      //console.log(isSidebarOpen);
      setSidebarOpen(isSidebarOpen);

      checkIsMobile();
      window.addEventListener("resize", checkIsMobile);
      return () => {
        window.removeEventListener("resize", checkIsMobile);
      };
    }
  }, []);

  const toggleSidebar = () => {
    let isSidebarOpen = !sidebarOpen;
    setSidebarOpen(isSidebarOpen);
    localStorage.setItem("isSidebarOpen", String(isSidebarOpen));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/*TopNavbar*/}
      <TopNavbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex h-[calc(100vh-48px)] relative">
        {/* Overlay para cerrar sidebar en móvil */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-fondoTransparenteObscuroNotificacion blur-lg z-10 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/*SideBar left*/}
        <SideBarMenu sidebarOpen={sidebarOpen} isMobile={isMobile} />

        {/*Content*/}
        <div
          className={`
            flex-1 w-full transition-all duration-300 ease-in-out 
            bg-fondoContenido dark:bg-fondoContenidoDark overflow-auto             
            bg-[url(/general/rombos-patron-der-2x.webp)] bg-[auto_220px] bg-repeat-y bg-right 
            flex_ flex_-col 
            h_-full
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
