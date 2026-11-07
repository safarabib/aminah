import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from('books').select('*').order('createdAt', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from('books').insert([{
    title: body.title,
    author: body.author,
    publisher: body.publisher, // Added Publisher
    category: body.category,
    price: parseFloat(body.price),
    format: body.format,
    description: body.description || "No description available.",
    image_url: body.image_url || null, // Image upload support added
  }]).select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

// NEW: Update existing book
export async function PUT(request: Request) {
  const body = await request.json();
  
  if (!body.id) {
    return NextResponse.json({ error: "Book ID is required for update" }, { status: 400 });
  }

  const { data, error } = await supabase.from('books').update({
    title: body.title,
    author: body.author,
    publisher: body.publisher, // Added Publisher
    category: body.category,
    price: parseFloat(body.price),
    format: body.format,
    description: body.description,
    image_url: body.image_url,
  }).eq('id', body.id).select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.[0] || {});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
  
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}