import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img src="/logo.png" alt="Wizzmie Logo" className="h-10 w-auto brightness-0 invert" />
              <h1 className="text-2xl font-black tracking-tighter uppercase">Wizzmie</h1>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Mie pedas nomor satu dengan rasa otentik dan suasana yang bikin betah. Nikmati kelezatan di setiap gigitan.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer">📸</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer">🐦</div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer">📘</div>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-500">Menu Populer</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Wizzmie Original</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Wizzmie Spicy</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Dimsum Udang</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Matcha Latte</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-500">Navigasi</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link href="/" className="hover:text-red-500 transition-colors text-gray-400">Beranda</Link></li>
              <li><Link href="/menu" className="hover:text-red-500 transition-colors text-gray-400">Pesan Menu</Link></li>
              <li><Link href="/denah" className="hover:text-red-500 transition-colors text-gray-400">Denah Meja</Link></li>
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Lokasi Outlet</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-gray-500">Bantuan</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Hubungi Kami</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">FAQ</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Syarat & Ketentuan</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors text-gray-400">Kebijakan Privasi</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-bold">© 2024 Wizzmie Indonesia. All rights reserved.</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <span>Made with ❤️ for Wizzmie Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
