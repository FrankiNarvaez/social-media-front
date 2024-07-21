import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { ReactNode } from "react";
import { Provider } from  'react-redux';
import store from "@/redux/store";
import {Providers} from "./providers";

const Roboto = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nebula",
  description: "Social media app",
};

interface RootLayoutProps{
  children: ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  return (<html lang="en">
    <head>
      <meta name="description" content={metadata.description ?? ''} />
    </head>
    <body className={`${Roboto.className} dark:bg-darkVoid`}>
    
    <Providers>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Providers>

    </body>
  </html>);
}


/* 
Black #151419
DarkPurple #7E00EEE
LightPurple #AC10F5
DarkGrey #262626
LightGrey #878787
#White #FBFBFB

Máximo un <h1> por vista o página

Para los <h1> y botones, la tipografia será Nico moji
Roboto mono para parrafos y demás 


*/