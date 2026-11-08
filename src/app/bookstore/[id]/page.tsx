import { supabase } from "@/lib/supabase";
import { Book, ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton"; // 1. IMPORT ADDED HERE

export const dynamic = 'force-dynamic';

// FIXED FOR NEXT.JS 15: params is now unwrapped safely as a Promise
export default async function BookDetails(props: { params: Promise<{ id: string }> }) {
  
  // 1. Safely await the params object
  const params = await props.params;
  
  // 2. Fetch data using the exact id
  const { data: book } = await supabase.from('books').select('*').eq('id', params.id).single();
  
  // 3. If book doesn't exist, only then throw 404
  if (!book) return notFound();

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-charcoal selection:bg-aminah-gold selection:text-aminah-green font-serif relative overflow-hidden pt-32 pb-32">
      
      {/* Pure CSS Cinematic Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slowFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes cinematicFadeIn {
          from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
        }
        .animate-slow-float { animation: slowFloat 8s ease-in-out infinite; }
        .cinematic-reveal { animation: cinematicFadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
      `}} />

      {/* AMBIENT BACKGROUND GLOW (Book Cover Aura) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-aminah-gold/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#111c19]/50 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 cinematic-reveal">
        
        {/* Back Navigation */}
        <Link href="/bookstore" className="group inline-flex items-center gap-3 text-aminah-gold/60 font-sans font-medium tracking-[0.2em] uppercase text-[10px] hover:text-aminah-gold transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Store
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: Book Cover (Levitating & Glowing) */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-md animate-slow-float" style={{ perspective: '1000px' }}>
              {/* Soft reflection glow behind the book */}
              <div className="absolute inset-0 bg-aminah-gold/20 blur-[50px] transform scale-90 translate-y-10 z-0"></div>
              
              <div className="relative z-10 w-full aspect-[3/4] bg-[#111c19] border border-aminah-gold/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-10 pointer-events-none"></div>
                
                {book.image_url ? (
                  <img src={book.image_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out z-0" />
                ) : (
                  <Book className="w-24 h-24 text-aminah-gold/20 z-0" />
                )}
                
                {/* Format Badge overlay on cover */}
                <div className="absolute top-6 right-6 z-20 bg-[#0a110f]/80 backdrop-blur-md border border-aminah-gold/30 text-aminah-gold text-[10px] font-sans font-bold px-3 py-1.5 tracking-[0.2em] uppercase rounded-sm shadow-xl">
                  {book.format}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Typography & Details */}
          <div className="md:col-span-7 flex flex-col justify-center">
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase border border-aminah-gold/20 px-3 py-1">
                {book.category || "Publication"}
              </span>
              {book.is_featured && (
                <span className="flex items-center gap-1 text-aminah-ivory text-[10px] font-sans tracking-[0.2em] uppercase bg-aminah-gold/10 px-3 py-1">
                  <Star className="w-3 h-3 text-aminah-gold fill-aminah-gold" /> Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-aminah-ivory font-serif leading-tight drop-shadow-md mb-4">
              {book.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-aminah-gold font-serif italic mb-8">
              By {book.author || "Aminah Institute"}
            </p>

            <div className="w-12 h-px bg-aminah-gold/40 mb-8"></div>

            <p className="text-lg md:text-xl text-aminah-ivory/80 leading-relaxed mb-10 font-serif italic">
              {book.description || "A profound exploration of Islamic knowledge, beautifully bound and curated for the sincere seeker of truth."}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-end gap-8 mb-12">
              <div>
                <p className="text-aminah-gold/60 text-[10px] font-sans tracking-[0.2em] uppercase mb-2">Investment</p>
                <p className="text-4xl text-aminah-ivory font-sans font-light tracking-wide">৳{book.price}</p>
              </div>

              {/* 2. ADD TO CART COMPONENT CONNECTED HERE */}
              <div className="flex-1 sm:flex-none">
                <AddToCartButton book={book} />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 border-t border-aminah-gold/10 pt-8 mt-auto">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-aminah-gold mt-0.5" />
                <div>
                  <p className="text-aminah-ivory text-xs font-sans tracking-widest uppercase mb-1">Authentic</p>
                  <p className="text-aminah-ivory/40 text-[10px] font-sans">Verified by Aminah Research Board</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-aminah-gold mt-0.5" />
                <div>
                  <p className="text-aminah-ivory text-xs font-sans tracking-widest uppercase mb-1">Delivery</p>
                  <p className="text-aminah-ivory/40 text-[10px] font-sans">Nationwide secure shipping</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}