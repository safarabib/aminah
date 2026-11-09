"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, Clock, Users, ArrowRight, GraduationCap, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LearningPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setClasses(data);
    setLoading(false);
  };

  const filteredClasses = filter === "All" 
    ? classes 
    : classes.filter(c => c.type === filter);

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-charcoal pt-32 pb-32 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-aminah-gold/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Page Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto cinematic-reveal">
          <GraduationCap className="w-12 h-12 text-aminah-gold mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-aminah-ivory mb-6">Education & Classes</h1>
          <p className="text-lg text-aminah-ivory/60 font-serif italic leading-relaxed">
            Register for our weekly scholarly classes, special workshops, and intensive training programmes designed to revive classical Islamic sciences.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center cinematic-reveal">
          {["All", "Weekly Class", "Workshop", "Online Course", "Special Lecture"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                filter === f 
                  ? "bg-aminah-gold text-aminah-green border-aminah-gold shadow-[0_0_20px_rgba(197,164,109,0.3)]" 
                  : "bg-transparent text-aminah-ivory/70 border-aminah-gold/30 hover:border-aminah-gold hover:text-aminah-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Loading / Empty State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-aminah-gold animate-spin" />
          </div>
        ) : filteredClasses.length === 0 ? (
          <div className="text-center text-aminah-ivory/40 font-serif italic py-20 border border-aminah-gold/10 bg-[#111c19]/30">
            No programmes found for this category at the moment.
          </div>
        ) : (
          /* Programme Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses.map((prog) => (
              <div key={prog.id} className="group bg-[#111c19]/60 backdrop-blur-md border border-aminah-gold/10 hover:border-aminah-gold/40 transition-all duration-500 flex flex-col overflow-hidden shadow-lg">
                
                {/* Banner Image */}
                <div className="h-48 relative overflow-hidden bg-[#050807]">
                  {prog.image_url ? (
                    <img src={prog.image_url} alt={prog.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-aminah-gold/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111c19] to-transparent opacity-90"></div>
                  
                  <div className="absolute top-4 left-4 bg-aminah-gold/90 backdrop-blur-sm text-aminah-green text-[9px] font-sans font-bold px-3 py-1.5 uppercase tracking-[0.2em] rounded-sm shadow-md">
                    {prog.type}
                  </div>
                </div>
                
                {/* Details */}
                <div className="p-8 flex flex-col flex-1 relative z-10 -mt-6">
                  <h3 className="text-2xl font-serif text-aminah-ivory mb-2 leading-tight group-hover:text-aminah-gold transition-colors">{prog.title}</h3>
                  <p className="text-aminah-gold/80 font-serif italic text-sm mb-6 pb-4 border-b border-aminah-gold/10">By {prog.instructor}</p>
                  
                  <div className="space-y-4 mb-8 font-sans text-xs tracking-widest text-aminah-ivory/70 uppercase">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-aminah-gold" /> <span>{prog.date_info}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-aminah-gold" /> <span>{prog.time_info}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-aminah-gold" /> <span className="truncate">{prog.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-aminah-gold" /> <span>{prog.seats_available} Seats</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-aminah-gold/10 pt-6">
                    <span className="text-lg font-sans font-bold text-aminah-ivory">{prog.fee}</span>
                    <button className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-aminah-gold hover:text-aminah-ivory transition-colors">
                      Register <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
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