"use client";

import { useState, useEffect } from "react";
import { Book, Plus, Loader2, FileText, Library, Trash2, Lock, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"books" | "library">("books");
  const [books, setBooks] = useState<any[]>([]);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Form states
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("AMINAH Publications");
  const [bookCategory, setBookCategory] = useState("Quran & Tafsir");
  const [bookPrice, setBookPrice] = useState("");
  const [bookFormat, setBookFormat] = useState("Hardcover");
  const [bookDesc, setBookDesc] = useState("");

  const [libTitle, setLibTitle] = useState("");
  const [libAuthor, setLibAuthor] = useState("Research Board");
  const [libCategory, setLibCategory] = useState("Qur'anic Science");
  const [libType, setLibType] = useState("PDF");
  const [libIsFree, setLibIsFree] = useState(true);
  const [libDesc, setLibDesc] = useState("");

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aminah123") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksRes, libRes] = await Promise.all([fetch("/api/books"), fetch("/api/library")]);
      const booksData = await booksRes.json();
      const libData = await libRes.json();
      
      setBooks(Array.isArray(booksData) ? booksData : []);
      setLibraryItems(Array.isArray(libData) ? libData : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: bookTitle, author: bookAuthor, category: bookCategory, price: bookPrice, format: bookFormat, description: bookDesc }),
    });
    setBookTitle(""); setBookPrice(""); setBookDesc("");
    fetchData();
    setAdding(false);
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/books?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleAddLibrary = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    await fetch("/api/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: libTitle, author: libAuthor, category: libCategory, type: libType, isFree: libIsFree, description: libDesc }),
    });
    setLibTitle(""); setLibDesc("");
    fetchData();
    setAdding(false);
  };

  const handleDeleteLibrary = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/library?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a110f] flex items-center justify-center font-serif text-aminah-ivory px-6">
        <div className="bg-[#111c19] border border-aminah-gold/30 p-10 max-w-md w-full shadow-[0_0_50px_rgba(197,164,109,0.1)]">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-aminah-gold/10 flex items-center justify-center border border-aminah-gold/20">
              <Lock className="w-6 h-6 text-aminah-gold" />
            </div>
          </div>
          <h1 className="text-3xl text-center text-aminah-gold mb-2">Admin Portal</h1>
          <p className="text-center text-aminah-ivory/50 font-sans text-xs tracking-widest uppercase mb-8">Authorized Access Only</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => {setPassword(e.target.value); setLoginError("");}}
                placeholder="Enter admin password" 
                className="w-full bg-[#0a110f] border border-aminah-gold/20 p-4 text-center text-aminah-ivory focus:outline-none focus:border-aminah-gold font-sans tracking-widest transition-colors"
              />
            </div>
            {loginError && <p className="text-red-500/80 text-xs text-center font-sans tracking-widest">{loginError}</p>}
            <button type="submit" className="w-full bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-sm py-4 hover:bg-aminah-ivory transition-colors">
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#0a110f] text-aminah-ivory pt-32 pb-20 px-6 font-serif">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 border-b border-aminah-gold/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl text-aminah-gold mb-2">Super Admin Dashboard</h1>
            <p className="text-aminah-ivory/60 italic font-sans text-sm tracking-widest uppercase">Platform Management (Supabase DB)</p>
          </div>
          <div className="flex gap-4 font-sans text-sm tracking-widest uppercase items-center">
            <button onClick={() => setActiveTab("books")} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "books" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}>
              <Book className="w-4 h-4" /> Books
            </button>
            <button onClick={() => setActiveTab("library")} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "library" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}>
              <Library className="w-4 h-4" /> Library
            </button>
            <button onClick={handleLogout} className="ml-4 text-aminah-gold/70 hover:text-red-500 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 bg-[#111c19] border border-aminah-gold/20 p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-aminah-gold/10 pb-4">
              <Plus className="w-5 h-5 text-aminah-gold" />
              <h2 className="text-xl">Add New {activeTab === "books" ? "Book" : "Library Item"}</h2>
            </div>
            {activeTab === "books" && (
              <form onSubmit={handleAddBook} className="space-y-5 font-sans">
                <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Book Title</label><input type="text" required value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Description</label><textarea required value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} rows={3} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"></textarea></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Author</label><input type="text" required value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Price (৳)</label><input type="number" required value={bookPrice} onChange={(e) => setBookPrice(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Format</label>
                    <select value={bookFormat} onChange={(e) => setBookFormat(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"><option>Hardcover</option><option>Paperback</option><option>Pocket Size</option><option>Set</option></select>
                  </div>
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Category</label>
                    <select value={bookCategory} onChange={(e) => setBookCategory(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"><option>Quran & Tafsir</option><option>Hadith</option><option>Aqeedah</option><option>Fiqh</option><option>Sirah</option></select>
                  </div>
                </div>
                <button type="submit" disabled={adding} className="w-full mt-4 bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-xs py-4 hover:bg-aminah-ivory transition-colors flex justify-center items-center gap-2">
                  {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Book"}
                </button>
              </form>
            )}
            {activeTab === "library" && (
              <form onSubmit={handleAddLibrary} className="space-y-5 font-sans">
                <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Document Title</label><input type="text" required value={libTitle} onChange={(e) => setLibTitle(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Description</label><textarea required value={libDesc} onChange={(e) => setLibDesc(e.target.value)} rows={3} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"></textarea></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Author</label><input type="text" required value={libAuthor} onChange={(e) => setLibAuthor(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Type</label>
                    <select value={libType} onChange={(e) => setLibType(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"><option>PDF</option><option>Article</option></select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Access</label>
                    <select value={libIsFree ? "free" : "premium"} onChange={(e) => setLibIsFree(e.target.value === "free")} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"><option value="free">Free</option><option value="premium">Premium</option></select>
                  </div>
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Category</label>
                    <select value={libCategory} onChange={(e) => setLibCategory(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"><option>Qur'anic Science</option><option>Aqeedah</option><option>Fiqh</option></select>
                  </div>
                </div>
                <button type="submit" disabled={adding} className="w-full mt-4 bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-xs py-4 hover:bg-aminah-ivory transition-colors flex justify-center items-center gap-2">
                  {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : "Upload to Library"}
                </button>
              </form>
            )}
          </div>
          <div className="lg:col-span-2 bg-[#111c19] border border-aminah-gold/20 p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-aminah-gold/10 pb-4">
              {activeTab === "books" ? <Book className="w-5 h-5 text-aminah-gold" /> : <FileText className="w-5 h-5 text-aminah-gold" />}
              <h2 className="text-xl">Database Records</h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-40"><Loader2 className="w-8 h-8 text-aminah-gold animate-spin" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === "books" && books.length === 0 && <p className="col-span-2 text-aminah-ivory/50 italic py-10 text-center">No books found.</p>}
                {activeTab === "books" && books.map((book) => (
                  <div key={book.id} className="bg-[#0a110f] border border-aminah-gold/10 p-4 hover:border-aminah-gold/40 transition-colors flex justify-between items-start group">
                    <div>
                      <h3 className="text-lg text-aminah-ivory">{book.title}</h3>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-aminah-gold mt-1 mb-2">{book.format} • {book.category}</p>
                      <p className="text-aminah-ivory font-sans bg-aminah-green px-3 py-1 text-sm border border-aminah-gold/20 inline-block">৳{book.price}</p>
                    </div>
                    <button onClick={() => handleDeleteBook(book.id)} className="text-red-500/50 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
                {activeTab === "library" && libraryItems.length === 0 && <p className="col-span-2 text-aminah-ivory/50 italic py-10 text-center">No library items found.</p>}
                {activeTab === "library" && libraryItems.map((item) => (
                  <div key={item.id} className="bg-[#0a110f] border border-aminah-gold/10 p-4 hover:border-aminah-gold/40 transition-colors flex justify-between items-start group">
                    <div>
                      <h3 className="text-lg text-aminah-ivory">{item.title}</h3>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-aminah-gold mt-1 mb-2">{item.type} • {item.category}</p>
                      <div className={`font-sans px-3 py-1 text-[10px] tracking-widest uppercase border inline-block ${item.isFree ? "bg-aminah-gold text-aminah-green border-aminah-gold" : "text-aminah-ivory border-aminah-gold/30"}`}>
                        {item.isFree ? "Free" : "Premium"}
                      </div>
                    </div>
                    <button onClick={() => handleDeleteLibrary(item.id)} className="text-red-500/50 hover:text-red-500 p-2"><Trash2 className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}