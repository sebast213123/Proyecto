import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Configuración de NextAuth
const handler = NextAuth({
 providers: [
   CredentialsProvider({
     // El nombre que se mostrará en el formulario de inicio de sesión
     name: "Credenciales",
     credentials: {
       username: { label: "Usuario", type: "text", placeholder: "admin" },
       password: { label: "Contraseña", type: "password" }
     },
     async authorize(credentials, req) {
       // --- LÓGICA DE VALIDACIÓN (SIMULADA POR AHORA) ---
       // Aquí validaremos: Si el usuario escribe "admin" y contraseña "123", entra.
       // En el futuro, aquí consultaremos a Supabase/Base de Datos.
       if (credentials?.username === "admin" && credentials?.password === "123") {
         // Si es correcto, retornamos el objeto usuario
         return {
           id: "1",
           name: "Admin User",
           email: "admin@example.com"
         };
       }
       // Si las credenciales están mal, retornamos null
       return null;
     }
   })
 ],
 // Esto es necesario para que NextAuth funcione en producción y desarrollo
 secret: process.env.NEXTAUTH_SECRET,
});
// EXPORTACIÓN OBLIGATORIA (Clean Code: Exportar como GET y POST)
// Next.js App Router necesita manejar tanto peticiones GET como POST en la misma ruta
export { handler as GET, handler as POST };