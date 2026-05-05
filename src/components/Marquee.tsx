export default function Marquee() {
  const promoText = " 🔥 PROMO SPESIAL RAMADAN DISKON HINGGA 50% UNTUK DIMSUM • 🌶️ LEVEL PEDAS BARU: LEVEL DEWA KEMATIAN • 🍜 WIZZMIE ORIGINAL HANYA RP 10.000 SETIAP HARI SENIN • ";
  
  return (
    <div className="bg-red-600 py-3 border-y-4 border-gray-900 marquee-wrapper">
      <div className="marquee-track">
        {/* Block 1: Initial content */}
        <div className="flex shrink-0">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-white font-black uppercase text-sm mx-10 tracking-widest whitespace-nowrap">
              {promoText}
            </span>
          ))}
        </div>
        {/* Block 2: Duplicate for seamless loop */}
        <div className="flex shrink-0">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-white font-black uppercase text-sm mx-10 tracking-widest whitespace-nowrap">
              {promoText}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
