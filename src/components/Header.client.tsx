"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"; 

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold text-gray-800">
        Mi Tienda
      </Link>

      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <p className="text-sm text-gray-500">Cargando...</p>
        ) : session ? (
          // USUARIO LOGUEADO: Añadimos el enlace Admin aquí
          <>
            <p className="text-sm font-medium text-gray-700">
              Hola, {session.user?.name || "Usuario"}
            </p>

            {/* <-- ESTE ES EL NUEVO BOTÓN DE ACCESO AL ADMIN --> */}
            <Link 
              href="/admin" 
              className="bg-black hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Panel Admin
            </Link>
            
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
            >
              Salir
            </button>
          </>
        ) : (
          // USUARIO NO LOGUEADO
          <button
            onClick={() => signIn()} 
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;