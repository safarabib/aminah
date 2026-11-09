"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { ArrowLeft, Clock, Loader2, BookOpen } from "lucide-react";

export default function ArticleReadPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      setArticle(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a110f] flex justify-center items-center">
        <Loader2 className="w-10 h-10 text-aminah-gold animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0a110f] flex flex-col justify-center items-center text-aminah-ivory font-serif">
        <BookOpen className="w-12 h-12 text-aminah-gold/50 mb-4" />
        <h1 className="text-3xl mb-4">Manuscript Not Found</h1>
        <Link href="/journal" className="text-aminah-gold text-sm tracking-widest font-sans uppercase hover:underline">Return to Journal</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-charcoal selection:bg-aminah-gold selection:text-aminah-green pt-32 pb-32 relative">
      
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        <Link href="/journal" className="group inline-flex items-center gap-3 text-aminah-gold/60 font-sans font-medium tracking-[0.2em] uppercase text-[10px] hover:text-aminah-gold transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Back to Journal
        </Link>

        {/* Article Header */}
        <header className="mb-16 text-center cinematic-reveal">
          <div className="flex items-center justify-center gap-4 text-aminah-gold/60 text-[10px] font-sans tracking-widest uppercase mb-6">
            <span>{formatDate(article.created_at)}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.read_time} read</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-aminah-ivory mb-8 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-aminah-ivory/50 font-serif italic text-lg">
            Penned by <span className="text-aminah-gold">{article.author}</span>
          </p>
        </header>

      </div>

      {/* Hero Image (Edge to edge on mobile, contained on desktop) */}
      {article.image_url && (
        <div className="w-full max-w-5xl mx-auto px-0 md:px-6 mb-16 cinematic-reveal">
          <div className="relative h-[40vh] md:h-[60vh] w-full border-y md:border border-aminah-gold/20 overflow-hidden">
            <img src={article.image_url} alt={article.title} className="w-full h-full object-cover grayscale-[30%]" />
            <div className="absolute inset-0 bg-[#0a110f]/20"></div>
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 text-aminah-ivory/80 font-serif text-lg md:text-xl leading-[2.2] space-y-8 cinematic-reveal">
        {/* Drop Cap for first paragraph */}
        <div className="whitespace-pre-wrap first-letter:text-7xl first-letter:font-bold first-letter:text-aminah-gold first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-line:tracking-widest">
          {article.body}
        </div>
      </article>

      {/* Footer / End Mark */}
      <div className="max-w-3xl mx-auto px-6 mt-20 text-center">
        <div className="w-12 h-px bg-aminah-gold/30 mx-auto mb-8"></div>
        <p className="text-aminah-gold/50 font-serif italic">End of Manuscript</p>
      </div>

    </main>
  );
}