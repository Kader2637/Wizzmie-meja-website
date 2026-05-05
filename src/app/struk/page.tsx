"use client";

import { useOrder } from "@/context/OrderContext";
import { INITIAL_TABLES, MENU_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StrukPage() {
  const { cart, selectedTable, selectedPayment, totalCart, resetOrder } = useOrder();
  const [receiptNumber, setReceiptNumber] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setReceiptNumber(Math.floor(Math.random() * 100000).toString().padStart(6, '0'));
    setCurrentTime(new Date().toLocaleDateString('id-ID', { 
      day: '2-digit', month: 'short', year: 'numeric', 
      hour: '2-digit', minute: '2-digit'
    }));
  }, []);

  const selectedTableData = INITIAL_TABLES.find(t => t.id === selectedTable);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <h2 className="text-2xl font-black italic uppercase mb-4 text-gray-900">Pesanan Tidak Ditemukan</h2>
          <Link href="/menu" className="text-red-600 font-black uppercase tracking-widest underline decoration-2 underline-offset-4">Kembali ke Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-40 px-6 print:bg-white print:p-0">
      <div className="max-w-xl mx-auto">
        {/* Success Message Area */}
        <div className="text-center mb-12 print:hidden">
           <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-white text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-gray-100"
           >
             <span className="text-4xl font-black italic">✓</span>
           </motion.div>
           <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter uppercase italic leading-none">Berhasil!</h2>
           <p className="text-gray-400 font-black uppercase tracking-widest text-[8px] md:text-[10px]">Silakan duduk & tunggu pesanan anda.</p>
        </div>

        {/* The Receipt Container */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden relative print:border-none print:shadow-none"
        >
          <div className="absolute top-0 left-0 right-0 h-3 bg-red-600"></div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-10 pb-8 border-b-2 border-dashed border-gray-50">
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-2 text-gray-900">Wizzmie</h1>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Mie Pedas & Dimsum No. 1</p>
            </div>

            <div className="bg-gray-50 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 mb-8 md:mb-10 flex justify-between items-center border border-gray-100/50">
              <div className="text-left">
                <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">NOMOR MEJA</p>
                <p className="text-3xl md:text-5xl font-black text-red-600 italic uppercase leading-none tracking-tighter">{selectedTableData?.name || "TA"}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">STRUK #</p>
                <p className="text-base md:text-lg font-black text-gray-900 leading-none">{receiptNumber}</p>
                <p className="text-[7px] md:text-[8px] font-bold text-gray-400 uppercase mt-1">{currentTime}</p>
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Pesanan Anda</p>
              {cart.map((c) => {
                const item = MENU_ITEMS.find((m) => m.id === c.id);
                return (
                  <div key={c.id} className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <span className="bg-gray-100 w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] text-gray-900">{c.qty}x</span>
                      <div>
                        <p className="font-black text-gray-800 text-sm tracking-tight leading-tight mb-1">{item?.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 italic">Rp {item?.price.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                    <span className="font-black text-gray-900 text-sm">Rp {( (item?.price || 0) * c.qty ).toLocaleString("id-ID")}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-8 border-t-2 border-dashed border-gray-100">
               <div className="flex justify-between items-center text-gray-400 font-black uppercase text-[10px] tracking-widest mb-3">
                  <span>Subtotal</span>
                  <span>Rp {totalCart.toLocaleString("id-ID")}</span>
               </div>
               <div className="flex justify-between items-center text-gray-400 font-black uppercase text-[10px] tracking-widest mb-6">
                  <span>Metode Bayar</span>
                  <span>{selectedPayment?.toUpperCase()}</span>
               </div>
               <div className="flex justify-between items-end pt-6 border-t border-gray-50">
                  <span className="font-black text-gray-900 uppercase tracking-widest text-[10px] md:text-[11px]">Total Akhir</span>
                  <span className="text-3xl md:text-4xl font-black text-red-600 italic tracking-tighter leading-none">Rp {totalCart.toLocaleString("id-ID")}</span>
               </div>
            </div>

            <div className="mt-16 text-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-gray-50 text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 mb-8 border border-gray-100">
                Terima kasih atas pesanan anda!
              </div>
              <div className="flex flex-col items-center opacity-30 grayscale hover:grayscale-0 transition-all">
                 <div className="w-full h-12 bg-[url('https://www.scantech.com/wp-content/uploads/2021/04/barcode.png')] bg-contain bg-center bg-repeat-x mb-2"></div>
                 <p className="font-mono text-[8px] tracking-[0.6em] text-gray-900">WZ-{receiptNumber}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
          <button 
            onClick={() => window.print()}
            className="bg-white text-gray-900 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest border border-gray-100 shadow-xl hover:shadow-2xl transition-all"
          >
            Cetak Struk 🖨️
          </button>
          <Link 
            href="/" 
            onClick={() => resetOrder()}
            className="bg-gray-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl hover:bg-red-600 transition-all text-center flex items-center justify-center"
          >
            Selesai & Beranda ✓
          </Link>
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          nav, footer { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
