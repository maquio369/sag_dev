import type { Metadata } from "next";
import {Inter, Roboto_Condensed} from "next/font/google";
import "./globals.css";

const font1 = Inter({ subsets: ["latin"] });
const font2 = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIAG",
  description: "Sistema Integral Administrativo Gubernamental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={font1.className}><strong>SIAG</strong> <span  className={font2.className}>Sistema Integral Administrativo Gubernamental</span>{children}
        <br/>
        <p className={font2.className}>AdminPage Roboto font - <strong>Roboto Condensed BOLD</strong> - {font2.className}</p>
        <p className={font1.className}>AdminPage Inter font - <strong>Inter</strong></p>    
      </body>
    </html>
  );
}
