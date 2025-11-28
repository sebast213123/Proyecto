import { ProductCard, Product } from "@/components/ProductCard";
// --- FUNCIÓN SEGURA PARA TRAER DATOS ---
async function getProducts() {
 
 const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
 try {
   const res = await fetch(`${baseUrl}/api/products`, {
     cache: 'no-store' 
   });
   if (!res.ok) {
     console.error("Error en la respuesta de la API");
     return [];
   }
   return res.json();
 } catch (error) {
   console.error("Error de conexión:", error);
   return []; 
 }
}
// --- COMPONENTE PRINCIPAL ---
export default async function Home() {
 const products: Product[] = await getProducts();
 return (
<main className="container mx-auto px-4 py-10">
     {/* Título de la sección */}
<div className="text-center mb-12">
<h1 className="text-4xl font-extrabold text-gray-900 mb-2">
         Catálogo de Productos
</h1>
<p className="text-gray-600">
         Explora nuestra selección exclusiva
</p>
</div>
     {/* Renderizado Condicional */}
     {products.length > 0 ? (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {products.map((product) => (
<ProductCard key={product.id} product={product} />
         ))}
</div>
     ) : (
       
<div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
<p className="text-xl text-gray-500 font-medium">
           No se encontraron productos en este momento.
</p>
<p className="text-sm text-gray-400 mt-2">
           (Asegúrate de que tu base de datos Supabase tenga datos)
</p>
</div>
     )}
</main>
 );
}
