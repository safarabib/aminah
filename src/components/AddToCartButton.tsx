"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ book }: { book: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: book.id,
      title: book.title,
      price: book.price,
      image_url: book.image_url,
      format: book.format,
      quantity: 1
    });
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="relative inline-flex items-center justify-center px-12 py-5 text-xs font-sans font-bold tracking-[0.2em] uppercase text-[#0a110f] overflow-hidden bg-aminah-gold group transition-all duration-700 shadow-[0_0_40px_rgba(197,164,109,0.3)] hover:shadow-[0_0_60px_rgba(197,164,109,0.5)] hover:-translate-y-1 flex-1 sm:flex-none"
    >
      <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
      <span className="relative z-10 flex items-center gap-3">
        <ShoppingCart className="w-4 h-4" /> Add to Cart
      </span>
    </button>
  );
}