"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOrder } from "@/context/OrderContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useOrder();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  const cartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-3xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group">
            <div className="relative overflow-hidden rounded-xl">
              <img src="/logo.png" alt="Wizzmie Logo" className="h-8 md:h-12 w-auto object-contain group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-6 md:h-8 w-[1px] bg-gray-200"></div>
            <h1 className="text-lg md:text-xl font-black tracking-tighter uppercase group-hover:text-red-600 transition-colors">Wizzmie</h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 md:gap-4">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/') ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              Beranda
            </Link>
            <Link 
              href="/menu" 
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isActive('/menu') ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              Menu
              {cartCount > 0 && (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isActive('/menu') ? 'bg-white text-red-600' : 'bg-red-600 text-white shadow-md shadow-red-200 animate-bounce'}`}>
                  {cartCount}
                </span>
              )}
            </Link>
            <Link 
              href="/denah" 
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isActive('/denah') ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              Meja
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            {cartCount > 0 && pathname !== '/menu' && (
              <Link href="/menu" className="relative w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <span>🛒</span>
                <span className="absolute -top-1 -right-1 bg-gray-900 text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              </Link>
            )}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-gray-100 rounded-xl"
            >
              <div className={`w-5 h-0.5 bg-gray-900 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-900 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-900 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-6 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest ${isActive('/') ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400'}`}
            >
              Beranda
            </Link>
            <Link 
              href="/menu" 
              onClick={() => setIsMenuOpen(false)}
              className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex justify-between items-center ${isActive('/menu') ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400'}`}
            >
              Pesan Menu
              {cartCount > 0 && <span className="bg-gray-900 text-white px-2 py-0.5 rounded-lg text-[10px]">{cartCount} items</span>}
            </Link>
            <Link 
              href="/denah" 
              onClick={() => setIsMenuOpen(false)}
              className={`px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest ${isActive('/denah') ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400'}`}
            >
              Denah Meja
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
