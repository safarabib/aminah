"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-aminah-green/80 backdrop-blur-xl border-b border-aminah-gold/20 shadow-sm transition-all duration-500">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section - Magic CSS applied to turn black logo to white */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <img 
                src="/logo.png" 
                alt="AMINAH Logo" 
                className="h-14 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity brightness-0 invert" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link href="/" className="text-xs font-medium text-aminah-ivory/80 hover:text-aminah-gold transition-colors tracking-[0.15em] uppercase">Home</Link>
            
            {/* NEW: About Aminah Link added here */}
            <Link href="/about" className="text-xs font-medium text-aminah-ivory/80 hover:text-aminah-gold transition-colors tracking-[0.15em] uppercase">About Aminah</Link>
            
            <Link href="/bookstore" className="text-xs font-medium text-aminah-ivory/80 hover:text-aminah-gold transition-colors tracking-[0.15em] uppercase">Our Publications</Link>
            <Link href="/library" className="text-xs font-medium text-aminah-ivory/80 hover:text-aminah-gold transition-colors tracking-[0.15em] uppercase">Digital Library</Link>
            <Link href="/learning" className="text-xs font-medium text-aminah-ivory/80 hover:text-aminah-gold transition-colors tracking-[0.15em] uppercase">Education</Link>
            <Link href="/explore" className="text-xs font-medium text-aminah-ivory/80 hover:text-aminah-gold transition-colors tracking-[0.15em] uppercase">Journal</Link>
            <Link href="#newsletter" className="text-xs font-medium text-aminah-ivory/80 hover:text-aminah-gold transition-colors tracking-[0.15em] uppercase">Newsletter</Link>
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center gap-6">
            <button className="text-aminah-ivory/80 hover:text-aminah-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="text-aminah-ivory/80 hover:text-aminah-gold transition-colors relative" onClick={() => setIsMobileMenuOpen(false)}>
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-aminah-gold text-aminah-green text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </Link>
            <Link href="/admin" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-aminah-ivory/20 hover:border-aminah-gold text-aminah-ivory hover:text-aminah-gold transition-all">
              <User className="w-4 h-4" />
            </Link>
            
            <button 
              className="lg:hidden text-aminah-ivory hover:text-aminah-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full h-screen bg-aminah-green/95 backdrop-blur-3xl border-t border-white/5 transition-all duration-500">
          <nav className="flex flex-col px-8 py-10 space-y-8">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-aminah-ivory hover:text-aminah-gold transition tracking-widest uppercase">Home</Link>
            
            {/* NEW: About Aminah Mobile Link added here */}
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-aminah-ivory hover:text-aminah-gold transition tracking-widest uppercase">About Aminah</Link>
            
            <Link href="/bookstore" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-aminah-ivory hover:text-aminah-gold transition tracking-widest uppercase">Our Publications</Link>
            <Link href="/library" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-aminah-ivory hover:text-aminah-gold transition tracking-widest uppercase">Digital Library</Link>
            <Link href="/learning" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-aminah-ivory hover:text-aminah-gold transition tracking-widest uppercase">Education</Link>
            <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-aminah-ivory hover:text-aminah-gold transition tracking-widest uppercase">Journal</Link>
            <Link href="#newsletter" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-aminah-ivory hover:text-aminah-gold transition tracking-widest uppercase">Newsletter</Link>
          </nav>
        </div>
      )}
    </header>
  );
}