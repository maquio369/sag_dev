"use client";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./globals.css";

import {UserCtxProvider} from "@/contexts/UserContext";

const font2 = Roboto_Condensed({ subsets: ["latin"] });
const font1 = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta charSet="UTF-8" />
        <title>SAG</title>
        <meta
          name="description"
          content="Sistema Administrativo Gubernamental"
        />
        <meta
          name="keywords"
          content="SAG, Sistema Administrativo Gubernamental"
        />
        <meta name="author" content="Julio Arizmendi" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={font1.className}>
            <UserCtxProvider >{children}</UserCtxProvider>
      </body>
    </html>
  );
}
