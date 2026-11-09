"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image_url: string;
  format: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("aminah_cart");
    if (savedCart) {
      try { setCartItems(JSON.parse(savedCart)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("aminah_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, cartCount }}>
      {children}

      {isMounted && (
        <div className={`fixed inset-0 z-[100] transition-opacity duration-500 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className={`absolute top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a110f] border-l border-aminah-gold/20 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col transform transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
            
            <div className="flex items-center justify-between p-6 border-b border-aminah-gold/10">
              <div className="flex items-center gap-3 text-aminah-gold">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="font-serif text-xl tracking-wide text-aminah-ivory">Your Collection</h2>
                <span className="bg-aminah-gold text-aminah-green text-[10px] font-sans font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-aminah-gold/50 hover:text-aminah-gold transition-colors p-2"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingCart className="w-12 h-12 text-aminah-gold mb-4" />
                  <p className="font-serif text-aminah-ivory text-lg">Your cart is empty</p>
                  <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-aminah-gold mt-2">Discover our publications</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-[#111c19]/50 border border-aminah-gold/10 p-3 relative group">
                    <img src={item.image_url || "/placeholder.jpg"} alt={item.title} className="w-16 h-24 object-cover border border-aminah-gold/20" />
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-aminah-gold/60 text-[9px] font-sans tracking-widest uppercase mb-1">{item.format}</p>
                      <h4 className="text-aminah-ivory font-serif leading-tight mb-2 line-clamp-2 text-sm">{item.title}</h4>
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-aminah-gold font-sans text-sm">৳{item.price}</p>
                        
                        <div className="flex items-center gap-3 bg-[#0a110f] border border-aminah-gold/20 px-2 py-1">
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity - 1); }} 
                            className="text-aminah-gold/50 hover:text-aminah-gold p-1 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          
                          <span className="text-aminah-ivory text-xs font-sans w-3 text-center">{item.quantity}</span>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, item.quantity + 1); }} 
                            className="text-aminah-gold/50 hover:text-aminah-gold p-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }} 
                      className="absolute -top-2 -right-2 bg-red-900/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-aminah-gold/10 bg-[#0a110f] z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-aminah-ivory/60 font-sans text-xs tracking-widest uppercase">Subtotal</span>
                  <span className="text-2xl font-serif text-aminah-gold">৳{cartTotal}</span>
                </div>
                
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/checkout");
                  }}
                  className="w-full bg-aminah-gold text-aminah-green py-4 font-sans font-bold tracking-[0.2em] uppercase text-xs hover:bg-aminah-ivory transition-colors flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
              </div>
            )}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};