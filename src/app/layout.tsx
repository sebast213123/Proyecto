import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
// 1. IMPORTAMOS EL HEADER (Saca el cuadro del armario)
import Header from "../components/Header.client";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
 title: "Mi Tienda",
 description: "Tienda Full Stack",
};
export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
<html lang="es">
<body className={inter.className}>
<Providers>
         {/* 2. COLOCAMOS EL HEADER AQUÍ (Cuélgalo en la pared) */}
<Header />
         {/* Este {children} es donde se renderiza tu página de "Bienvenido Profe" */}
<main className="min-h-screen">
            {children}
</main>
</Providers>
</body>
</html>
 );
}