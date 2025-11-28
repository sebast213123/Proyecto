"use client"; 
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
const Header = () => {
 const { data: session, status } = useSession();
 return (
<header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
<Link href="/" className="text-xl font-bold text-gray-800">
       Mi Tienda
</Link>
<div className="flex items-center gap-4">
       {}
       {status === "loading" ? (
<p className="text-sm text-gray-500">Cargando...</p>
       ) : session ? (
         // CASO 1: USUARIO LOGUEADO
<>
<p className="text-sm font-medium text-gray-700">
             Hola, {session.user?.name || "Usuario"}
</p>
<button
             onClick={() => signOut()}
             className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md transition"
>
             Salir
</button>
</>
       ) : (
         // CASO 2: USUARIO NO LOGUEADO (Invitado)
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