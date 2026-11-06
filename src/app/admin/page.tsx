"use client";

import { useState, useEffect } from "react";
import { Book, Plus, Loader2, FileText, Library, Trash2, Lock, LogOut, Edit, UploadCloud } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Supabase client setup for direct file uploads
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"books" | "library">("books");
  const [books, setBooks] = useState<any[]>([]);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("AMINAH Publications");
  const [bookCategory, setBookCategory] = useState("General");
  const [bookPrice, setBookPrice] = useState("0");
  const [bookFormat, setBookFormat] = useState("Paperback");
  const [bookDesc, setBookDesc] = useState("");
  const [bookImage, setBookImage] = useState("");

  const [libTitle, setLibTitle] = useState("");
  const [libAuthor, setLibAuthor] = useState("Research Board");
  const [libCategory, setLibCategory] = useState("Qur'anic Science");
  const [libType, setLibType] = useState("PDF");
  const [libIsFree, setLibIsFree] = useState(true);
  const [libDesc, setLibDesc] = useState("");
  const [libFileUrl, setLibFileUrl] = useState("");

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

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setBookTitle(""); setBookPrice("0"); setBookDesc(""); setBookImage(""); setBookCategory("General"); setBookFormat("Paperback");
    setLibTitle(""); setLibDesc(""); setLibFileUrl("");
  };

  const handleEditClick = (item: any, type: "book" | "library") => {
    setIsEditing(true);
    setEditingId(item.id);
    if (type === "book") {
      setActiveTab("books");
      setBookTitle(item.title);
      setBookAuthor(item.author || "AMINAH Publications");
      setBookCategory(item.category || "General");
      setBookPrice(item.price || "0");
      setBookFormat(item.format || "Paperback");
      setBookDesc(item.description || "");
      setBookImage(item.image_url || "");
    } else {
      setActiveTab("library");
      setLibTitle(item.title);
      setLibAuthor(item.author || "Research Board");
      setLibCategory(item.category || "Qur'anic Science");
      setLibType(item.type || "PDF");
      setLibIsFree(item.isFree);
      setLibDesc(item.description || "");
      setLibFileUrl(item.file_url || "");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, bucket: 'book-covers' | 'book-pdfs') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file);
      
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      
      if (bucket === 'book-covers') setBookImage(data.publicUrl);
      else setLibFileUrl(data.publicUrl);
      
    } catch (error) {
      console.error('Upload Error:', error);
      alert('File upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const method = isEditing ? "PUT" : "POST";
    const body = { id: editingId, title: bookTitle, author: bookAuthor, category: bookCategory, price: Number(bookPrice), format: bookFormat, description: bookDesc, image_url: bookImage };
    
    await fetch("/api/books", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    resetForm();
    fetchData();
    setAdding(false);
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/books?id=${id}`, { method: "DELETE" });
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
              <input type="password" value={password} onChange={(e) => {setPassword(e.target.value); setLoginError("");}} placeholder="Enter admin password" className="w-full bg-[#0a110f] border border-aminah-gold/20 p-4 text-center text-aminah-ivory focus:outline-none focus:border-aminah-gold font-sans tracking-widest transition-colors" />
            </div>
            {loginError && <p className="text-red-500/80 text-xs text-center font-sans tracking-widest">{loginError}</p>}
            <button type="submit" className="w-full bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-sm py-4 hover:bg-aminah-ivory transition-colors">Enter Dashboard</button>
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
            <button onClick={() => {setActiveTab("books"); resetForm();}} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "books" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}><Book className="w-4 h-4" /> Books</button>
            <button onClick={() => {setActiveTab("library"); resetForm();}} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "library" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}><Library className="w-4 h-4" /> Library</button>
            <button onClick={handleLogout} className="ml-4 text-aminah-gold/70 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Form Column */}
          <div className="lg:col-span-1 bg-[#111c19] border border-aminah-gold/20 p-8 h-fit">
            <div className="flex items-center gap-3 mb-6 border-b border-aminah-gold/10 pb-4">
              {isEditing ? <Edit className="w-5 h-5 text-aminah-gold" /> : <Plus className="w-5 h-5 text-aminah-gold" />}
              <h2 className="text-xl">{isEditing ? "Edit" : "Add New"} {activeTab === "books" ? "Book" : "Library Item"}</h2>
            </div>
            
            {activeTab === "books" && (
              <form onSubmit={handleSaveBook} className="space-y-5 font-sans">
                <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Book Title</label><input type="text" required value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                
                {/* Image Upload Area */}
                <div>
                  <label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Cover Image</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Image URL..." value={bookImage} onChange={(e) => setBookImage(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory text-sm focus:outline-none focus:border-aminah-gold" />
                    <label className="bg-aminah-gold/10 border border-aminah-gold/30 p-3 cursor-pointer hover:bg-aminah-gold/20 flex items-center justify-center min-w-[50px] transition-colors">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin text-aminah-gold" /> : <UploadCloud className="w-5 h-5 text-aminah-gold" />}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'book-covers')} disabled={uploading} />
                    </label>
                  </div>
                  {bookImage && <img src={bookImage} alt="Preview" className="h-24 object-cover mt-2 border border-aminah-gold/30" />}
                </div>

                <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Description</label><textarea value={bookDesc} onChange={(e) => setBookDesc(e.target.value)} rows={3} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"></textarea></div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Price (৳)</label><input type="number" required value={bookPrice} onChange={(e) => setBookPrice(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Category</label><input type="text" value={bookCategory} onChange={(e) => setBookCategory(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                </div>
                
                <button type="submit" disabled={adding} className="w-full mt-4 bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-xs py-4 hover:bg-aminah-ivory transition-colors flex justify-center items-center gap-2">
                  {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Update Book" : "Publish Book"}
                </button>
                {isEditing && <button type="button" onClick={resetForm} className="w-full mt-2 border border-aminah-gold/30 text-aminah-ivory text-xs py-3 uppercase tracking-widest hover:border-aminah-gold transition-colors">Cancel Edit</button>}
              </form>
            )}
          </div>

          {/* Right List Column */}
          <div className="lg:col-span-2 bg-[#111c19] border border-aminah-gold/20 p-8">
            <div className="flex items-center gap-3 mb-6 border-b border-aminah-gold/10 pb-4">
              {activeTab === "books" ? <Book className="w-5 h-5 text-aminah-gold" /> : <FileText className="w-5 h-5 text-aminah-gold" />}
              <h2 className="text-xl">Database Records</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-40"><Loader2 className="w-8 h-8 text-aminah-gold animate-spin" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {activeTab === "books" && books.map((book) => (
                  <div key={book.id} className="bg-[#0a110f] border border-aminah-gold/10 p-4 hover:border-aminah-gold/40 transition-colors flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      {book.image_url ? (
                         <img src={book.image_url} alt="cover" className="w-12 h-16 object-cover border border-aminah-gold/30" />
                      ) : (
                         <div className="w-12 h-16 bg-aminah-gold/5 border border-aminah-gold/20 flex items-center justify-center text-aminah-gold/30 text-xs">No Img</div>
                      )}
                      <div>
                        <h3 className="text-lg text-aminah-ivory">{book.title}</h3>
                        <p className="text-[10px] font-sans tracking-widest uppercase text-aminah-gold mt-1 mb-2">{book.format} • {book.category}</p>
                        <p className="text-aminah-ivory font-sans bg-aminah-green px-3 py-1 text-xs border border-aminah-gold/20 inline-block">৳ {book.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditClick(book, "book")} className="text-blue-400/50 hover:text-blue-400 p-2 border border-transparent hover:border-blue-400/30 rounded transition-colors"><Edit className="w-5 h-5" /></button>
                      <button onClick={() => handleDeleteBook(book.id)} className="text-red-500/50 hover:text-red-500 p-2 border border-transparent hover:border-red-500/30 rounded transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
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