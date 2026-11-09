"use client";

import { useState, useEffect } from "react";
import { Book, Plus, Loader2, FileText, Library, Trash2, Lock, LogOut, Edit, UploadCloud, Star, Package, Clock, CheckCircle, Search, Eye, PenTool } from "lucide-react";
import { supabase } from "@/lib/supabase"; 

// Centralized Professional Category List
const CATEGORIES = [
  "Qur’an & Mushaf",
  "Tafsir (Exegesis)",
  "Hadith",
  "Aqeedah (Islamic Creed)",
  "Fiqh (Islamic Jurisprudence)",
  "salah",
  "zakat",
  "sawm",
  "hajj",
  "Seerah & Biographies",
  "Tasawwuf & Spirituality (Raqaiq)",
  "Islamic History & Civilization",
  "Family, Parenting & Women in Islam",
  "Comparative Religion & Dawah",
  "Islamic Ethics, Economics & Governance",
  "Children & Youth Literature",
  "Quranic Science",
  "Health & Medical",
  "Business"
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // ADDED "journal" to activeTab states
  const [activeTab, setActiveTab] = useState<"books" | "library" | "orders" | "journal">("orders");
  
  const [books, setBooks] = useState<any[]>([]);
  const [libraryItems, setLibraryItems] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]); // ADDED state for articles
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states - Books
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("AMINAH Publications"); 
  const [bookPublisher, setBookPublisher] = useState("AMINAH Publications"); 
  const [bookCategory, setBookCategory] = useState(CATEGORIES[0]);
  const [bookPrice, setBookPrice] = useState("0");
  const [bookFormat, setBookFormat] = useState("Paperback");
  const [bookDesc, setBookDesc] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [bookIsFeatured, setBookIsFeatured] = useState(false);

  // Form states - Library
  const [libTitle, setLibTitle] = useState("");
  const [libAuthor, setLibAuthor] = useState("Research Board"); 
  const [libPublisher, setLibPublisher] = useState("Research Board"); 
  const [libCategory, setLibCategory] = useState(CATEGORIES[0]);
  const [libType, setLibType] = useState("PDF");
  const [libIsFree, setLibIsFree] = useState(true);
  const [libDesc, setLibDesc] = useState("");
  const [libFileUrl, setLibFileUrl] = useState("");

  // Form states - Journal (Articles)
  const [artTitle, setArtTitle] = useState("");
  const [artAuthor, setArtAuthor] = useState("Aminah Research Board");
  const [artDesc, setArtDesc] = useState("");
  const [artBody, setArtBody] = useState("");
  const [artImage, setArtImage] = useState("");
  const [artReadTime, setArtReadTime] = useState("5 min");

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchData();
      fetchOrders(); 
      fetchArticles(); // ADDED fetchArticles call
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aminah123") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      fetchData();
      fetchOrders();
      fetchArticles(); // ADDED fetchArticles call
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

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
    } else {
      setOrders(data || []);
    }
  };

  // ADDED Fetch Articles function
  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setArticles(data || []);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      alert("Failed to update status");
      console.error(error);
    } else {
      fetchOrders(); 
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setBookTitle(""); setBookAuthor("AMINAH Publications"); setBookPublisher("AMINAH Publications"); setBookPrice("0"); setBookDesc(""); setBookImage(""); setBookCategory(CATEGORIES[0]); setBookFormat("Paperback"); setBookIsFeatured(false);
    setLibTitle(""); setLibAuthor("Research Board"); setLibPublisher("Research Board"); setLibDesc(""); setLibFileUrl(""); setLibCategory(CATEGORIES[0]);
    setArtTitle(""); setArtAuthor("Aminah Research Board"); setArtDesc(""); setArtBody(""); setArtImage(""); setArtReadTime("5 min"); // ADDED reset for articles
  };

  const handleEditClick = (item: any, type: "book" | "library" | "journal") => {
    setIsEditing(true);
    setEditingId(item.id);
    if (type === "book") {
      setActiveTab("books");
      setBookTitle(item.title);
      setBookAuthor(item.author || "AMINAH Publications");
      setBookPublisher(item.publisher || "AMINAH Publications");
      setBookCategory(item.category || CATEGORIES[0]);
      setBookPrice(item.price || "0");
      setBookFormat(item.format || "Paperback");
      setBookDesc(item.description || "");
      setBookImage(item.image_url || "");
      setBookIsFeatured(item.is_featured || false);
    } else if (type === "library") {
      setActiveTab("library");
      setLibTitle(item.title);
      setLibAuthor(item.author || "Research Board");
      setLibPublisher(item.publisher || "Research Board");
      setLibCategory(item.category || CATEGORIES[0]);
      setLibType(item.type || "PDF");
      setLibIsFree(item.isFree);
      setLibDesc(item.description || "");
      setLibFileUrl(item.file_url || "");
    } else if (type === "journal") {
      // ADDED Edit state for journal
      setActiveTab("journal");
      setArtTitle(item.title);
      setArtAuthor(item.author || "Aminah Research Board");
      setArtDesc(item.description || "");
      setArtBody(item.body || "");
      setArtImage(item.image_url || "");
      setArtReadTime(item.read_time || "5 min");
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
      
      if (bucket === 'book-covers') {
        // ADDED logic to set image for either book or journal based on activeTab
        if (activeTab === "journal") setArtImage(data.publicUrl);
        else setBookImage(data.publicUrl);
      } else {
        setLibFileUrl(data.publicUrl);
      }
      
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
    const body = { 
      id: editingId, 
      title: bookTitle, 
      author: bookAuthor, 
      publisher: bookPublisher, 
      category: bookCategory, 
      price: Number(bookPrice), 
      format: bookFormat, 
      description: bookDesc, 
      image_url: bookImage,
      is_featured: bookIsFeatured
    };
    
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

  const handleSaveLibrary = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const method = isEditing ? "PUT" : "POST";
    const body = { id: editingId, title: libTitle, author: libAuthor, publisher: libPublisher, category: libCategory, type: libType, isFree: libIsFree, description: libDesc, file_url: libFileUrl };
    
    await fetch("/api/library", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    resetForm();
    fetchData();
    setAdding(false);
  };

  const handleDeleteLibrary = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/library?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  // ADDED Handle Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const articleData = { 
      title: artTitle, 
      author: artAuthor, 
      description: artDesc, 
      body: artBody, 
      image_url: artImage, 
      read_time: artReadTime 
    };
    
    if (isEditing) {
      await supabase.from('articles').update(articleData).eq('id', editingId);
    } else {
      await supabase.from('articles').insert([articleData]);
    }
    
    resetForm(); 
    fetchArticles(); 
    setAdding(false);
  };

  // ADDED Handle Delete Article
  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    await supabase.from('articles').delete().eq('id', id);
    fetchArticles();
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
      <div className="max-w-[90rem] mx-auto">
        
        {/* Header Tabs */}
        <div className="mb-12 border-b border-aminah-gold/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl text-aminah-gold mb-2">Super Admin Dashboard</h1>
            <p className="text-aminah-ivory/60 italic font-sans text-sm tracking-widest uppercase">Platform Management (Supabase DB)</p>
          </div>
          <div className="flex flex-wrap gap-4 font-sans text-sm tracking-widest uppercase items-center">
            
            <button onClick={() => {setActiveTab("orders"); fetchOrders();}} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "orders" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}><Package className="w-4 h-4" /> Orders</button>
            <button onClick={() => {setActiveTab("books"); resetForm();}} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "books" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}><Book className="w-4 h-4" /> Books</button>
            <button onClick={() => {setActiveTab("library"); resetForm();}} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "library" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}><Library className="w-4 h-4" /> Library</button>
            
            {/* ADDED Journal Tab */}
            <button onClick={() => {setActiveTab("journal"); resetForm(); fetchArticles();}} className={`px-6 py-3 border transition-colors flex items-center gap-2 ${activeTab === "journal" ? "bg-aminah-gold text-aminah-green border-aminah-gold font-bold" : "bg-transparent text-aminah-ivory border-aminah-gold/30 hover:border-aminah-gold"}`}><PenTool className="w-4 h-4" /> Journal</button>
            
            <button onClick={handleLogout} className="ml-4 text-aminah-gold/70 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>

        {/* --- ORDERS TAB CONTENT --- */}
        {activeTab === "orders" && (
          <div className="bg-[#111c19]/60 backdrop-blur-md border border-aminah-gold/20 shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-aminah-gold/10 flex justify-between items-center bg-[#050807]/50">
              <h2 className="text-xl text-aminah-gold font-serif flex items-center gap-2">
                <Package className="w-5 h-5" /> Recent Orders
              </h2>
              <div className="text-aminah-ivory/60 text-xs font-sans tracking-widest uppercase">
                Total: {orders.length}
              </div>
            </div>

            <div className="overflow-x-auto">
              {orders.length === 0 ? (
                <div className="p-20 text-center text-aminah-ivory/50 font-serif italic">
                  No orders have been placed yet.
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#050807] text-aminah-gold/70 text-[10px] font-sans tracking-[0.2em] uppercase">
                      <th className="p-4 border-b border-aminah-gold/10">Order ID & Date</th>
                      <th className="p-4 border-b border-aminah-gold/10">Customer Details</th>
                      <th className="p-4 border-b border-aminah-gold/10">Ordered Items</th>
                      <th className="p-4 border-b border-aminah-gold/10">Total Amount</th>
                      <th className="p-4 border-b border-aminah-gold/10 text-center">Status Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-aminah-gold/5 hover:bg-aminah-gold/5 transition-colors">
                        
                        <td className="p-4">
                          <p className="text-aminah-ivory font-sans text-xs mb-1">#{order.id.slice(0, 8).toUpperCase()}</p>
                          <p className="text-aminah-ivory/40 font-sans text-[10px]">{formatDate(order.created_at)}</p>
                        </td>
                        
                        <td className="p-4">
                          <p className="text-aminah-gold font-serif text-sm">{order.customer_name}</p>
                          <p className="text-aminah-ivory/60 font-sans text-xs">{order.customer_phone}</p>
                          <p className="text-aminah-ivory/40 font-sans text-[10px] truncate max-w-[200px]">{order.delivery_address}</p>
                        </td>
                        
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            {order.order_items?.map((item: any, idx: number) => (
                              <span key={idx} className="text-aminah-ivory/80 font-sans text-xs line-clamp-1">
                                {item.quantity}x {item.title}
                              </span>
                            ))}
                          </div>
                        </td>
                        
                        <td className="p-4">
                          <p className="text-aminah-gold font-sans font-bold text-sm">৳{order.grand_total}</p>
                          <p className="text-aminah-ivory/40 font-sans text-[9px] uppercase tracking-widest">{order.payment_method}</p>
                        </td>
                        
                        <td className="p-4 text-center">
                          <select 
                            value={order.status || 'pending'}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className={`appearance-none outline-none cursor-pointer border px-4 py-1.5 rounded-full text-[9px] font-sans font-bold tracking-widest uppercase transition-colors text-center shadow-md
                              ${
                                order.status === 'delivered' ? 'bg-green-900/30 text-green-500 border-green-700/50' :
                                order.status === 'processing' ? 'bg-blue-900/30 text-blue-500 border-blue-700/50' :
                                order.status === 'cancelled' ? 'bg-red-900/30 text-red-500 border-red-700/50' :
                                'bg-yellow-900/30 text-yellow-500 border-yellow-700/50' // default pending
                              }
                            `}
                          >
                            <option value="pending" className="bg-[#111c19] text-yellow-500">PENDING</option>
                            <option value="processing" className="bg-[#111c19] text-blue-500">PROCESSING</option>
                            <option value="delivered" className="bg-[#111c19] text-green-500">DELIVERED</option>
                            <option value="cancelled" className="bg-[#111c19] text-red-500">CANCELLED</option>
                          </select>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* --- BOOKS, LIBRARY & JOURNAL TABS CONTENT --- */}
        {(activeTab === "books" || activeTab === "library" || activeTab === "journal") && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Form Column */}
            <div className="lg:col-span-1 bg-[#111c19] border border-aminah-gold/20 p-8 h-fit">
              <div className="flex items-center gap-3 mb-6 border-b border-aminah-gold/10 pb-4">
                {isEditing ? <Edit className="w-5 h-5 text-aminah-gold" /> : <Plus className="w-5 h-5 text-aminah-gold" />}
                <h2 className="text-xl">{isEditing ? "Edit" : "Add New"} {activeTab === "books" ? "Book" : activeTab === "library" ? "Library Item" : "Article"}</h2>
              </div>
              
              {/* BOOKS FORM */}
              {activeTab === "books" && (
                <form onSubmit={handleSaveBook} className="space-y-5 font-sans">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Book Title</label><input type="text" required value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Author Name</label><input type="text" required value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold text-sm" /></div>
                    <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Publisher</label><input type="text" required value={bookPublisher} onChange={(e) => setBookPublisher(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold text-sm" /></div>
                  </div>

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
                    
                    <div>
                      <label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Category</label>
                      <select value={bookCategory} onChange={(e) => setBookCategory(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold appearance-none cursor-pointer text-sm">
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-[#0a110f] border border-aminah-gold/20 p-4 mt-2">
                    <input type="checkbox" id="featureBook" checked={bookIsFeatured} onChange={(e) => setBookIsFeatured(e.target.checked)} className="w-4 h-4 accent-aminah-gold cursor-pointer" />
                    <label htmlFor="featureBook" className="text-xs text-aminah-ivory tracking-widest cursor-pointer select-none">Feature on Landing Page</label>
                  </div>
                  
                  <button type="submit" disabled={adding} className="w-full mt-4 bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-xs py-4 hover:bg-aminah-ivory transition-colors flex justify-center items-center gap-2">
                    {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Update Book" : "Publish Book"}
                  </button>
                  {isEditing && <button type="button" onClick={resetForm} className="w-full mt-2 border border-aminah-gold/30 text-aminah-ivory text-xs py-3 uppercase tracking-widest hover:border-aminah-gold transition-colors">Cancel Edit</button>}
                </form>
              )}

              {/* LIBRARY FORM */}
              {activeTab === "library" && (
                <form onSubmit={handleSaveLibrary} className="space-y-5 font-sans">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Document Title</label><input type="text" required value={libTitle} onChange={(e) => setLibTitle(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" /></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Author Name</label><input type="text" required value={libAuthor} onChange={(e) => setLibAuthor(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold text-sm" /></div>
                    <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Publisher</label><input type="text" required value={libPublisher} onChange={(e) => setLibPublisher(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold text-sm" /></div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">PDF Document</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="PDF URL..." value={libFileUrl} onChange={(e) => setLibFileUrl(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory text-sm focus:outline-none focus:border-aminah-gold" />
                      <label className="bg-aminah-gold/10 border border-aminah-gold/30 p-3 cursor-pointer hover:bg-aminah-gold/20 flex items-center justify-center min-w-[50px] transition-colors">
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin text-aminah-gold" /> : <UploadCloud className="w-5 h-5 text-aminah-gold" />}
                        <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileUpload(e, 'book-pdfs')} disabled={uploading} />
                      </label>
                    </div>
                    {libFileUrl && <p className="text-xs text-aminah-green mt-2">File Ready: {libFileUrl.split('/').pop()}</p>}
                  </div>

                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Description</label><textarea value={libDesc} onChange={(e) => setLibDesc(e.target.value)} rows={3} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"></textarea></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                      <label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Access</label>
                      <select value={libIsFree ? "true" : "false"} onChange={(e) => setLibIsFree(e.target.value === "true")} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold appearance-none cursor-pointer text-sm">
                        <option value="true">Free</option>
                        <option value="false">Premium</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Category</label>
                      <select value={libCategory} onChange={(e) => setLibCategory(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold appearance-none cursor-pointer text-sm">
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" disabled={adding} className="w-full mt-4 bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-xs py-4 hover:bg-aminah-ivory transition-colors flex justify-center items-center gap-2">
                    {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Update Item" : "Publish to Library"}
                  </button>
                  {isEditing && <button type="button" onClick={resetForm} className="w-full mt-2 border border-aminah-gold/30 text-aminah-ivory text-xs py-3 uppercase tracking-widest hover:border-aminah-gold transition-colors">Cancel Edit</button>}
                </form>
              )}

              {/* JOURNAL (ARTICLES) FORM ADDED HERE */}
              {activeTab === "journal" && (
                <form onSubmit={handleSaveArticle} className="space-y-5 font-sans">
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Article Title</label><input type="text" required value={artTitle} onChange={(e) => setArtTitle(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold" placeholder="Enter an engaging title..." /></div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Author Name</label><input type="text" required value={artAuthor} onChange={(e) => setArtAuthor(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold text-sm" /></div>
                    <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Read Time</label><input type="text" required value={artReadTime} onChange={(e) => setArtReadTime(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold text-sm" placeholder="e.g. 5 min" /></div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Cover Image</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Image URL..." value={artImage} onChange={(e) => setArtImage(e.target.value)} className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory text-sm focus:outline-none focus:border-aminah-gold" />
                      <label className="bg-aminah-gold/10 border border-aminah-gold/30 p-3 cursor-pointer hover:bg-aminah-gold/20 flex items-center justify-center min-w-[50px] transition-colors">
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin text-aminah-gold" /> : <UploadCloud className="w-5 h-5 text-aminah-gold" />}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'book-covers')} disabled={uploading} />
                      </label>
                    </div>
                    {artImage && <img src={artImage} alt="Preview" className="h-24 object-cover mt-2 border border-aminah-gold/30" />}
                  </div>

                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Short Introduction (Preview)</label><textarea value={artDesc} onChange={(e) => setArtDesc(e.target.value)} rows={2} placeholder="A short catchy summary to show on the explore page..." className="w-full bg-[#0a110f] border border-aminah-gold/20 p-3 text-aminah-ivory focus:outline-none focus:border-aminah-gold"></textarea></div>
                  
                  <div><label className="block text-[10px] text-aminah-gold tracking-[0.2em] uppercase mb-2">Full Article Body</label><textarea value={artBody} onChange={(e) => setArtBody(e.target.value)} rows={12} placeholder="Write your full scholarly article here. You can use markdown or plain text spacing..." className="w-full bg-[#0a110f] border border-aminah-gold/20 p-4 text-aminah-ivory focus:outline-none focus:border-aminah-gold font-serif text-sm leading-relaxed"></textarea></div>
                  
                  <button type="submit" disabled={adding} className="w-full mt-4 bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-xs py-4 hover:bg-aminah-ivory transition-colors flex justify-center items-center gap-2">
                    {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : isEditing ? "Update Article" : "Publish Journal"}
                  </button>
                  {isEditing && <button type="button" onClick={resetForm} className="w-full mt-2 border border-aminah-gold/30 text-aminah-ivory text-xs py-3 uppercase tracking-widest hover:border-aminah-gold transition-colors">Cancel Edit</button>}
                </form>
              )}
            </div>

            {/* Right List Column */}
            <div className="lg:col-span-2 bg-[#111c19] border border-aminah-gold/20 p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-aminah-gold/10 pb-4">
                {activeTab === "books" ? <Book className="w-5 h-5 text-aminah-gold" /> : activeTab === "library" ? <FileText className="w-5 h-5 text-aminah-gold" /> : <PenTool className="w-5 h-5 text-aminah-gold" />}
                <h2 className="text-xl">Database Records</h2>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center h-40"><Loader2 className="w-8 h-8 text-aminah-gold animate-spin" /></div>
              ) : (
                <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[800px] scrollbar-hide pr-2">
                  
                  {activeTab === "books" && books.map((book) => (
                    <div key={book.id} className={`bg-[#0a110f] border p-4 transition-colors flex justify-between items-center group ${book.is_featured ? 'border-aminah-gold/60 bg-[#111c19]/50 shadow-md' : 'border-aminah-gold/10 hover:border-aminah-gold/40'}`}>
                      <div className="flex items-center gap-4">
                        {book.image_url ? (
                           <img src={book.image_url} alt="cover" className="w-12 h-16 object-cover border border-aminah-gold/30" />
                        ) : (
                           <div className="w-12 h-16 bg-aminah-gold/5 border border-aminah-gold/20 flex items-center justify-center text-aminah-gold/30 text-xs">No Img</div>
                        )}
                        <div>
                          <h3 className="text-lg text-aminah-ivory flex items-center gap-2">
                            {book.title}
                            {book.is_featured && <Star className="w-4 h-4 text-aminah-gold fill-aminah-gold" />}
                          </h3>
                          <p className="text-aminah-ivory/50 font-serif italic text-xs mb-1">by {book.author || "Unknown"} | {book.publisher || "N/A"}</p>
                          <p className="text-[10px] font-sans tracking-widest uppercase text-aminah-gold mt-1 mb-2">{book.format} | {book.category}</p>
                          <p className="text-aminah-ivory font-sans bg-aminah-green px-3 py-1 text-xs border border-aminah-gold/20 inline-block">৳ {book.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(book, "book")} className="text-blue-400/50 hover:text-blue-400 p-2 border border-transparent hover:border-blue-400/30 rounded transition-colors"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => handleDeleteBook(book.id)} className="text-red-500/50 hover:text-red-500 p-2 border border-transparent hover:border-red-500/30 rounded transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ))}

                  {activeTab === "library" && libraryItems.map((item) => (
                    <div key={item.id} className="bg-[#0a110f] border border-aminah-gold/10 p-4 hover:border-aminah-gold/40 transition-colors flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-aminah-gold/5 border border-aminah-gold/20 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-aminah-gold/50" />
                        </div>
                        <div>
                          <h3 className="text-lg text-aminah-ivory">{item.title}</h3>
                          <p className="text-aminah-ivory/50 font-serif italic text-xs mb-1">by {item.author || "Unknown"} | {item.publisher || "N/A"}</p>
                          <p className="text-[10px] font-sans tracking-widest uppercase text-aminah-gold mt-1 mb-2">{item.category}</p>
                          <p className="text-aminah-ivory font-sans bg-aminah-green px-3 py-1 text-xs border border-aminah-gold/20 inline-block">{item.isFree ? "Free" : "Premium"}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(item, "library")} className="text-blue-400/50 hover:text-blue-400 p-2 border border-transparent hover:border-blue-400/30 rounded transition-colors"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => handleDeleteLibrary(item.id)} className="text-red-500/50 hover:text-red-500 p-2 border border-transparent hover:border-red-500/30 rounded transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ))}

                  {/* JOURNAL (ARTICLES) LIST ADDED HERE */}
                  {activeTab === "journal" && articles.map((article) => (
                    <div key={article.id} className="bg-[#0a110f] border border-aminah-gold/10 p-4 hover:border-aminah-gold/40 transition-colors flex justify-between items-start group">
                      <div className="flex gap-4">
                        {article.image_url ? (
                           <img src={article.image_url} alt="cover" className="w-20 h-16 object-cover border border-aminah-gold/30" />
                        ) : (
                           <div className="w-20 h-16 bg-aminah-gold/5 border border-aminah-gold/20 flex items-center justify-center text-aminah-gold/30 text-xs">No Img</div>
                        )}
                        <div>
                          <h3 className="text-lg text-aminah-ivory line-clamp-1">{article.title}</h3>
                          <p className="text-aminah-ivory/50 font-serif italic text-xs mb-1">by {article.author} • {formatDate(article.created_at)}</p>
                          <p className="text-aminah-ivory/70 font-sans text-xs line-clamp-1 mb-2 max-w-md">{article.description}</p>
                          <p className="text-[9px] font-sans tracking-widest uppercase text-aminah-gold border border-aminah-gold/20 px-2 py-0.5 inline-block bg-aminah-gold/5">Read time: {article.read_time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditClick(article, "journal")} className="text-blue-400/50 hover:text-blue-400 p-2 border border-transparent hover:border-blue-400/30 rounded transition-colors"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => handleDeleteArticle(article.id)} className="text-red-500/50 hover:text-red-500 p-2 border border-transparent hover:border-red-500/30 rounded transition-colors"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ))}
                  
                  {activeTab === "journal" && articles.length === 0 && (
                    <div className="p-10 text-center text-aminah-ivory/40 italic">No journal articles found. Publish your first one!</div>
                  )}

                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}