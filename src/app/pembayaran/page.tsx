"use client";

import { useOrder } from "@/context/OrderContext";
import { MENU_ITEMS, INITIAL_TABLES } from "@/lib/constants";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Skeleton from "@/components/Skeleton";

export default function PembayaranPage() {
  const { selectedPayment, setSelectedPayment, totalCart, cart, selectedTable } = useOrder();
  const [selectedBank, setSelectedBank] = useState("");
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [isLoading, setIsLoading] = useState(true);

  const selectedTableData = INITIAL_TABLES.find(t => t.id === selectedTable);

  const banks = [
    { id: 'bca', name: 'BCA Virtual Account', icon: '🏦' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: '🏦' },
    { id: 'bri', name: 'BRI Virtual Account', icon: '🏦' },
    { id: 'bni', name: 'BNI Virtual Account', icon: '🏦' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isPaymentStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isPaymentStarted, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto pb-40 px-6 pt-24 md:pt-32 space-y-12">
        <Skeleton className="h-16 w-3/4 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-7 space-y-6">
              <Skeleton className="h-40 rounded-[2.5rem]" />
              <Skeleton className="h-40 rounded-[2.5rem]" />
           </div>
           <div className="lg:col-span-5">
              <Skeleton className="h-[500px] rounded-[3rem]" />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-40">
      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-32">
        <AnimatePresence mode="wait">
          {!isPaymentStarted ? (
            <motion.div 
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Main Selection Area */}
              <div className="lg:col-span-7 space-y-8">
                <header>
                  <h1 className="text-3xl md:text-6xl font-black tracking-tighter text-gray-900 uppercase italic mb-4 leading-none">
                    Metode <span className="text-red-600 font-black">Bayar</span>
                  </h1>
                  <p className="text-gray-400 font-medium text-base md:text-lg">Selesaikan pesananmu dengan metode yang tersedia.</p>
                </header>

                <div className="grid grid-cols-1 gap-4 mb-12">
                  {[
                    { id: 'qris', name: 'QRIS & E-Wallet', desc: 'Ovo, Dana, ShopeePay, GoPay', icon: '📱', color: 'bg-indigo-50 text-indigo-600' },
                    { id: 'va', name: 'Transfer Bank (VA)', desc: 'BCA, Mandiri, BRI, BNI', icon: '🏦', color: 'bg-blue-50 text-blue-600' },
                    { id: 'cash', name: 'Tunai di Kasir', desc: 'Bayar langsung ke kasir kami', icon: '💵', color: 'bg-green-50 text-green-600' }
                  ].map((method) => (
                    <div key={method.id} className="space-y-4">
                      <button
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full group flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all duration-300 ${selectedPayment === method.id ? 'bg-white border-red-600 shadow-2xl scale-[1.02]' : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'}`}
                      >
                        <div className="flex items-center gap-6 text-left">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${method.color}`}>
                            {method.icon}
                          </div>
                          <div>
                            <p className="font-black text-xl text-gray-900 tracking-tight">{method.name}</p>
                            <p className="text-sm font-medium text-gray-400">{method.desc}</p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPayment === method.id ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200'}`}>
                          {selectedPayment === method.id && <span className="text-xs font-black">✓</span>}
                        </div>
                      </button>

                      <AnimatePresence>
                        {method.id === 'va' && selectedPayment === 'va' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-gray-100 shadow-xl space-y-6">
                              <p className="font-black text-xs uppercase tracking-widest text-gray-400">Pilih Bank Anda</p>
                              <div className="grid grid-cols-2 gap-4">
                                {banks.map((bank) => (
                                  <button
                                    key={bank.id}
                                    onClick={() => setSelectedBank(bank.id)}
                                    className={`p-5 rounded-2xl border-2 font-black transition-all text-left flex items-center justify-between ${selectedBank === bank.id ? 'bg-red-50 border-red-600 text-red-600' : 'bg-gray-50 border-gray-50 text-gray-400 hover:border-gray-200'}`}
                                  >
                                    <span className="uppercase text-xs md:text-sm">{bank.name}</span>
                                    <span className="text-xl opacity-50">{bank.icon}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <button
                  disabled={!selectedPayment || (selectedPayment === 'va' && !selectedBank)}
                  onClick={() => setIsPaymentStarted(true)}
                  className={`w-full py-6 rounded-[2.5rem] font-black text-2xl uppercase tracking-tighter transition-all shadow-2xl ${(!selectedPayment || (selectedPayment === 'va' && !selectedBank)) ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-gray-900 text-white hover:bg-red-600 active:scale-95 shadow-red-600/20'}`}
                >
                  Konfirmasi Pesanan
                </button>
              </div>

              {/* Sidebar Summary */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl sticky top-32">
                   <div className="flex justify-between items-center mb-10 pb-6 border-b-2 border-dashed border-gray-100">
                      <h3 className="text-2xl font-black tracking-tighter uppercase italic">Ringkasan</h3>
                      <div className="bg-red-50 px-4 py-2 rounded-2xl">
                        <span className="text-red-600 font-black text-sm uppercase tracking-widest">{selectedTableData?.name || "Meja"}</span>
                      </div>
                   </div>

                   <div className="space-y-6 mb-12">
                      {cart.map((c) => {
                        const item = MENU_ITEMS.find((m) => m.id === c.id);
                        return (
                          <div key={c.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <span className="bg-gray-50 w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs">{c.qty}x</span>
                              <p className="font-black text-gray-800 text-sm tracking-tight">{item?.name}</p>
                            </div>
                            <p className="font-black text-gray-400 text-sm italic">Rp {((item?.price || 0) * c.qty).toLocaleString("id-ID")}</p>
                          </div>
                        );
                      })}
                   </div>

                   <div className="pt-8 border-t-2 border-gray-100 space-y-4">
                      <div className="flex justify-between items-center text-gray-400 font-black uppercase text-[10px] tracking-widest">
                        <span>Subtotal</span>
                        <span>Rp {totalCart.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <p className="text-base md:text-lg font-black text-gray-900">Total Pembayaran</p>
                        <p className="text-2xl md:text-4xl font-black text-red-600 tracking-tighter italic leading-none whitespace-nowrap">Rp {totalCart.toLocaleString("id-ID")}</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black italic">WIZ</div>
                  <div className="z-10 text-center md:text-left">
                    <button 
                      onClick={() => setIsPaymentStarted(false)}
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 hover:text-white mb-6 block transition-colors"
                    >
                      ← Ganti Metode Pembayaran
                    </button>
                    <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-2">Batas Waktu Pembayaran</p>
                    <p className="text-5xl md:text-7xl font-black tracking-tighter italic text-red-600 leading-none">{formatTime(timeLeft)}</p>
                  </div>
                  <div className="bg-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/10 z-10 text-center md:text-left w-full md:w-auto">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">TOTAL BAYAR</p>
                    <p className="text-2xl md:text-4xl font-black italic tracking-tighter">Rp {totalCart.toLocaleString("id-ID")}</p>
                  </div>
                </div>

                <div className="p-8 md:p-16">
                  <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                       <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-8">Detail Transaksi</h3>
                       <div className="space-y-6">
                         <div className="flex justify-between items-center py-4 border-b border-gray-50">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
                            <span className="text-yellow-600 font-black text-sm uppercase italic">Menunggu Pembayaran</span>
                         </div>
                         <div className="flex justify-between items-center py-4 border-b border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Metode</p>
                            <span className="text-gray-900 font-black text-lg uppercase italic">{selectedPayment === 'va' ? `${selectedBank} VA` : selectedPayment}</span>
                         </div>
                         <div className="flex justify-between items-center py-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nomor Meja</p>
                            <span className="text-red-600 font-black text-2xl md:text-3xl uppercase italic">{selectedTableData?.name || "TA"}</span>
                         </div>
                       </div>
                    </div>

                    <div className="flex justify-center">
                      {selectedPayment === 'qris' && (
                        <div className="bg-white p-6 rounded-[3rem] border border-gray-100 shadow-2xl relative w-full max-w-[320px]">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">SCAN QRIS UNTUK BAYAR</p>
                          <img src="/qris.png" className="w-full h-auto rounded-2xl" alt="QRIS" />
                        </div>
                      )}

                      {selectedPayment === 'va' && (
                        <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-200 shadow-xl w-full">
                           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">NOMOR VIRTUAL ACCOUNT</p>
                           <p className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-10 leading-none">8832 9901 0233 112</p>
                           <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-600 transition-all active:scale-95">SALIN NOMOR VA</button>
                        </div>
                      )}

                      {selectedPayment === 'cash' && (
                        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-2xl w-full max-w-[320px]">
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 text-center text-red-600">TUNJUKKAN KE KASIR</p>
                           <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                             <img src="/barcode-placeholder.png" className="w-full h-auto opacity-100" alt="Barcode" />
                             <p className="font-mono text-xs mt-4 tracking-[0.5em] text-gray-300 font-bold uppercase text-center">WZ-{Math.floor(Math.random() * 9000 + 1000)}</p>
                           </div>
                           <div className="flex justify-between items-center px-2">
                             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">NOMOR MEJA</p>
                             <p className="text-4xl md:text-5xl font-black text-red-600 italic uppercase leading-none tracking-tighter">{selectedTableData?.name || "TA"}</p>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Link 
                    href="/struk" 
                    className="mt-12 md:mt-20 w-full bg-gray-900 text-white py-6 md:py-8 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xl md:text-2xl italic hover:bg-red-600 transition-all active:scale-95 flex items-center justify-center gap-4 uppercase tracking-tighter shadow-2xl shadow-red-600/20"
                  >
                    Saya Sudah Bayar ✓
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
