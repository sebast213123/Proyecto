"use client"; // Obligatorio porque usamos hooks (useState)
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AdminPage() {
 const router = useRouter();
 // Estados para guardar lo que escribe el usuario
 const [name, setName] = useState("");
 const [price, setPrice] = useState("");
 const [loading, setLoading] = useState(false);
 // Función que se ejecuta al dar click en "Crear"
 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault(); // Evita que la página se recargue sola
   setLoading(true);
   try {
     const res = await fetch("/api/products", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name, price }),
     });
     if (res.ok) {
       alert("¡Producto creado con éxito! 🎉");
       setName(""); // Limpiamos el campo
       setPrice(""); // Limpiamos el campo
       router.refresh(); // Actualizamos la data en segundo plano
     } else {
       const data = await res.json();
       alert(`Error: ${data.error}`);
     }
   } catch (error) {
     alert("Ocurrió un error inesperado.");
   } finally {
     setLoading(false);
   }
 };
 return (
<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
<h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
         Panel de Administración
</h1>
<form onSubmit={handleSubmit} className="space-y-5">
         {/* Campo Nombre */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
             Nombre del Producto
</label>
<input
             type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
             placeholder="Ej. Audífonos Sony"
             required
           />
</div>
         {/* Campo Precio */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-1">
             Precio ($)
</label>
<input
             type="number"
             value={price}
             onChange={(e) => setPrice(e.target.value)}
             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
             placeholder="0.00"
           />
</div>
         {/* Botón de Guardar */}
<button
           type="submit"
           disabled={loading}
           className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
           {loading ? "Guardando..." : "Crear Producto"}
</button>
</form>
<div className="mt-6 text-center border-t pt-4">
<button
           onClick={() => router.push('/')}
           className="text-sm text-gray-500 hover:text-black underline"
>
           ← Volver al Catálogo
</button>
</div>
</div>
</div>
 );
}