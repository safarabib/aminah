"use client";

import { useState, useEffect } from "react";
import { FileText, Download, BookOpen, Search, Loader2, ExternalLink } from "lucide-react";

const CATEGORIES = [
  "All", "Qur’an & Mushaf", "Tafsir (Exegesis)", "Hadith", "Aqeedah (Islamic Creed)", 
  "Fiqh (Islamic Jurisprudence)", "salah", "zakat", "sawm", "hajj", 
  "Seerah & Biographies", "Tasawwuf & Spirituality (Raqaiq)", 
  "Islamic History & Civilization", "Family, Parenting & Women in Islam", 
  "Comparative Religion & Dawah", "Islamic Ethics, Economics & Governance", 
  "Children & Youth Literature", "Quranic Science", "Health & Medical", "Business"
];

export default function DigitalLibrary() {
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Cinematic Reveal State
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cinematic Reveal Timer
    setTimeout(() => setIsLoaded(true), 150);

    fetch("/api/library")
      .then(res => res.json())
      .then(data => {
        setItemsList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load library items", err);
        setLoading(false);
      });
  }, []);

  const filteredItems = itemsList.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.publisher?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-32 font-serif relative overflow-hidden">
      
      {/* Cinematic Reveal Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
        }
        .reveal-item { animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
      `}} />

      {/* AMBIENT BACKGROUND GLOW */}
      <div className={`absolute top-[-10%] right-[10%] w-[50vw] h-[50vw] bg-aminah-gold/5 rounded-full blur-[150px] pointer-events-none transition-opacity duration-[2000ms] ${isLoaded ? 'opacity-100' : 'opacity-0'} z-0`}></div>

      <div className={`max-w-[90rem] mx-auto px-6 lg:px-12 mb-16 relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-end border-b border-aminah-gold/10 pb-12 gap-10 reveal-item">
          <div className="w-full lg:w-auto">
            <p className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Open Access
            </p>
            <h1 className="text-5xl md:text-7xl font-serif text-aminah-ivory mb-4 leading-tight drop-shadow-lg">Digital Library</h1>
            <p className="text-aminah-ivory/50 text-lg md:text-xl italic font-serif leading-relaxed max-w-2xl">
              Access our comprehensive repository of research papers, scholarly articles, and classical texts. Open knowledge for the sincere seeker.
            </p>
          </div>
          
          {/* Live Search & Filter Options (Glassmorphism) */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto mt-6 lg:mt-0">
            <div className="relative w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Search documents..." 
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
      
      {/* LIBRARY GRID */}
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 reveal-item delay-100">
            <Loader2 className="w-12 h-12 text-aminah-gold animate-spin mb-4" />
            <p className="text-aminah-gold/50 font-sans tracking-widest text-xs uppercase animate-pulse">Retrieving Archives...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-32 border border-aminah-gold/10 bg-[#111c19]/30 backdrop-blur-sm reveal-item delay-100 shadow-xl">
            <FileText className="w-16 h-16 text-aminah-gold/20 mx-auto mb-6" />
            <h2 className="text-3xl text-aminah-ivory mb-3 font-serif">No Documents Found</h2>
            <p className="text-aminah-ivory/40 italic font-serif">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 reveal-item delay-200">
            {filteredItems.map((item: any) => (
              <div key={item.id} className="group relative bg-[#111c19]/40 backdrop-blur-md border border-aminah-gold/10 p-8 flex flex-col h-full hover:border-aminah-gold/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(197,164,109,0.1)] transition-all duration-500 overflow-hidden">
                
                {/* Subtle Hover Gradient Inside Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-aminah-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="text-aminah-gold/60 group-hover:text-aminah-gold transition-colors duration-500">
                    {item.type === 'PDF' ? <FileText className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
                  </div>
                  <span className={`text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm shadow-md transition-colors ${item.isFree ? 'bg-aminah-gold text-aminah-green' : 'bg-[#0a110f] text-aminah-gold border border-aminah-gold/30'}`}>
                    {item.isFree ? "Free Access" : "Premium"}
                  </span>
                </div>
                
                <div className="flex-grow relative z-10">
                  <p className="text-aminah-gold/60 text-[9px] font-sans tracking-[0.2em] uppercase mb-3">{item.category}</p>
                  <h3 className="text-2xl font-serif text-aminah-ivory mb-3 group-hover:text-aminah-gold transition-colors leading-snug">{item.title}</h3>
                  <p className="text-aminah-ivory/50 font-serif italic text-sm mb-2">By {item.author || "Aminah Research Board"}</p>
                  <p className="text-aminah-gold/40 font-sans tracking-widest text-[9px] uppercase mb-6">Source: {item.publisher || "N/A"}</p>
                </div>
                
                {/* PDF Action Button */}
                <div className="mt-8 pt-6 border-t border-aminah-gold/10 relative z-10">
                  {item.file_url ? (
                    <a 
                      href={item.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="relative flex items-center justify-center gap-3 w-full border border-aminah-gold/30 py-4 text-xs font-sans font-bold tracking-[0.2em] uppercase text-aminah-gold group/btn overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(197,164,109,0.2)]"
                    >
                      <span className="absolute inset-0 w-full h-full bg-aminah-gold/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"></span>
                      <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-aminah-ivory transition-colors">
                        <ExternalLink className="w-4 h-4" /> Read Document
                      </span>
                    </a>
                  ) : (
                    <button disabled className="flex items-center justify-center gap-2 w-full bg-transparent text-aminah-ivory/20 border border-aminah-gold/10 py-4 text-xs font-sans font-bold tracking-[0.2em] uppercase cursor-not-allowed">
                      Archive Locked
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}