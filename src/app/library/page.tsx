import { supabase } from "@/lib/supabase";
import { FileText, Download, BookOpen } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function DigitalLibrary() {
  const { data: libraryItems } = await supabase.from('library_items').select('*').order('createdAt', { ascending: false });
  const itemsList = libraryItems || [];

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-32 font-serif">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-aminah-gold/20 pb-8">
          <div>
            <p className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-4">Open Access</p>
            <h1 className="text-4xl md:text-6xl text-aminah-ivory">Digital Library</h1>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        {itemsList.length === 0 ? (
          <div className="text-center py-32"><FileText className="w-12 h-12 text-aminah-gold/30 mx-auto mb-4" /><h2 className="text-2xl text-aminah-ivory mb-2">Library is Empty</h2></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemsList.map((item: any) => (
              <div key={item.id} className="group bg-[#111c19] border border-aminah-gold/20 p-8 flex flex-col h-full hover:border-aminah-gold/50 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-aminah-gold">{item.type === 'PDF' ? <Download className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}</div>
                  <span className="text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-aminah-green bg-aminah-gold px-2 py-1">{item.isFree ? "Free" : "Premium"}</span>
                </div>
                <div className="flex-grow">
                  <p className="text-aminah-gold/70 text-[10px] font-sans tracking-[0.2em] uppercase mb-3">{item.category}</p>
                  <h3 className="text-2xl font-serif text-aminah-ivory mb-3 group-hover:text-aminah-gold transition-colors">{item.title}</h3>
                  <p className="text-aminah-ivory/50 font-serif italic text-sm mb-6">by {item.author}</p>
                </div>
                
                {/* PDF Download Button */}
                <div className="mt-6 pt-6 border-t border-aminah-gold/20">
                  {item.file_url ? (
                    <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-aminah-gold/10 hover:bg-aminah-gold text-aminah-gold hover:text-aminah-green border border-aminah-gold/30 py-3 transition-colors text-xs font-sans font-bold tracking-[0.2em] uppercase">
                      <Download className="w-4 h-4" /> Download PDF
                    </a>
                  ) : (
                    <button disabled className="flex items-center justify-center gap-2 w-full bg-transparent text-aminah-ivory/30 border border-aminah-gold/10 py-3 text-xs font-sans font-bold tracking-[0.2em] uppercase cursor-not-allowed">
                      File Unavailable
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