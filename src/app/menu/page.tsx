"use client";

import { useOrder } from "@/context/OrderContext";
import { MENU_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { useState, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { MenuSkeleton } from "@/components/Skeleton";

export default function MenuPage() {
  const { cart, addToCart, removeFromCart, totalCart } = useOrder();
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Noodle", "Dimsum", "Beverage"];
  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pb-40 max-w-6xl mx-auto px-6 pt-24 md:pt-32">
      <Reveal>
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900 uppercase italic leading-none">
            Menu <span className="text-red-600">Andalan</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed mx-auto md:mx-0">
            Pilih hidangan favoritmu dan rasakan ledakan rasa di setiap gigitan.
          </p>
        </div>
      </Reveal>

      {/* Categories */}
      <Reveal delay={0.2}>
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${activeCategory === cat ? 'bg-red-600 border-red-600 text-white shadow-xl scale-105' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Grid Menu */}
      {isLoading ? (
        <MenuSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const cartItem = cart.find((c) => c.id === item.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={item.id}
                className={`group bg-white p-2 rounded-[3rem] border-2 transition-all duration-500 relative overflow-hidden ${cartItem ? 'border-red-600 shadow-2xl' : 'border-transparent shadow-sm hover:shadow-2xl hover:-translate-y-2'}`}
              >
                <div className="bg-gray-50 rounded-[2.5rem] p-8 mb-6 relative overflow-hidden flex items-center justify-center min-h-[220px]">
                   <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-red-600 border border-red-100 z-10">{item.category}</div>
                   <span className="text-8xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">{item.image}</span>
                </div>
                
                <div className="px-6 pb-6">
                  <h3 className="font-black text-2xl leading-none mb-3 tracking-tight group-hover:text-red-600 transition-colors">{item.name}</h3>
                  <p className="text-gray-400 text-xs mb-8 font-medium line-clamp-2 h-8">{item.desc}</p>
                  <div className="flex justify-between items-center gap-4">
                    <p className="text-gray-900 font-black text-2xl tracking-tighter">Rp {item.price.toLocaleString("id-ID")}</p>
                    <div className="flex-grow">
                      {cartItem ? (
                        <div className="flex items-center justify-between bg-gray-900 rounded-2xl p-1 shadow-lg">
                          <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-xl bg-white/10 text-white font-black hover:bg-white/20 transition-all">-</button>
                          <span className="font-black text-white text-sm">{cartItem.qty}</span>
                          <button onClick={() => addToCart(item.id)} className="w-8 h-8 rounded-xl bg-red-600 text-white font-black shadow-lg hover:bg-red-500 transition-all">+</button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart(item.id)} 
                          className="w-full bg-red-50 text-red-600 font-black py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-[0.9] uppercase tracking-widest text-[8px]"
                        >
                          Add +
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      )}

      {/* Floating Cart */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-0 right-0 px-6 z-40"
          >
            <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-[2.5rem] md:rounded-[3rem] p-3 md:p-4 pl-8 md:pl-12 flex justify-between items-center shadow-2xl border border-white/5">
              <div className="flex items-center gap-6 md:gap-8">
                <div>
                  <p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] mb-0.5 md:l-1">Total</p>
                  <p className="text-xl md:text-3xl font-black tracking-tighter text-red-500">Rp {totalCart.toLocaleString("id-ID")}</p>
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
                <div className="hidden sm:block">
                  <p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] mb-0.5 md:l-1">Items</p>
                  <p className="text-sm md:text-xl font-black">{cart.reduce((a,b) => a + b.qty, 0)} items</p>
                </div>
              </div>
              <Link 
                href="/denah" 
                className="bg-red-600 text-white px-6 md:px-10 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-sm md:text-xl hover:bg-red-700 transition-all active:scale-95 flex items-center gap-2 md:gap-4 uppercase tracking-widest shadow-xl shadow-red-600/20"
              >
                Pilih Meja <span className="text-xl md:text-3xl">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
