"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, Loader2 } from "lucide-react";

export default function JournalExplorePage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-32 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-aminah-gold/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 cinematic-reveal">
          <BookOpen className="w-10 h-10 text-aminah-gold mx-auto mb-6 opacity-80" />
          <h1 className="text-5xl md:text-6xl font-serif text-aminah-gold mb-6">The Journal</h1>
          <p className="text-aminah-ivory/60 font-serif italic text-lg leading-relaxed">
            A scholarly exploration of faith, intellect, and classical Islamic sciences. 
            Read our latest articles, reflections, and research manuscripts.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-aminah-gold animate-spin" />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center text-aminah-ivory/50 font-serif italic py-20">
            Manuscripts are currently being penned. Check back soon.
          </div>
        ) : (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((article) => (
              <Link href={`/journal/${article.id}`} key={article.id} className="group flex flex-col bg-[#111c19]/40 border border-aminah-gold/10 hover:border-aminah-gold/40 transition-all duration-500 overflow-hidden h-full">
                
                {/* Cover Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={article.image_url || "/placeholder.jpg"} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a110f] to-transparent opacity-80"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-aminah-gold/60 text-[10px] font-sans tracking-widest uppercase mb-4">
                    <span>{formatDate(article.created_at)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.read_time}</span>
                  </div>
                  
                  <h2 className="text-2xl font-serif text-aminah-ivory mb-4 group-hover:text-aminah-gold transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h2>
                  
                  <p className="text-aminah-ivory/60 font-serif text-sm line-clamp-3 mb-8 flex-grow leading-relaxed">
                    {article.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-aminah-gold text-xs font-sans tracking-[0.2em] uppercase font-bold group-hover:text-aminah-ivory transition-colors">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}