import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
 providers: [
   CredentialsProvider({
     
     name: "Credenciales",
     credentials: {
       username: { label: "Usuario", type: "text", placeholder: "admin" },
       password: { label: "Contraseña", type: "password" }
     },
     async authorize(credentials, req) {
      
       if (credentials?.username === "admin" && credentials?.password === "123") {
         
         return {
           id: "1",
           name: "Admin User",
           email: "admin@example.com"
         };
       }
       
       return null;
     }
   })
 ],
 
 secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };