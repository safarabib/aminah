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
    category: body.category,
    price: parseFloat(body.price),
    format: body.format,
    description: body.description || "No description available.",
  }]).select();
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });
  
  const { error } = await supabase.from('books').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}