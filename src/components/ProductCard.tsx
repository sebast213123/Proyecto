import React from "react";

export interface Product {
 id: number;
 name: string;
 created_at: string;
 price?: number; 
 image?: string; 
}
interface Props {
 product: Product;
}
export const ProductCard = ({ product }: Props) => {
 return (
<div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
     {}
<div className="h-48 bg-gray-200 flex items-center justify-center">
<span className="text-gray-400 text-4xl">📦</span>
</div>
<div className="p-4">
<h3 className="text-lg font-bold text-gray-800 mb-2">
         {product.name}
</h3>
<div className="flex justify-between items-center">
<span className="text-xl font-bold text-green-600">
            {}
           ${product.price || "99.00"}
</span>
<button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded transition">
           Comprar
</button>
</div>
</div>
</div>
 );
};