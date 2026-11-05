import { supabase } from "@/lib/supabase";
import { Book, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function BookDetails({ params }: { params: { id: string } }) {
  const { data: book } = await supabase.from('books').select('*').eq('id', params.id).single();
  
  if (!book) return notFound();

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-32 font-serif">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <Link href="/bookstore" className="inline-flex items-center gap-2 text-aminah-gold/70 hover:text-aminah-gold mb-10 font-sans text-xs tracking-widest uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="w-full aspect-[3/4] bg-[#111c19] border border-aminah-gold/20 relative flex items-center justify-center">
            <Book className="w-32 h-32 text-aminah-gold/20" />
            <div className="absolute top-6 right-6 bg-aminah-gold text-aminah-green text-xs font-sans font-bold px-3 py-1 tracking-[0.2em] uppercase">{book.format}</div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-aminah-gold/70 text-xs font-sans tracking-[0.2em] uppercase mb-4">{book.category}</p>
            <h1 className="text-4xl md:text-5xl text-aminah-ivory mb-2">{book.title}</h1>
            <p className="text-aminah-ivory/50 font-serif italic text-xl mb-8">by {book.author}</p>
            <p className="text-aminah-ivory/80 leading-relaxed mb-10 font-sans">{book.description}</p>
            <div className="mt-auto pt-8 border-t border-aminah-gold/20 flex items-center justify-between">
              <p className="text-aminah-gold font-sans tracking-widest text-3xl">৳{book.price}</p>
              <button className="bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-sm px-8 py-4 hover:bg-aminah-ivory transition-colors flex items-center gap-3">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}