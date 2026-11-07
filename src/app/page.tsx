"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Book, Library, GraduationCap, PenTool, X } from "lucide-react";

// Premium Quranic Quotes List - Exactly as requested
const quranicQuotes = [
  { text: "What has deceived you concerning your Lord, the Most Generous?", ref: "Surah Al-Infitar (82:6)" },
  { text: "Has the time not come for the hearts of believers to humble themselves at the remembrance of Allah?", ref: "Surah Al-Hadid (57:16)" },
  { text: "Does man think that he will be left without purpose?", ref: "Surah Al-Qiyamah (75:36)" },
  { text: "Did you think that We created you without purpose?", ref: "Surah Al-Mu'minun (23:115)" },
  { text: "So which of the favours of your Lord will you deny?", ref: "Surah Ar-Rahman (55:13)" },
  { text: "Have you considered what would happen if your water disappeared into the earth? Who could bring you flowing water?", ref: "Surah Al-Mulk (67:30)" },
  { text: "Have you not reflected upon yourselves?", ref: "Surah Adh-Dhariyat (51:21)" },
  { text: "Do you think you will enter Paradise without being tested?", ref: "Surah Al-Baqarah (2:214)" },
  { text: "Were you created by nothing, or are you yourselves the creators?", ref: "Surah At-Tur (52:35)" },
  { text: "Do you command others to do good while forgetting yourselves?", ref: "Surah Al-Baqarah (2:44)" },
  { text: "Do you think you will enter Paradise without Allah making evident those among you who strive and remain steadfast?", ref: "Surah Aal-Imran (3:142)" },
  { text: "Have they not looked at the camels, how they were created?", ref: "Surah Al-Ghashiyah (88:17)" }
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // State for Dynamic Books and Popup
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [quote, setQuote] = useState<{text: string, ref: string} | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // 1. Fetch Database Books
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        if (Array.isArray(data)) {
          setFeaturedBooks(data.slice(0, 3)); // Get only latest 3 books
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();

    // 2. Setup Random Quote
    const randomQuote = quranicQuotes[Math.floor(Math.random() * quranicQuotes.length)];
    setQuote(randomQuote);
    
    // Show popup with a premium 1.5s delay
    const timer = setTimeout(() => setShowPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Advanced Interactive Starry Sky Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: any[] = [];
    const numStars = 800;
    
    let mouse = { x: -1000, y: -1000, active: false };

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.1) * (width * 1.2),
        y: (Math.random() - 0.1) * (height * 1.2),
        baseX: (Math.random() - 0.1) * (width * 1.2),
        baseY: (Math.random() - 0.1) * (height * 1.2),
        radius: Math.random() * 1.5 + 0.5, 
        speed: (Math.random() * 0.04) + 0.01,
        color: Math.random() > 0.85 ? "#C5A46D" : "#ffffff",
      });
    }

    const updateMousePos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseMove = (e: MouseEvent) => updateMousePos(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
    const handleLeave = () => { mouse.active = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("touchend", handleLeave);
    
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    const interactionRadius = 160; 
    const forceMultiplier = 120; 

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach((star) => {
        let targetX = star.baseX;
        let targetY = star.baseY;

        if (mouse.active) {
          const parallaxX = (mouse.x - width / 2) * star.speed;
          const parallaxY = (mouse.y - height / 2) * star.speed;
          targetX -= parallaxX;
          targetY -= parallaxY;

          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const pushX = (dx / distance) * force * forceMultiplier;
            const pushY = (dy / distance) * force * forceMultiplier;
            
            targetX += pushX;
            targetY += pushY;
          }
        }

        star.x += (targetX - star.x) * 0.08;
        star.y += (targetY - star.y) * 0.08;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.random() * 0.3 + 0.7; 
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("touchend", handleLeave);
    };
  }, []);

  return (
    <main className="bg-aminah-ivory text-aminah-charcoal selection:bg-aminah-gold selection:text-aminah-green font-serif relative">
      
      {/* Aesthetic Quranic Popup */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-1000 transform ${showPopup ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        {quote && (
          <div className="bg-[#0a110f]/95 backdrop-blur-md border border-aminah-gold/30 p-6 shadow-[0_0_40px_rgba(197,164,109,0.15)] max-w-sm relative group">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-aminah-gold/50 hover:text-aminah-gold transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-aminah-ivory italic text-lg leading-relaxed mb-4 pr-4">&quot;{quote.text}&quot;</p>
            <div className="w-10 h-px bg-aminah-gold/50 mb-3"></div>
            <p className="text-aminah-gold text-[10px] font-sans tracking-[0.2em] uppercase font-bold">{quote.ref}</p>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a110f]">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a110f_100%)] z-0 opacity-80 pointer-events-none"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 flex flex-col items-center">
          
          <h2 className="text-aminah-gold/80 text-sm md:text-base font-sans tracking-[0.3em] uppercase mb-8 pointer-events-none">
            An Institution for Qur&apos;anic Knowledge
          </h2>
          
          {/* Aesthetic Switch Button for Proggamoy Quran */}
          <div className="flex justify-center mb-8">
            <Link 
              href="https://proggamoyquran.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-6 py-3 bg-[#111c19]/50 backdrop-blur-sm border border-aminah-gold/30 hover:border-aminah-gold transition-all duration-500 rounded-full overflow-hidden shadow-[0_0_20px_rgba(197,164,109,0.05)] hover:shadow-[0_0_30px_rgba(197,164,109,0.15)]"
            >
              <span className="relative text-aminah-gold text-[10px] font-sans font-bold tracking-[0.2em] uppercase group-hover:text-aminah-ivory transition-colors z-10">
                Explore Proggamoy Quran
              </span>
              
              <div className="relative w-10 h-5 rounded-full border border-aminah-gold/50 bg-[#0a110f] flex items-center p-[2px] transition-colors z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-aminah-gold group-hover:translate-x-5 transition-transform duration-500 ease-out shadow-[0_0_10px_rgba(197,164,109,0.8)]"></div>
              </div>
            </Link>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl text-aminah-ivory font-serif italic max-w-3xl leading-snug drop-shadow-md mb-12">
            &quot;Guided by Revelation.<br />
            <span className="text-aminah-gold">Building a Safer Tomorrow.&quot;</span>
          </h1>

          {/* NEW: About Aminah Button */}
          <div>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center border border-aminah-gold/40 hover:border-aminah-gold bg-transparent hover:bg-aminah-gold/10 text-aminah-gold px-8 py-4 uppercase tracking-[0.2em] text-xs font-sans font-bold transition-all duration-500"
            >
              Know more About Aminah
            </Link>
          </div>

        </div>
      </section>

      {/* Direct Tabs */}
      <section className="relative z-20 -mt-24 px-6 lg:px-12 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/bookstore" className="group bg-[#111c19]/80 backdrop-blur-xl border border-aminah-gold/20 p-10 hover:bg-aminah-green transition-all duration-500 flex flex-col justify-between h-64">
            <Book className="w-8 h-8 text-aminah-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
            <div>
              <p className="text-[10px] text-aminah-ivory/50 font-sans tracking-[0.2em] uppercase mb-2">Official</p>
              <h3 className="text-2xl text-aminah-ivory mb-4">Bookstore</h3>
              <div className="w-full h-px bg-aminah-gold/20 group-hover:bg-aminah-gold transition-colors relative">
                <div className="absolute right-0 -top-2 text-aminah-gold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
          <Link href="/library" className="group bg-[#111c19]/80 backdrop-blur-xl border border-aminah-gold/20 p-10 hover:bg-aminah-green transition-all duration-500 flex flex-col justify-between h-64">
            <Library className="w-8 h-8 text-aminah-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
            <div>
              <p className="text-[10px] text-aminah-ivory/50 font-sans tracking-[0.2em] uppercase mb-2">Open Access</p>
              <h3 className="text-2xl text-aminah-ivory mb-4">Digital Library</h3>
              <div className="w-full h-px bg-aminah-gold/20 group-hover:bg-aminah-gold transition-colors relative">
                <div className="absolute right-0 -top-2 text-aminah-gold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
          <Link href="/explore" className="group bg-[#111c19]/80 backdrop-blur-xl border border-aminah-gold/20 p-10 hover:bg-aminah-green transition-all duration-500 flex flex-col justify-between h-64">
            <PenTool className="w-8 h-8 text-aminah-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
            <div>
              <p className="text-[10px] text-aminah-ivory/50 font-sans tracking-[0.2em] uppercase mb-2">Research</p>
              <h3 className="text-2xl text-aminah-ivory mb-4">Blogs & Articles</h3>
              <div className="w-full h-px bg-aminah-gold/20 group-hover:bg-aminah-gold transition-colors relative">
                <div className="absolute right-0 -top-2 text-aminah-gold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
          <Link href="/learning" className="group bg-[#111c19]/80 backdrop-blur-xl border border-aminah-gold/20 p-10 hover:bg-aminah-green transition-all duration-500 flex flex-col justify-between h-64">
            <GraduationCap className="w-8 h-8 text-aminah-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
            <div>
              <p className="text-[10px] text-aminah-ivory/50 font-sans tracking-[0.2em] uppercase mb-2">Education</p>
              <h3 className="text-2xl text-aminah-ivory mb-4">Classes & Workshops</h3>
              <div className="w-full h-px bg-aminah-gold/20 group-hover:bg-aminah-gold transition-colors relative">
                <div className="absolute right-0 -top-2 text-aminah-gold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Qur'anic Foundation */}
      <section className="py-40 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-arabic text-aminah-green mb-16 leading-[1.8] font-bold" dir="rtl">
          وَضَرَبَ اللّٰهُ مَثَلًا قَرْيَةً كَانَتْ اٰمِنَةً مُّطْمَئِنَّةً يَّاْتِيْهَا رِزْقُهَا رَغَدًا مِّنْ كُلِّ مَكَانٍ فَكَفَرَتْ بِاَنْعُمِ اللّٰهِ فَاَذَاقَهَا اللّٰهُ لِبَاسَ الْجُوْعِ وَالْخَوْفِ بِمَا كَانُوْا يَصْنَعُوْنَ
        </h2>
        <div className="w-12 h-px bg-aminah-gold mx-auto mb-12"></div>
        <p className="text-xl md:text-3xl text-aminah-charcoal/80 italic mb-8 leading-relaxed">
          &ldquo;And Allah presents an example: a city which was safe and secure, its provision coming to it abundantly from every location. But it denied the favors of Allah, so Allah made it taste the garb of hunger and fear for what they used to do.&rdquo;
        </p>
        <p className="text-xs font-sans font-bold text-aminah-gold tracking-[0.3em] uppercase">
          Surah An-Nahl, 16:112
        </p>
      </section>

      {/* Featured Publications - Dynamic Data Connection */}
      <section className="py-32 bg-[#0a110f] text-aminah-ivory relative border-t border-aminah-gold/10">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-aminah-gold/20 pb-8">
            <div>
              <p className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-4">Curated Collection</p>
              <h2 className="text-4xl md:text-6xl font-serif text-aminah-ivory">Our Publications</h2>
            </div>
            <Link href="/bookstore" className="group flex items-center gap-3 text-aminah-gold font-sans font-medium tracking-[0.2em] uppercase text-xs hover:text-aminah-ivory transition-colors mt-6 md:mt-0">
              View All Books <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {featuredBooks.length === 0 ? (
            <div className="flex justify-center items-center h-40">
               <p className="text-aminah-gold/50 font-sans tracking-widest text-sm uppercase">Loading publications...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              {featuredBooks.map((book: any, index: number) => (
                <Link href={`/bookstore/${book.id}`} key={book.id} className={`group cursor-pointer flex flex-col items-center ${index === 1 ? 'md:mt-12' : ''}`}>
                  <div className="w-full aspect-[3/4] bg-aminah-green/20 border border-aminah-gold/20 mb-8 relative overflow-hidden flex items-center justify-center group-hover:border-aminah-gold/50 group-hover:shadow-[0_0_30px_rgba(197,164,109,0.1)] transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a110f] to-transparent opacity-80 z-10"></div>
                    
                    {/* Database Image Render */}
                    {book.image_url ? (
                      <img src={book.image_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" />
                    ) : (
                      <Book className="w-16 h-16 text-aminah-gold/30 group-hover:scale-110 transition-transform duration-700 z-0" />
                    )}

                    <div className="absolute top-4 right-4 z-20 bg-aminah-gold text-aminah-green text-[9px] font-sans font-bold px-2 py-1 tracking-[0.2em] uppercase">{book.format}</div>
                  </div>
                  <div className="text-center w-full">
                    <h3 className="text-2xl font-serif text-aminah-ivory mb-2 group-hover:text-aminah-gold transition-colors">{book.title}</h3>
                    <p className="text-aminah-ivory/50 font-serif italic mb-4">{book.author}</p>
                    <div className="w-8 h-px bg-aminah-gold/50 mx-auto mb-4"></div>
                    <p className="text-aminah-gold font-sans tracking-widest text-sm">৳{book.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-32 bg-white border-t border-aminah-gold/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl text-aminah-green mb-6">Stay Connected</h2>
          <p className="text-lg text-aminah-charcoal/70 italic mb-12">
            Subscribe to receive periodic updates on new publications, scholarly articles, and upcoming events.
          </p>
          
          <form className="flex flex-col md:flex-row gap-8 justify-center items-end max-w-2xl mx-auto">
            <div className="flex-1 w-full text-left">
              <label className="block text-[10px] font-sans font-bold text-aminah-gold tracking-[0.2em] uppercase mb-3">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-aminah-green/30 py-3 text-lg text-aminah-green focus:outline-none focus:border-aminah-gold transition-colors font-sans"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-aminah-green text-aminah-ivory px-12 py-4 font-sans font-medium tracking-[0.2em] uppercase text-xs hover:bg-aminah-charcoal hover:shadow-xl transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}