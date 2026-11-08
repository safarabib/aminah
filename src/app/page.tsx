"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Book, Library, GraduationCap, PenTool, X } from "lucide-react";

// Premium Quranic Quotes List
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
  
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [quote, setQuote] = useState<{text: string, ref: string} | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Cinematic Gateway Preloader State
  const [appState, setAppState] = useState<"loading" | "revealing" | "ready">("loading");
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3D Tilt States for Cards
  const [tiltStates, setTiltStates] = useState([
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 },
    { rotateX: 0, rotateY: 0 }
  ]);

  useEffect(() => {
    // 1. Cinematic Entry Sequence (Logo Preloader)
    setTimeout(() => setAppState("revealing"), 800);
    setTimeout(() => setAppState("ready"), 2500);

    // 2. Fetch Featured Books from Database
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        if (Array.isArray(data)) {
          const featured = data.filter((book: any) => book.is_featured);
          if (featured.length > 0) {
             setFeaturedBooks(featured.slice(0, 3));
          } else {
             setFeaturedBooks(data.slice(0, 3)); 
          }
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();

    // 3. Setup Random Quote
    setQuote(quranicQuotes[Math.floor(Math.random() * quranicQuotes.length)]);
    const timer = setTimeout(() => setShowPopup(true), 4000);

    // 4. Scroll Tracking
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(scrolled / maxScroll);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Ambient Glow Tracker
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  // 3D Tilt Logic
  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    const newTilts = [...tiltStates];
    newTilts[index] = { rotateX, rotateY };
    setTiltStates(newTilts);
  };

  const handleCardMouseLeave = (index: number) => {
    const newTilts = [...tiltStates];
    newTilts[index] = { rotateX: 0, rotateY: 0 };
    setTiltStates(newTilts);
  };

  // Original Fast Interactive Starry Sky Physics (Phone Touch + Mouse)
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
    const numStars = 1200; // Increased Stars!
    
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

    // Added touch events back for Mobile
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("touchend", handleLeave);
    
    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    const interactionRadius = 160; 
    const forceMultiplier = 120; // Snappy physics restored

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
    <main className="bg-[#0a110f] text-aminah-charcoal selection:bg-aminah-gold selection:text-aminah-green font-serif relative overflow-x-hidden min-h-screen">
      
      {/* 1. THE GATEWAY PRE-LOADER */}
      <div className={`fixed inset-0 z-[100] bg-[#050807] flex items-center justify-center transition-all duration-1000 pointer-events-none ${appState === "loading" ? "opacity-100" : appState === "revealing" ? "opacity-100" : "opacity-0"}`}>
        <div className={`transition-all duration-1000 ease-out transform ${appState === "loading" ? "scale-95 opacity-0 blur-sm" : appState === "revealing" ? "scale-100 opacity-100 blur-0" : "scale-110 opacity-0 blur-md"}`}>
          <img src="/logo.png" alt="AMINAH Logo" className="h-16 w-auto object-contain brightness-0 invert drop-shadow-[0_0_20px_rgba(197,164,109,0.5)]" />
        </div>
      </div>

      {/* 2. THE READING TORCH (Ambient Mouse Glow) */}
      <div 
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0 rounded-full blur-[120px] transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(197,164,109,0.08) 0%, rgba(197,164,109,0) 70%)',
          transform: `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`,
          opacity: appState === "ready" ? 1 : 0
        }}
      />

      {/* Aesthetic Quranic Popup */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-1000 transform ${showPopup ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        {quote && (
          <div className="bg-[#0a110f]/95 backdrop-blur-md border border-aminah-gold/30 p-6 shadow-[0_0_40px_rgba(197,164,109,0.15)] max-w-sm relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aminah-gold/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-aminah-gold/50 hover:text-aminah-gold transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-aminah-ivory italic text-lg leading-relaxed mb-4 pr-4 relative z-10">&quot;{quote.text}&quot;</p>
            <div className="w-10 h-px bg-aminah-gold/50 mb-3 relative z-10"></div>
            <p className="text-aminah-gold text-[10px] font-sans tracking-[0.2em] uppercase font-bold relative z-10">{quote.ref}</p>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#0a110f]">
        
        {/* CSS Cinematic Reveal Wrapper - Deep Black Sky */}
        <div className={`absolute inset-0 transition-opacity duration-[2000ms] ease-out ${appState === "ready" ? 'opacity-100' : 'opacity-0'}`}>
          <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a110f_100%)] z-0 opacity-90 pointer-events-none"></div>
        </div>

        <div className={`relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform ${appState === "ready" ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          
          <h2 className="text-aminah-gold/70 text-[10px] md:text-sm font-sans tracking-[0.4em] uppercase mb-8 pointer-events-none drop-shadow-[0_0_10px_rgba(197,164,109,0.3)]">
            An Institution for Qur&apos;anic Knowledge
          </h2>
          
          <div className="flex justify-center mb-8">
            <Link 
              href="https://proggamoyquran.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-6 py-3 bg-[#111c19]/40 backdrop-blur-md border border-aminah-gold/20 hover:border-aminah-gold/80 transition-all duration-700 rounded-full overflow-hidden shadow-[0_0_30px_rgba(197,164,109,0.05)] hover:shadow-[0_0_40px_rgba(197,164,109,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aminah-gold/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative text-aminah-gold/90 text-[10px] font-sans font-bold tracking-[0.2em] uppercase group-hover:text-aminah-ivory transition-colors z-10">
                Explore Proggamoy Quran
              </span>
              
              <div className="relative w-10 h-5 rounded-full border border-aminah-gold/40 bg-[#050807] flex items-center p-[2px] transition-colors z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-aminah-gold group-hover:translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_0_10px_rgba(197,164,109,0.8)]"></div>
              </div>
            </Link>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl text-aminah-ivory font-serif italic max-w-4xl leading-tight drop-shadow-2xl mb-12" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            &quot;Guided by Revelation.<br />
            <span className="text-aminah-gold">Building a Safer Tomorrow.&quot;</span>
          </h1>

          <div>
            <Link 
              href="/about" 
              className="relative inline-flex items-center justify-center px-10 py-4 text-xs font-sans font-bold tracking-[0.2em] uppercase text-aminah-gold overflow-hidden border border-aminah-gold/30 hover:border-aminah-gold group transition-all duration-700 rounded-sm hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(197,164,109,0.1)]"
            >
              <span className="absolute inset-0 w-full h-full bg-aminah-gold/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-aminah-ivory transition-colors duration-500">Know more About Aminah</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 3D MAGNETIC TILT CARDS */}
      <section className={`relative z-20 -mt-32 px-6 lg:px-12 max-w-[90rem] mx-auto transition-all duration-[1500ms] delay-500 transform ${appState === "ready" ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ perspective: '1000px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Bookstore", sub: "Official", icon: Book, link: "/bookstore" },
            { title: "Digital Library", sub: "Open Access", icon: Library, link: "/library" },
            { title: "Blogs & Articles", sub: "Research", icon: PenTool, link: "/explore" },
            { title: "Classes", sub: "Education", icon: GraduationCap, link: "/learning" },
          ].map((item, i) => (
            <Link 
              key={i} 
              href={item.link} 
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={() => handleCardMouseLeave(i)}
              className="group bg-[#111c19]/60 backdrop-blur-xl border border-aminah-gold/10 p-10 hover:border-aminah-gold/40 transition-all duration-300 flex flex-col justify-between h-72 overflow-hidden relative shadow-xl"
              style={{
                transform: `rotateX(${tiltStates[i].rotateX}deg) rotateY(${tiltStates[i].rotateY}deg)`,
                transformStyle: 'preserve-3d',
                boxShadow: tiltStates[i].rotateX !== 0 ? '0 30px 40px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              
              <item.icon 
                className="w-8 h-8 text-aminah-gold mb-6 transition-all duration-500 relative z-10" 
                style={{ transform: `translateZ(30px)` }} 
              />
              
              <div className="relative z-10" style={{ transform: `translateZ(20px)` }}>
                <p className="text-[10px] text-aminah-ivory/50 font-sans tracking-[0.2em] uppercase mb-2">{item.sub}</p>
                <h3 className="text-2xl text-aminah-ivory mb-4">{item.title}</h3>
                <div className="w-full h-px bg-aminah-gold/10 group-hover:bg-aminah-gold/50 transition-colors relative overflow-hidden">
                   <div className="absolute right-0 -top-2 text-aminah-gold opacity-0 group-hover:opacity-100 transition-all translate-x-6 group-hover:translate-x-0 duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Qur'anic Foundation - GLOWING GOLD TEXT UPDATE */}
      <section className="py-40 px-6 max-w-5xl mx-auto text-center relative z-10">
        <div className="transition-all duration-1000 ease-out" style={{ opacity: scrollProgress > 0.1 ? 1 : 0, transform: `translateY(${scrollProgress > 0.1 ? 0 : 40}px)` }}>
          
          {/* UPDATED: text-aminah-gold and drop-shadow added here */}
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-arabic text-aminah-gold mb-16 leading-[1.8] font-bold drop-shadow-[0_0_40px_rgba(197,164,109,0.2)]" dir="rtl">
            وَضَرَبَ اللّٰهُ مَثَلًا قَرْيَةً كَانَتْ اٰمِنَةً مُّطْمَئِنَّةً يَّاْتِيْهَا رِزْقُهَا رَغَدًا مِّنْ كُلِّ مَكَانٍ فَكَفَرَتْ بِاَنْعُمِ اللّٰهِ فَاَذَاقَهَا اللّٰهُ لِبَاسَ الْجُوْعِ وَالْخَوْفِ بِمَا كَانُوْا يَصْنَعُوْنَ
          </h2>
          
          <div className="w-12 h-px bg-aminah-gold/50 mx-auto mb-12"></div>
          <p className="text-xl md:text-3xl text-aminah-ivory/80 italic mb-8 leading-relaxed">
            &ldquo;And Allah presents an example: a city which was safe and secure, its provision coming to it abundantly from every location. But it denied the favors of Allah, so Allah made it taste the garb of hunger and fear for what they used to do.&rdquo;
          </p>
          <p className="text-xs font-sans font-bold text-aminah-gold tracking-[0.3em] uppercase">
            Surah An-Nahl, 16:112
          </p>
        </div>
      </section>

      {/* Featured Publications - Levitating Books */}
      <section className="py-32 bg-[#050807] text-aminah-ivory relative border-t border-aminah-gold/10 overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-aminah-gold/10 pb-8">
            <div>
              <p className="text-aminah-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-4">Curated Collection</p>
              <h2 className="text-4xl md:text-6xl font-serif text-aminah-ivory">Our Publications</h2>
            </div>
            <Link href="/bookstore" className="group flex items-center gap-3 text-aminah-gold font-sans font-medium tracking-[0.2em] uppercase text-xs hover:text-aminah-ivory transition-colors mt-6 md:mt-0">
              View All Books <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes levitate {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
              100% { transform: translateY(0px); }
            }
            .book-levitate { animation: levitate 6s ease-in-out infinite; }
            .book-levitate-delay { animation: levitate 7s ease-in-out infinite; animation-delay: 1s; }
            .book-levitate-delay-2 { animation: levitate 5s ease-in-out infinite; animation-delay: 2s; }
          `}} />

          {featuredBooks.length === 0 ? (
            <div className="flex justify-center items-center h-40">
               <p className="text-aminah-gold/30 font-sans tracking-widest text-sm uppercase animate-pulse">Loading publications...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              {featuredBooks.map((book: any, index: number) => (
                <Link 
                  href={`/bookstore/${book.id}`} 
                  key={book.id} 
                  className={`group cursor-pointer flex flex-col items-center transition-all duration-700 ease-out ${
                    index === 1 ? 'md:mt-12 book-levitate-delay' : index === 2 ? 'book-levitate-delay-2' : 'book-levitate'
                  }`}
                  style={{ 
                    opacity: scrollProgress > 0.25 ? 1 : 0, 
                    transform: `translateY(${scrollProgress > 0.25 ? 0 : 50}px)` 
                  }}
                >
                  <div className="w-full aspect-[3/4] bg-[#0a110f] border border-aminah-gold/10 mb-8 relative overflow-hidden flex items-center justify-center group-hover:border-aminah-gold/50 group-hover:shadow-[0_30px_50px_rgba(197,164,109,0.15)] transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a110f] to-transparent opacity-80 z-10 pointer-events-none"></div>
                    
                    {book.image_url ? (
                      <img src={book.image_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
                    ) : (
                      <Book className="w-16 h-16 text-aminah-gold/30 group-hover:scale-110 transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
                    )}

                    <div className="absolute top-4 right-4 z-20 bg-aminah-gold/90 backdrop-blur-sm text-aminah-green text-[9px] font-sans font-bold px-3 py-1.5 tracking-[0.2em] uppercase rounded-sm">{book.format}</div>
                  </div>
                  <div className="text-center w-full relative z-20">
                    <h3 className="text-2xl font-serif text-aminah-ivory mb-2 group-hover:text-aminah-gold transition-colors">{book.title}</h3>
                    <p className="text-aminah-ivory/40 font-serif italic mb-4">{book.author}</p>
                    <div className="w-8 h-px bg-aminah-gold/30 mx-auto mb-4 group-hover:w-16 transition-all duration-500"></div>
                    <p className="text-aminah-gold/90 font-sans tracking-widest text-sm">৳{book.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-32 bg-[#faf9f6] border-t border-aminah-gold/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 transition-all duration-1000" style={{ opacity: scrollProgress > 0.4 ? 1 : 0, transform: `translateY(${scrollProgress > 0.4 ? 0 : 30}px)` }}>
          <h2 className="text-4xl md:text-5xl text-aminah-green mb-6 font-serif">Stay Connected</h2>
          <p className="text-lg text-aminah-charcoal/70 italic mb-12 font-serif">
            Subscribe to receive periodic updates on new publications, scholarly articles, and upcoming events.
          </p>
          
          <form className="flex flex-col md:flex-row gap-8 justify-center items-end max-w-2xl mx-auto">
            <div className="flex-1 w-full text-left group">
              <label className="block text-[10px] font-sans font-bold text-aminah-gold tracking-[0.2em] uppercase mb-3 transition-colors group-focus-within:text-aminah-green">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-aminah-green/20 py-3 text-lg text-aminah-green focus:outline-none focus:border-aminah-gold transition-colors font-sans placeholder-aminah-green/30"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-aminah-green text-aminah-ivory px-12 py-4 font-sans font-medium tracking-[0.2em] uppercase text-xs hover:bg-aminah-charcoal hover:shadow-[0_15px_30px_rgba(10,17,15,0.15)] hover:-translate-y-1 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}