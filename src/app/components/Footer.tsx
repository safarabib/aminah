import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a110f] text-aminah-ivory border-t border-aminah-gold/20 pt-20 pb-10 mt-auto z-10 relative">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img src="/logo.png" alt="AMINAH Logo" className="h-16 w-auto object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-aminah-ivory/60 font-serif italic max-w-md leading-relaxed mb-6 text-lg">
              An Institution for Quranic Knowledge, Research and Human Development. Guided by Revelation. Building a Safer Tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-sans font-bold text-aminah-gold tracking-[0.2em] uppercase mb-6">Explore</h4>
            <ul className="space-y-4 font-sans text-sm">
              <li><Link href="/bookstore" className="text-aminah-ivory/70 hover:text-aminah-gold transition-colors">Our Publications</Link></li>
              <li><Link href="/library" className="text-aminah-ivory/70 hover:text-aminah-gold transition-colors">Digital Library</Link></li>
              <li><Link href="/learning" className="text-aminah-ivory/70 hover:text-aminah-gold transition-colors">Education & Classes</Link></li>
              <li><Link href="/explore" className="text-aminah-ivory/70 hover:text-aminah-gold transition-colors">Journal & Articles</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-sans font-bold text-aminah-gold tracking-[0.2em] uppercase mb-6">Contact</h4>
            <ul className="space-y-4 font-sans text-sm text-aminah-ivory/70">
              <li className="flex items-start gap-3 hover:text-aminah-gold transition-colors cursor-pointer">
                <MapPin className="w-4 h-4 text-aminah-gold shrink-0 mt-0.5" />
                <span className="leading-relaxed">Sector 14, Uttara<br />Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 hover:text-aminah-gold transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-aminah-gold shrink-0" />
                <span>info@aminah.institute</span>
              </li>
              <li className="flex items-center gap-3 hover:text-aminah-gold transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-aminah-gold shrink-0" />
                <span>+880 1234 567890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-aminah-gold/10 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-aminah-ivory/40">
          <p>© {new Date().getFullYear()} AMINAH Institute. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-aminah-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-aminah-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}