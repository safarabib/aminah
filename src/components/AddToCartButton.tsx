"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ book }: { book: any }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
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
      title="Add to Cart"
      className="relative flex items-center justify-center px-4 py-3 min-w-[48px] text-[10px] font-sans font-bold tracking-widest uppercase text-[#0a110f] overflow-hidden bg-aminah-gold group transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(197,164,109,0.3)] hover:-translate-y-0.5 rounded-sm"
    >
      <span className="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
      
      <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        <ShoppingCart className="w-4 h-4 shrink-0" />
        {/* Hides text on small screens, shows on larger ones */}
        <span className="hidden sm:inline">Add to Cart</span>
      </span>
    </button>
  );
}