"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, ShoppingCart, Search, Loader2 } from "lucide-react";

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

  useEffect(() => {
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
    <main className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-32 font-serif">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-end border-b border-aminah-gold/20 pb-8 gap-6">
          <div className="w-full lg:w-auto">
            <p className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-4">Official Store</p>
            <h1 className="text-4xl md:text-6xl text-aminah-ivory">AMINAH Publications</h1>
          </div>
          
          {/* Live Search & Filter Options */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search books..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111c19] border border-aminah-gold/30 py-3 pl-12 pr-4 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold font-sans"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aminah-gold/50" />
            </div>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 bg-[#111c19] border border-aminah-gold/30 py-3 px-4 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold font-sans appearance-none cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        {loading ? (
          <div className="flex justify-center items-center py-32"><Loader2 className="w-12 h-12 text-aminah-gold/50 animate-spin" /></div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-32 border border-aminah-gold/10 bg-[#111c19]/50">
            <Book className="w-12 h-12 text-aminah-gold/30 mx-auto mb-4" />
            <h2 className="text-2xl text-aminah-ivory mb-2">No Publications Found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredBooks.map((book: any) => (
              <div key={book.id} className="group flex flex-col h-full">
                <Link href={`/bookstore/${book.id}`} className="w-full aspect-[3/4] bg-[#111c19] border border-aminah-gold/20 mb-6 relative overflow-hidden flex items-center justify-center group-hover:border-aminah-gold/60 transition-all duration-700 cursor-pointer">
                  {book.image_url ? (
                    <img src={book.image_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <Book className="w-16 h-16 text-aminah-gold/20 group-hover:scale-110 transition-transform duration-700" />
                  )}
                  <div className="absolute top-4 right-4 z-20 bg-aminah-gold text-aminah-green text-[9px] font-sans font-bold px-2 py-1 tracking-[0.2em] uppercase">{book.format}</div>
                </Link>
                <div className="flex-grow flex flex-col">
                  <p className="text-aminah-gold/70 text-[9px] font-sans tracking-[0.2em] uppercase mb-2">{book.category}</p>
                  <Link href={`/bookstore/${book.id}`}>
                    <h3 className="text-xl md:text-2xl font-serif text-aminah-ivory mb-1 group-hover:text-aminah-gold transition-colors leading-snug">{book.title}</h3>
                  </Link>
                  <p className="text-aminah-ivory/50 font-serif italic text-sm mb-1">{book.author || "Unknown"}</p>
                  <p className="text-aminah-gold/50 font-sans tracking-widest text-[9px] uppercase mb-6">Pub: {book.publisher || "N/A"}</p>
                  
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