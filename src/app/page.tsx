"use client";

import Link from "next/link";
import RestaurantMap, { MapLegend, FloorSwitcher } from "@/components/RestaurantMap";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-8 border border-red-100">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Terfavorit di Indonesia</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase italic">
              Makan Enak <br />
              <span className="text-red-600">Gak Harus </span><br />
              Mahal Bosku!
            </h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed mb-10 max-w-md">
              Wizzmie hadir dengan cita rasa mie pedas yang bikin nagih dan dimsum berkualitas premium. Tempat nongkrong paling asik buat kamu!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/menu" 
                className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-red-600 transition-all shadow-2xl hover:-translate-y-1 active:translate-y-0"
              >
                Order Now 🚀
              </Link>
              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-gray-100 bg-white">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">10k+ Lovers</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-red-600/10 blur-3xl rounded-full"></div>
            <div className="relative bg-white p-6 rounded-[3.5rem] shadow-2xl border border-gray-100 rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1000&auto=format&fit=crop" 
                className="rounded-[2.5rem] w-full h-[450px] object-cover scale-105 group-hover:scale-100 transition-transform duration-700" 
                alt="Food" 
              />
              <div className="absolute bottom-10 right-10 bg-gray-900 text-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl animate-bounce">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Start from</p>
                <p className="text-xl md:text-3xl font-black tracking-tighter text-red-500">Rp 10k</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Marquee Section */}
      <Marquee />

      {/* Promo Section */}
      <section className="bg-white py-24 px-6 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h3 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-4 text-center md:text-left">Promo Terpanas 🔥</h3>
                <p className="text-gray-400 font-medium text-base md:text-lg text-center md:text-left">Jangan lewatkan penawaran spesial minggu ini.</p>
              </div>
              <Link href="/menu" className="text-red-600 font-black uppercase tracking-widest text-sm border-b-2 border-red-600 pb-1">Lihat Semua Promo</Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Diskon 50% Untuk Semua Dimsum", color: "bg-red-600", tag: "Flash Sale", desc: "Hanya berlaku pukul 14.00 - 17.00 setiap harinya.", label: "50%" },
              { title: "Beli 1 Gratis 1 Es Teh Tarik", color: "bg-gray-900", tag: "BOGO", desc: "Berlaku untuk pembelian dine-in minimal Rp 50rb.", label: "FREE" },
              { title: "Free VIP Upgrade", color: "bg-white", border: "border-2 border-gray-100", tag: "Membership", desc: "Khusus untuk pelanggan yang sudah 5x order.", label: "VIP", textColor: "text-gray-900" }
            ].map((promo, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`${promo.color} ${promo.border || ''} p-10 rounded-[3rem] ${promo.textColor || 'text-white'} relative overflow-hidden group hover:scale-[1.02] transition-all h-full`}>
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                    <span className="text-9xl font-black">{promo.label}</span>
                  </div>
                  <span className={`${promo.color === 'bg-white' ? 'bg-red-50 text-red-600' : 'bg-white/20'} px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block`}>{promo.tag}</span>
                  <h4 className="text-2xl md:text-3xl font-black leading-tight mb-4 tracking-tighter uppercase">{promo.title}</h4>
                  <p className={`${promo.color === 'bg-white' ? 'text-gray-400' : 'text-red-100'} font-medium mb-8 text-sm`}>{promo.desc}</p>
                  <button className={`${promo.color === 'bg-white' ? 'bg-gray-100 text-gray-900' : 'bg-white text-red-600'} px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs`}>Ambil Promo</button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <Reveal>
            <div className="col-span-1 md:col-span-1">
               <h3 className="text-3xl font-black tracking-tighter uppercase mb-4 leading-none">Kenapa Pilih <span className="text-red-600">Wizzmie?</span></h3>
               <p className="text-gray-400 font-medium text-sm">Alasan mereka jatuh cinta pada rasa kami.</p>
            </div>
          </Reveal>
          {[
            { title: "Bahan Fresh", icon: "🥬", desc: "Bahan-bahan berkualitas pilihan setiap hari." },
            { title: "Koki Handal", icon: "👨‍🍳", desc: "Dimasak oleh tangan profesional berpengalaman." },
            { title: "Tempat Asik", icon: "🏠", desc: "Desain interior modern yang instagrammable." }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                <span className="text-4xl mb-6 block">{item.icon}</span>
                <h4 className="font-black text-xl mb-2 tracking-tight">{item.title}</h4>
                <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live Map Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-4xl font-black tracking-tighter uppercase mb-4">Cek Meja Live 📍</h3>
              <p className="text-gray-400 font-medium text-lg">Pastikan ada tempat buat kamu dan circle kamu.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
              <FloorSwitcher />
              <MapLegend />
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <RestaurantMap interactive={false} />
        </Reveal>
        
        <Reveal delay={0.4}>
          <div className="bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden mt-12">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <h4 className="text-2xl md:text-4xl font-black tracking-tighter uppercase mb-6 relative z-10">Siap Makan Enak Sekarang?</h4>
            <p className="text-gray-400 mb-10 text-lg md:text-xl font-medium max-w-xl mx-auto relative z-10">Klik tombol di bawah ini dan biarkan keajaiban rasa Wizzmie menemani harimu.</p>
            <Link 
                href="/menu" 
                className="bg-red-600 text-white px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2.5rem] font-black text-xl md:text-2xl hover:bg-red-700 transition-all shadow-2xl inline-block relative z-10 hover:-translate-y-1"
              >
                Mulai Pesan <span className="ml-2">👉</span>
              </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
