"use client";

import { useOrder } from "@/context/OrderContext";
import { INITIAL_TABLES } from "@/lib/constants";
import RestaurantMap, { MapLegend, FloorSwitcher } from "@/components/RestaurantMap";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MapSkeleton } from "@/components/Skeleton";

export default function DenahPage() {
  const { selectedTable } = useOrder();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  const selectedTableData = INITIAL_TABLES.find(t => t.id === selectedTable);

  return (
    <div className="pb-40 max-w-6xl mx-auto px-6 pt-24 md:pt-32">
      <Reveal>
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-10 text-center md:text-left">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-gray-900 uppercase italic leading-none">
              Pilih <span className="text-red-600">Spot</span> Favorit
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
              Cari meja yang paling nyaman buat kamu dan teman-temanmu.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6 bg-white p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 w-full md:w-auto">
            <FloorSwitcher />
            <MapLegend />
          </div>
        </div>
      </Reveal>

      {isLoading ? (
        <MapSkeleton />
      ) : (
        <>
          <Reveal delay={0.3}>
            <RestaurantMap />
          </Reveal>
        </>
      )}

      <AnimatePresence>
        {selectedTable && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-0 right-0 px-8 z-40"
          >
            <div className="max-w-4xl mx-auto bg-white text-gray-900 rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 pl-6 md:pl-12 flex flex-row justify-between items-center shadow-2xl border-4 border-red-600">
              <div className="flex items-center gap-6 md:gap-10">
                <div>
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] mb-0.5 md:l-1">Meja</p>
                  <p className="text-2xl md:text-4xl font-black text-red-600 tracking-tighter leading-none uppercase">{selectedTableData?.name}</p>
                </div>
                <div className="h-10 w-[1px] bg-gray-100 hidden md:block"></div>
                <div className="hidden sm:block text-left">
                  <p className="text-gray-400 text-[8px] md:text-[10px] font-black uppercase tracking-wider md:tracking-[0.2em] mb-0.5 md:l-1">Kapasitas</p>
                  <p className="text-sm md:text-xl font-black">{selectedTableData?.capacity} Orang</p>
                </div>
              </div>
              <Link 
                href="/pembayaran" 
                className="bg-red-600 text-white px-6 md:px-12 py-4 md:py-5 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-sm md:text-xl hover:bg-red-700 transition-all active:scale-95 flex items-center gap-2 md:gap-4 uppercase tracking-widest shadow-xl shadow-red-600/20"
              >
                Bayar <span className="hidden md:inline">Sekarang</span> <span className="text-xl md:text-3xl">→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
