"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, Lock, CreditCard, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const deliveryFee = 60; // Standard Dhaka Delivery
  const grandTotal = cartTotal + (cartTotal > 0 ? deliveryFee : 0);

  // Jodi cart empty thake
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#0a110f] flex flex-col items-center justify-center pt-32 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-aminah-gold/5 blur-[150px] pointer-events-none z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-center">
          <ShoppingBag className="w-16 h-16 text-aminah-gold/30 mb-6 animate-pulse" />
          <h1 className="text-3xl font-serif text-aminah-ivory mb-4">Your Collection is Empty</h1>
          <p className="text-aminah-ivory/60 mb-8 font-serif italic">Let's find some profound knowledge for your library.</p>
          <Link href="/bookstore" className="bg-aminah-gold text-aminah-green px-8 py-4 font-sans font-bold tracking-[0.2em] uppercase text-xs hover:bg-aminah-ivory transition-colors shadow-[0_0_30px_rgba(197,164,109,0.2)] hover:shadow-[0_0_50px_rgba(197,164,109,0.4)]">
            Return to Bookstore
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a110f] text-aminah-charcoal selection:bg-aminah-gold selection:text-aminah-green font-serif relative overflow-hidden pt-32 pb-32">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-aminah-gold/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <Link href="/bookstore" className="group inline-flex items-center gap-3 text-aminah-gold/60 font-sans font-medium tracking-[0.2em] uppercase text-[10px] hover:text-aminah-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Continue Shopping
        </Link>

        <h1 className="text-4xl md:text-5xl text-aminah-ivory font-serif mb-12">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: FORM */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 1. Shipping Details */}
            <section>
              <h2 className="text-xl text-aminah-gold font-serif mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-aminah-gold/20 text-aminah-gold text-xs font-sans">1</span>
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-aminah-ivory/60 text-[10px] font-sans tracking-[0.2em] uppercase">Full Name</label>
                  <input type="text" className="w-full bg-[#111c19] border border-aminah-gold/20 text-aminah-ivory px-4 py-3 focus:outline-none focus:border-aminah-gold transition-colors font-sans" placeholder="Abdullah Al Amin" />
                </div>
                <div className="space-y-2">
                  <label className="text-aminah-ivory/60 text-[10px] font-sans tracking-[0.2em] uppercase">Phone Number</label>
                  <input type="tel" className="w-full bg-[#111c19] border border-aminah-gold/20 text-aminah-ivory px-4 py-3 focus:outline-none focus:border-aminah-gold transition-colors font-sans" placeholder="017..." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-aminah-ivory/60 text-[10px] font-sans tracking-[0.2em] uppercase">Email Address (Optional)</label>
                  <input type="email" className="w-full bg-[#111c19] border border-aminah-gold/20 text-aminah-ivory px-4 py-3 focus:outline-none focus:border-aminah-gold transition-colors font-sans" placeholder="your@email.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-aminah-ivory/60 text-[10px] font-sans tracking-[0.2em] uppercase">Full Delivery Address</label>
                  <textarea rows={3} className="w-full bg-[#111c19] border border-aminah-gold/20 text-aminah-ivory px-4 py-3 focus:outline-none focus:border-aminah-gold transition-colors font-sans resize-none" placeholder="House, Road, Area, City..."></textarea>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-aminah-gold/10"></div>

            {/* 2. Payment Method */}
            <section>
              <h2 className="text-xl text-aminah-gold font-serif mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-aminah-gold/20 text-aminah-gold text-xs font-sans">2</span>
                Payment Method
              </h2>
              <div className="space-y-4">
                
                {/* Cash on Delivery */}
                <label className={`flex items-center justify-between p-5 border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-aminah-gold/10 border-aminah-gold' : 'bg-[#111c19] border-aminah-gold/20 hover:border-aminah-gold/50'}`} onClick={() => setPaymentMethod('cod')}>
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-aminah-gold' : 'border-aminah-gold/40'}`}>
                      {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-aminah-gold"></div>}
                    </div>
                    <div>
                      <p className="text-aminah-ivory font-sans text-sm">Cash on Delivery (COD)</p>
                      <p className="text-aminah-gold/60 text-[10px] font-sans">Pay with cash upon delivery</p>
                    </div>
                  </div>
                  <Truck className={`w-5 h-5 ${paymentMethod === 'cod' ? 'text-aminah-gold' : 'text-aminah-gold/40'}`} />
                </label>

                {/* Digital Payment (Disabled) */}
                <label className="flex items-center justify-between p-5 border border-aminah-gold/10 bg-[#0a110f] opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full border border-aminah-gold/20"></div>
                    <div>
                      <p className="text-aminah-ivory font-sans text-sm">bKash / Nagad / Card</p>
                      <p className="text-aminah-gold/40 text-[10px] font-sans">Currently undergoing maintenance</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-aminah-gold/30" />
                </label>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (Sticky Panel) */}
          <div className="lg:col-span-5">
            <div className="bg-[#111c19]/80 backdrop-blur-xl border border-aminah-gold/20 p-8 sticky top-32 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              
              <h2 className="text-xl text-aminah-gold font-serif mb-6 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 max-h-[35vh] overflow-y-auto scrollbar-hide pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={item.image_url} alt={item.title} className="w-12 h-16 object-cover border border-aminah-gold/20" />
                        <span className="absolute -top-2 -right-2 bg-aminah-gold text-aminah-green text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <p className="text-aminah-ivory font-serif text-sm line-clamp-1">{item.title}</p>
                        <p className="text-aminah-gold/60 text-[9px] font-sans tracking-widest uppercase">{item.format}</p>
                      </div>
                    </div>
                    <p className="text-aminah-gold font-sans text-sm">৳{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-aminah-gold/20 pt-6 space-y-4 mb-8">
                <div className="flex justify-between text-aminah-ivory/80 text-sm font-sans">
                  <span>Subtotal</span>
                  <span>৳{cartTotal}</span>
                </div>
                <div className="flex justify-between text-aminah-ivory/80 text-sm font-sans">
                  <span>Delivery Fee</span>
                  <span>৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-aminah-gold/10">
                  <span className="text-aminah-ivory font-serif text-lg">Total</span>
                  <span className="text-aminah-gold font-serif text-3xl">৳{grandTotal}</span>
                </div>
              </div>

              {/* Confirm Order Button */}
              <button 
                className="relative w-full inline-flex items-center justify-center px-12 py-5 text-xs font-sans font-bold tracking-[0.2em] uppercase text-[#0a110f] overflow-hidden bg-aminah-gold group transition-all duration-700 shadow-[0_0_40px_rgba(197,164,109,0.3)] hover:shadow-[0_0_60px_rgba(197,164,109,0.5)]"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Confirm Order <ShieldCheck className="w-4 h-4 ml-2" />
                </span>
              </button>
              
              <p className="text-center text-aminah-gold/40 text-[9px] font-sans mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Encrypted & Secure Checkout
              </p>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}