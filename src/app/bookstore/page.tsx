"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Search, Loader2, Star } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton"; // CONNECTED ADD TO CART BUTTON

const CATEGORIES = [
  "All", "Qur’an & Mushaf", "Tafsir (Exegesis)", "Hadith", "Aqeedah (Islamic Creed)", 
  "Fiqh (Islamic Jurisprudence)", "salah", "zakat", "sawm", "hajj", 
  "Seerah & Biographies", "Tasawwuf & Spirituality (Raqaiq)", 
  "Islamic History & Civilization", "Family, Parenting & Women in Islam", 
  "Comparative Religion & Dawah", "Islamic Ethics, Economics & Governance", 
  "Children & Youth Literature", "Quranic Science", "Health & Medical", "Business"
];

export default function Bookstore() {
  const [bookList, setBookList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 150);

    fetch("/api/books")
      .then(res => res.json())
      .then(data => {
        setBookList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load books", err);
        setLoading(false);
      });
  }, []);

  const filteredBooks = bookList.filter(book => {
    const matchesSearch = book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.publisher?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-32 font-serif relative overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
        }
        .reveal-item { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}} />

      <div className={`absolute top-[-10%] left-[20%] w-[50vw] h-[50vw] bg-aminah-gold/5 rounded-full blur-[150px] pointer-events-none transition-opacity duration-[2000ms] ${isLoaded ? 'opacity-100' : 'opacity-0'} z-0`}></div>

      <div className={`max-w-[90rem] mx-auto px-6 lg:px-12 mb-16 relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        
        <div className="flex flex-col lg:flex-row justify-between items-end border-b border-aminah-gold/10 pb-12 gap-10 reveal-item">
          <div className="w-full lg:w-auto">
            <p className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <Book className="w-4 h-4" /> Official Store
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-aminah-ivory mb-4 leading-tight drop-shadow-lg">AMINAH Publications</h1>
            <p className="text-aminah-ivory/50 text-lg md:text-xl italic font-serif leading-relaxed max-w-2xl">
              Discover our complete collection of Islamic literature, carefully curated to guide, educate, and inspire the modern seeker.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto mt-6 lg:mt-0">
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search publications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111c19]/50 backdrop-blur-md border border-aminah-gold/20 py-3 pl-12 pr-4 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold/60 font-sans transition-colors placeholder:text-aminah-ivory/30 shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aminah-gold/50" />
            </div>
            
            <div className="relative w-full sm:w-56">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#111c19]/50 backdrop-blur-md border border-aminah-gold/20 py-3 px-4 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold/60 font-sans appearance-none cursor-pointer transition-colors shadow-inner"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} className="bg-[#0a110f] text-aminah-ivory">{cat}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 border-r border-b border-aminah-gold/50 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 reveal-item delay-100">
            <Loader2 className="w-12 h-12 text-aminah-gold animate-spin mb-4" />
            <p className="text-aminah-gold/50 font-sans tracking-widest text-xs uppercase animate-pulse">Curating Collection...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-32 border border-aminah-gold/10 bg-[#111c19]/30 backdrop-blur-sm reveal-item delay-100 shadow-xl">
            <Book className="w-16 h-16 text-aminah-gold/20 mx-auto mb-6" />
            <h2 className="text-3xl text-aminah-ivory mb-3 font-serif">No Publications Found</h2>
            <p className="text-aminah-ivory/40 italic font-serif">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16 reveal-item delay-200">
            {filteredBooks.map((book: any, index: number) => (
              <div key={book.id} className="group flex flex-col h-full">
                
                <Link href={`/bookstore/${book.id}`} className="w-full aspect-[3/4] bg-[#111c19] border border-aminah-gold/10 mb-6 relative overflow-hidden flex items-center justify-center group-hover:border-aminah-gold/50 transition-all duration-700 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_20px_40px_rgba(197,164,109,0.15)] block">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a110f] to-transparent opacity-60 z-10 pointer-events-none"></div>
                  
                  {book.image_url ? (
                    <img src={book.image_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
                  ) : (
                    <Book className="w-16 h-16 text-aminah-gold/20 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
                  )}
                  
                  {book.is_featured && (
                    <div className="absolute top-4 left-4 z-20 bg-[#0a110f]/80 backdrop-blur-md border border-aminah-gold/30 p-1.5 rounded-full shadow-lg">
                      <Star className="w-3 h-3 text-aminah-gold fill-aminah-gold" />
                    </div>
                  )}

                  <div className="absolute top-4 right-4 z-20 bg-aminah-gold/90 backdrop-blur-sm text-aminah-green text-[9px] font-sans font-bold px-3 py-1.5 tracking-[0.2em] uppercase rounded-sm shadow-xl">
                    {book.format}
                  </div>
                </Link>

                <div className="flex-grow flex flex-col px-2">
                  <p className="text-aminah-gold/60 text-[9px] font-sans tracking-[0.2em] uppercase mb-3">{book.category}</p>
                  
                  <Link href={`/bookstore/${book.id}`} className="block cursor-pointer">
                    <h3 className="text-xl md:text-2xl font-serif text-aminah-ivory mb-2 group-hover:text-aminah-gold transition-colors leading-snug line-clamp-2">{book.title}</h3>
                  </Link>
                  
                  <p className="text-aminah-ivory/50 font-serif italic text-sm mb-1">By {book.author || "Aminah Institute"}</p>
                  <p className="text-aminah-gold/40 font-sans tracking-widest text-[9px] uppercase mb-6">Pub: {book.publisher || "AMINAH Publications"}</p>
                  
                  {/* REPLACED WITH FUNCTIONAL ADD TO CART BUTTON (Minimal Style version) */}
                  <div className="mt-auto flex items-center justify-between border-t border-aminah-gold/10 pt-5">
                    <p className="text-aminah-gold font-sans tracking-widest text-lg font-light">৳{book.price}</p>
                    
                    <div className="w-12 h-12">
                      {/* We use our main component but styled for grid */}
                      <AddToCartButton book={book} />
                    </div>
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