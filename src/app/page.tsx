import { ProductCard, Product } from "@/components/ProductCard";

async function getProducts() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store'
    });

    if (!res.ok) return [];
    
    return res.json();
  } catch (error) {
    console.error("Error cargando productos:", error);
    return [];
  }
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      
      {}
      <div className="flex flex-col items-center justify-center mb-12 mt-6">
        {}
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
          Hello There
        </h1>
        
        <div className="relative group">
          {}
          <img 
            src="https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyb2YxaHpwdTUyMHgwOWtybTA0azhjbTVzdTVyNWI1N284OW1hOXgwayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiIzJSKB4l7xTouE8/200.gif" 
            alt="Obi Wan Hello There"
            className="rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
            style={{ maxWidth: "100%", height: "auto" }} 
            width={400}
          />
        </div>
      </div>

      {/* SECCIÓN 2: Catálogo */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Nuestra Colección
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Explora los productos disponibles
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
            <p className="text-lg text-gray-500 dark:text-gray-300">
              No hay productos aún.
            </p>
          </div>
        )}
      </div>

    </main>
  );
}