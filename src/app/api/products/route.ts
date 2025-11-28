import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache"; // <-- NUEVO IMPORT: Para gestionar el caché de Next.js

// 1. GET: Para OBTENER los productos
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('Product').select();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data, { status: 200 });
}

// 2. POST: Para CREAR productos nuevos
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { name, price } = body;

    if (!name) {
      return NextResponse.json(
        { error: "El nombre es obligatorio" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('Product')
      .insert([
        { name: name, price: Number(price) || 0 }
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ARREGLO CLAVE: Fuerza la regeneración de la página de inicio
    revalidatePath('/'); 

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// 3. DELETE: Para BORRAR productos
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const { error } = await supabase
      .from('Product')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Si se borró, forzamos la actualización
    revalidatePath('/'); 

    return NextResponse.json({ message: "Producto eliminado" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}