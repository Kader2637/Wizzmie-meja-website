"use client";

import { useOrder } from "@/context/OrderContext";
import { INITIAL_TABLES } from "@/lib/constants";

export const MapLegend = () => (
  <div className="flex flex-wrap gap-2 md:gap-4 p-3 md:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm w-full md:w-auto justify-center md:justify-start">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
      <span className="text-[9px] md:text-[10px] font-black text-green-600 uppercase tracking-widest">Tersedia</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
      <span className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest">Terisi</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-md shadow-red-200 animate-pulse"></div>
      <span className="text-[9px] md:text-[10px] font-black text-red-600 uppercase tracking-widest underline decoration-2 underline-offset-4">Pilihan</span>
    </div>
  </div>
);

export const FloorSwitcher = () => {
  const { currentFloor, setCurrentFloor } = useOrder();
  
  return (
    <div className="inline-flex p-1 bg-gray-100 rounded-2xl gap-1 w-full md:w-auto">
      <button 
        onClick={() => setCurrentFloor(1)}
        className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${currentFloor === 1 ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
      >
        Lantai 1
      </button>
      <button 
        onClick={() => setCurrentFloor(2)}
        className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${currentFloor === 2 ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
      >
        Lantai 2
      </button>
    </div>
  );
};

export default function RestaurantMap({ interactive = true }: { interactive?: boolean }) {
  const { currentFloor, selectedTable, setSelectedTable } = useOrder();
  const floorTables = INITIAL_TABLES.filter(t => t.floor === currentFloor);

  const handleTableSelect = (tableId: number, isOccupied: boolean) => {
    if (isOccupied) return;
    setSelectedTable(tableId);
  };

  return (
    <div className="w-full pb-8">
      <div className={`relative w-full aspect-[4/5] md:aspect-auto md:h-[600px] bg-white rounded-[2rem] md:rounded-[2.5rem] border-2 border-gray-100 overflow-hidden shadow-inner mb-4 transition-all duration-500 ${!interactive ? 'opacity-90 pointer-events-none scale-95 origin-top' : ''}`}>
        <div className="absolute inset-0 bg-[#fdfdfd]" style={{ backgroundImage: 'radial-gradient(#eee 1px, transparent 1px)', backgroundSize: '20px 20px md:30px 30px' }}></div>

        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-48 h-8 md:h-10 bg-gray-100 border-x border-b border-gray-200 rounded-b-3xl flex items-center justify-center z-10">
            <span className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest">Entrance</span>
          </div>
          {currentFloor === 1 && (
            <div className="absolute top-10 left-0 w-24 md:w-28 h-32 md:h-40 bg-gray-50 border-r border-b border-gray-200 flex items-center justify-center">
              <span className="text-[10px] text-gray-300 font-bold -rotate-90 uppercase tracking-widest">Kitchen Area</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-red-50/20 border-t-2 border-dashed border-red-100 flex items-start justify-start p-4">
            <span className="text-[10px] text-red-200 font-black uppercase tracking-widest opacity-50">{currentFloor === 1 ? 'VIP Zone' : 'VIP Balcony'}</span>
          </div>
        </div>

        <div key={currentFloor} className="animate-in fade-in zoom-in-95 duration-500 w-full h-full relative">
          {floorTables.map(table => {
            const isSelected = selectedTable === table.id;
            const isOccupied = table.isOccupied;

            let baseStyle = "bg-green-50 border-green-200 text-green-900 hover:border-green-400";
            if (isOccupied) baseStyle = "bg-gray-100 border-gray-200 text-gray-300 opacity-50 cursor-not-allowed";
            if (isSelected) baseStyle = "bg-red-600 border-red-700 text-white shadow-xl scale-110 z-20";

            let shape = "rounded-full";
            let size = "w-8 h-8 md:w-16 md:h-16";

            if (table.type === "square") { shape = "rounded-lg md:rounded-2xl"; size = "w-9 h-9 md:w-18 md:h-18"; }
            else if (table.type === "rect") { shape = "rounded-lg md:rounded-2xl"; size = "w-12 h-8 md:w-24 md:h-18"; }
            else if (table.type === "rect-vip") { shape = "rounded-lg md:rounded-2xl"; size = "w-14 h-8 md:w-28 md:h-16"; }

            return (
              <button
                key={table.id}
                disabled={!interactive || isOccupied}
                onClick={() => handleTableSelect(table.id, isOccupied)}
                className={`absolute flex flex-col items-center justify-center transition-all duration-300 border-2 shadow-sm ${baseStyle} ${shape} ${size}`}
                style={{ left: `${table.x}%`, top: `${table.y}%`, transform: `translate(-50%, -50%) ${isSelected ? 'scale(1.05)' : 'scale(1)'}` }}
              >
                <span className="font-black text-[9px] md:text-xs leading-none mb-0.5">{table.name}</span>
                <span className={`text-[7px] md:text-[9px] font-bold uppercase tracking-tighter ${isSelected ? 'text-red-100' : 'text-green-600/60'}`}>{table.capacity} Kursi</span>
                {!isOccupied && !isSelected && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        <span className="text-[9px] md:text-[10px] font-black uppercase text-gray-300">Pilih Meja yang Tersedia</span>
      </div>
    </div>
  );
}
