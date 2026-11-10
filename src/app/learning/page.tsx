"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, Clock, Users, ArrowRight, GraduationCap, Loader2, X, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LearningPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Registration Modal States
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    reference: ""
  });

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

  // Handle opening modal
  const handleOpenRegistration = (prog: any) => {
    setSelectedClass(prog);
    setRegSuccess(false);
    setIsModalOpen(true);
    // Reset form
    setFormData({ name: "", phone: "", email: "", address: "", reference: "" });
  };

  // Handle Form Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);

    const regData = {
      class_title: selectedClass.title,
      student_name: formData.name,
      student_phone: formData.phone,
      student_email: formData.email,
      address: formData.address,
      reference: formData.reference,
      payment_status: "Pending" // Default status
    };

    const { error } = await supabase.from('class_registrations').insert([regData]);

    if (error) {
      console.error("Registration Error:", error);
      alert("Failed to register. Please try again later.");
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
      setRegSuccess(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-charcoal pt-32 pb-32 relative overflow-hidden font-serif">
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
                    <button 
                      onClick={() => handleOpenRegistration(prog)}
                      className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-aminah-gold hover:text-aminah-ivory transition-colors cursor-pointer"
                    >
                      Register <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REGISTRATION MODAL POPUP */}
        {isModalOpen && selectedClass && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            
            {/* Modal Content */}
            <div className="relative bg-[#0a110f] border border-aminah-gold/30 max-w-lg w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-300">
              
              <div className="flex justify-between items-center p-6 border-b border-aminah-gold/10 bg-[#111c19]/50">
                <h2 className="text-aminah-gold font-serif text-xl">Class Registration</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-aminah-ivory/50 hover:text-aminah-gold transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 scrollbar-hide">
                
                {regSuccess ? (
                  /* Success State */
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <ShieldCheck className="w-16 h-16 text-aminah-gold mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(197,164,109,0.4)]" />
                    <h3 className="text-2xl font-serif text-aminah-ivory mb-2">Application Received</h3>
                    <p className="text-aminah-ivory/60 font-serif italic mb-6">
                      JazakAllah Khair! Your registration request for <strong>{selectedClass.title}</strong> has been sent to our admin. We will review and contact you with confirmation & payment details shortly.
                    </p>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="bg-aminah-gold text-aminah-green px-8 py-3 font-sans font-bold tracking-widest text-xs uppercase hover:bg-aminah-ivory transition-colors w-full cursor-pointer"
                    >
                      Close & Return
                    </button>
                  </div>
                ) : (
                  /* Form State */
                  <>
                    <div className="mb-6 p-4 border border-aminah-gold/20 bg-aminah-gold/5 rounded-sm">
                      <p className="text-aminah-ivory/50 font-sans text-[10px] tracking-widest uppercase mb-1">Applying for:</p>
                      <h4 className="text-aminah-ivory font-serif text-lg leading-tight">{selectedClass.title}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-aminah-gold font-sans font-bold text-xs uppercase tracking-widest">{selectedClass.fee}</span>
                        <span className="text-aminah-ivory/50 font-sans text-xs flex items-center gap-1"><Clock className="w-3 h-3 text-aminah-gold/50" /> {selectedClass.time_info}</span>
                      </div>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="space-y-5 font-sans">
                      <div>
                        <label className="block text-[10px] font-bold text-aminah-gold tracking-[0.2em] uppercase mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})} 
                          className="w-full bg-[#111c19] border border-aminah-gold/20 p-3.5 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold transition-colors" 
                          placeholder="Abdullah Al Amin" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-aminah-gold tracking-[0.2em] uppercase mb-2">Phone Number *</label>
                        <input 
                          type="tel" 
                          required 
                          value={formData.phone} 
                          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                          className="w-full bg-[#111c19] border border-aminah-gold/20 p-3.5 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold transition-colors" 
                          placeholder="017..." 
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-aminah-gold tracking-[0.2em] uppercase mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})} 
                          className="w-full bg-[#111c19] border border-aminah-gold/20 p-3.5 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold transition-colors" 
                          placeholder="Optional" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-aminah-gold tracking-[0.2em] uppercase mb-2">Address / Institution</label>
                        <input 
                          type="text" 
                          value={formData.address} 
                          onChange={(e) => setFormData({...formData, address: e.target.value})} 
                          className="w-full bg-[#111c19] border border-aminah-gold/20 p-3.5 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold transition-colors" 
                          placeholder="Where are you from?" 
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-aminah-gold tracking-[0.2em] uppercase mb-2">Questions or References (Optional)</label>
                        <textarea 
                          rows={2} 
                          value={formData.reference} 
                          onChange={(e) => setFormData({...formData, reference: e.target.value})} 
                          className="w-full bg-[#111c19] border border-aminah-gold/20 p-3.5 text-sm text-aminah-ivory focus:outline-none focus:border-aminah-gold transition-colors resize-none" 
                          placeholder="Any note for the admin..." 
                        ></textarea>
                      </div>

                      <div className="pt-2">
                        <button 
                          type="submit" 
                          disabled={isSubmitting} 
                          className="w-full bg-aminah-gold text-aminah-green font-bold tracking-[0.2em] uppercase text-xs py-4 hover:bg-aminah-ivory transition-all shadow-[0_0_20px_rgba(197,164,109,0.15)] hover:shadow-[0_0_30px_rgba(197,164,109,0.3)] flex justify-center items-center gap-2 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                          ) : (
                            <>Submit Application <ShieldCheck className="w-4 h-4" /></>
                          )}
                        </button>
                        <p className="text-center text-aminah-ivory/30 text-[9px] uppercase tracking-widest mt-4">
                          We will reach out for payment processing.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}