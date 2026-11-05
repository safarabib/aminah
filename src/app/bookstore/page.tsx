import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Book, ShoppingCart, Search } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function Bookstore() {
  const { data: books } = await supabase.from('books').select('*').order('createdAt', { ascending: false });
  const bookList = books || [];

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-32 font-serif">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-aminah-gold/20 pb-8">
          <div>
            <p className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-4">Official Store</p>
            <h1 className="text-4xl md:text-6xl text-aminah-ivory">AMINAH Publications</h1>
          </div>
          <div className="mt-8 md:mt-0 flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <input type="text" placeholder="Search books..." className="w-full bg-[#111c19] border border-aminah-gold/30 py-3 pl-12 pr-4 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold font-sans"/>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aminah-gold/50" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        {bookList.length === 0 ? (
          <div className="text-center py-32 border border-aminah-gold/10 bg-[#111c19]/50">
            <Book className="w-12 h-12 text-aminah-gold/30 mx-auto mb-4" />
            <h2 className="text-2xl text-aminah-ivory mb-2">No Publications Yet</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {bookList.map((book: any) => (
              <div key={book.id} className="group flex flex-col h-full">
                <Link href={`/bookstore/${book.id}`} className="w-full aspect-[3/4] bg-[#111c19] border border-aminah-gold/20 mb-6 relative overflow-hidden flex items-center justify-center group-hover:border-aminah-gold/60 transition-all duration-700 cursor-pointer">
                  <Book className="w-16 h-16 text-aminah-gold/20 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 z-20 bg-aminah-gold text-aminah-green text-[9px] font-sans font-bold px-2 py-1 tracking-[0.2em] uppercase">{book.format}</div>
                </Link>
                <div className="flex-grow flex flex-col">
                  <p className="text-aminah-gold/70 text-[9px] font-sans tracking-[0.2em] uppercase mb-2">{book.category}</p>
                  <Link href={`/bookstore/${book.id}`}>
                    <h3 className="text-xl md:text-2xl font-serif text-aminah-ivory mb-1 group-hover:text-aminah-gold transition-colors leading-snug">{book.title}</h3>
                  </Link>
                  <p className="text-aminah-ivory/50 font-serif italic text-sm mb-6">{book.author}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-aminah-gold/20 pt-4">
                    <p className="text-aminah-gold font-sans tracking-widest text-sm md:text-base">৳{book.price}</p>
                    <button className="text-aminah-ivory bg-[#111c19] hover:bg-aminah-gold hover:text-aminah-green border border-aminah-gold/30 p-2"><ShoppingCart className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}