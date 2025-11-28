import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
// 1. GET: Para OBTENER los productos (Ya lo tenías, lo mantenemos)
export async function GET() {
 const supabase = await createClient();
 // Seleccionamos nombre, precio e id
 const { data, error } = await supabase.from('Product').select();
 if (error) {
   return NextResponse.json({ error: error.message }, { status: 500 });
 }
 return NextResponse.json(data, { status: 200 });
}
// 2. POST: Para CREAR productos nuevos (ESTO ES LO NUEVO)
export async function POST(request: Request) {
 try {
   const supabase = await createClient();
   // Leemos los datos que nos envía el formulario
   const body = await request.json();
   const { name, price } = body;
   // Validación básica: No permitimos productos sin nombre
   if (!name) {
     return NextResponse.json(
       { error: "El nombre es obligatorio" },
       { status: 400 }
     );
   }
   // Insertamos en la tabla 'Product'
   // IMPORTANTE: Si tu tabla en Supabase no tiene columna 'price',
   // borra la parte de ", price: ..."
   const { data, error } = await supabase
     .from('Product')
     .insert([
       {
         name: name,
         price: Number(price) || 0 // Si no ponen precio, ponemos 0
       }
     ])
     .select();
   if (error) {
     console.error("Error Supabase:", error);
     return NextResponse.json({ error: error.message }, { status: 500 });
   }
   return NextResponse.json(data, { status: 201 });
 } catch (error) {
   return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
 }
}