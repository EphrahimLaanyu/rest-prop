import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, ChevronRight, Info, 
  ArrowLeft, CheckCircle2, Star, Plus, ChevronDown, Check 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

// IMPORT MENU DATA
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/Menu';

// --- FLOOR PLAN DATA ---
const FLOOR_GRID = [
  [3, 3, 3, 3, 3, 3, 0, 1], 
  [3, 0, 0, 0, 0, 0, 0, 1], 
  [0, 1, 0, 2, 0, 1, 0, 0], 
  [0, 1, 0, 2, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0], 
  [1, 0, 1, 0, 1, 0, 2, 0], 
];

const TABLE_DETAILS = {
  "0-7": { name: "The Nook", type: "2-Seater", tags: ["Quiet"] },
  "1-7": { name: "Corner Booth", type: "4-Seater", tags: ["Privacy"] },
  "2-1": { name: "Center A", type: "4-Seater", tags: ["Social"] },
  "5-0": { name: "Window 1", type: "2-Seater", tags: ["View", "Bright"] },
  "5-2": { name: "Window 2", type: "2-Seater", tags: ["View"] },
  "5-4": { name: "Window 3", type: "4-Seater", tags: ["View"] },
};

const TIME_SLOTS = ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM"];

export default function OutsideReservation() {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [step, setStep] = useState('TABLE'); // 'TABLE' or 'MENU'
  const [selectedTime, setSelectedTime] = useState("1:00 PM");
  const [selectedSeat, setSelectedSeat] = useState(null);
  
  // Menu State
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);

  // --- HANDLERS ---
  const handleSeatClick = (rowIndex, colIndex, status) => {
    if (status === 2 || status === 3) return;
    const seatId = `${rowIndex}-${colIndex}`;
    setSelectedSeat(selectedSeat === seatId ? null : seatId);
  };

  const handleAddToCart = (item) => {
    const newItem = { ...item, tempId: Date.now() };
    setCart([...cart, newItem]);
    if (navigator.vibrate) navigator.vibrate(50);
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-[#2C0505] text-[#FDFBF7] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#FDFBF7]/10`}>
        <div className="bg-[#FDFBF7] text-[#2C0505] rounded-full p-1"><CheckCircle2 size={12}/></div>
        <span className="font-bold text-sm font-body">Added {item.name}</span>
      </div>
    ));
  };

  const handleContinue = () => {
    if (step === 'TABLE') {
      if (!selectedSeat) {
        toast.error("Please select a table on the map.", {
           style: { background: '#2C0505', color: '#fff' }
        });
        return;
      }
      setStep('MENU');
      window.scrollTo(0, 0);
    } else {
      // FINALIZE RESERVATION
      const total = cart.reduce((sum, i) => sum + i.price, 0);
      toast.success(
        `Reservation Confirmed!\nTable: ${TABLE_DETAILS[selectedSeat].name}`, 
        { duration: 5000, icon: '🍷', style: { background: '#2C0505', color: '#fff' } }
      );
      setTimeout(() => navigate('/'), 3000); // Go back home
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const getSeatLabel = (r, c) => TABLE_DETAILS[`${r}-${c}`];

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-32 font-sans text-[#2C0505]">
       <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
          .font-display { font-family: 'Playfair Display', serif; }
          .font-body { font-family: 'DM Sans', sans-serif; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
      <Toaster position="top-center" />

      {/* HEADER */}
      <div className="bg-[#FDFBF7]/90 backdrop-blur-xl sticky top-0 z-20 px-6 py-4 border-b border-[#2C0505]/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {step === 'MENU' && (
            <button onClick={() => setStep('TABLE')} className="p-2 bg-[#2C0505]/5 rounded-full hover:bg-[#2C0505]/10 text-[#2C0505]">
              <ArrowLeft size={18}/>
            </button>
          )}
          <div>
            <h1 className="text-xl font-display font-bold text-[#2C0505]">
              {step === 'TABLE' ? 'Reserve Table' : 'Pre-Order Food'}
            </h1>
            <p className="text-xs text-[#2C0505]/50 font-body uppercase tracking-wider">
              {step === 'TABLE' ? 'Step 1 of 2' : 'Step 2 of 2'}
            </p>
          </div>
        </div>
        
        {/* Mini Summary Widget */}
        {selectedSeat && (
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold uppercase tracking-widest text-[#800020]">{selectedTime}</p>
            <p className="text-xs font-bold text-[#2C0505]/40">{TABLE_DETAILS[selectedSeat]?.name}</p>
          </div>
        )}
      </div>

      {/* =======================================================
          VIEW 1: TABLE SELECTION
      ======================================================= */}
      {step === 'TABLE' && (
        <div className="animate-slide-up font-body">
          {/* STEP 1: TIME SELECTOR */}
          <div className="px-6 py-6">
            <h3 className="text-xs font-bold text-[#2C0505]/40 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Clock size={14} /> Arrival Time
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border ${
                    selectedTime === time 
                      ? 'bg-[#2C0505] text-[#FDFBF7] border-[#2C0505] shadow-lg scale-105' 
                      : 'bg-white border-[#2C0505]/10 text-[#2C0505]/60 hover:border-[#2C0505]/30'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 2: VISUAL MAP */}
          <div className="px-6">
            <div className="flex justify-between items-end mb-3">
              <h3 className="text-xs font-bold text-[#2C0505]/40 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} /> Select Table
              </h3>
              <div className="flex gap-3 text-[10px] text-[#2C0505]/60 font-medium">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-white border border-[#2C0505]/30"></div> Avail</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[#2C0505]/10"></div> Booked</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-[#2C0505]"></div> Yours</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-[#2C0505]/5 border border-[#2C0505]/5 overflow-hidden relative">
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2C0505]/5 z-10 text-[8px] text-center text-[#2C0505]/30 font-bold uppercase tracking-widest">
                Main Window View
              </div>

              <div className="grid grid-cols-8 gap-2 aspect-square">
                {FLOOR_GRID.map((row, rIndex) => (
                  row.map((cell, cIndex) => {
                    const seatId = `${rIndex}-${cIndex}`;
                    const isSelected = selectedSeat === seatId;
                    if (cell === 0) return <div key={`${rIndex}-${cIndex}`} />;
                    if (cell === 3) return <div key={`${rIndex}-${cIndex}`} className="bg-[#2C0505]/5 rounded-lg border border-[#2C0505]/5" />;

                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(rIndex, cIndex, cell)}
                        disabled={cell === 2}
                        className={`
                          relative rounded-xl flex items-center justify-center transition-all duration-300
                          ${cell === 2 ? 'bg-[#2C0505]/10 cursor-not-allowed opacity-50' : ''}
                          ${cell === 1 && !isSelected ? 'bg-white border border-[#2C0505]/20 hover:border-[#800020]' : ''}
                          ${isSelected ? 'bg-[#2C0505] text-[#FDFBF7] shadow-lg scale-110 z-10 border border-[#2C0505]' : ''}
                        `}
                      >
                        <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#FDFBF7]' : 'bg-[#2C0505]/20'}`}></div>
                      </button>
                    );
                  })
                ))}
              </div>
            </div>

            {selectedSeat ? (
              <div className="mt-6 p-5 bg-[#2C0505] text-[#FDFBF7] rounded-3xl animate-slide-up flex justify-between items-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FDFBF7]/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
                
                <div className="relative z-10">
                  <p className="text-[10px] text-[#FDFBF7]/60 font-bold uppercase tracking-widest">Your Choice</p>
                  <h4 className="font-display font-bold text-xl mt-1">{TABLE_DETAILS[selectedSeat]?.name}</h4>
                  <div className="flex gap-2 mt-3">
                    {TABLE_DETAILS[selectedSeat]?.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-1 bg-[#FDFBF7]/10 text-[#FDFBF7] font-bold rounded-lg border border-[#FDFBF7]/10">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right relative z-10">
                  <p className="text-3xl font-display font-bold">{selectedTime}</p>
                </div>
              </div>
            ) : (
               <div className="mt-6 p-6 border-2 border-dashed border-[#2C0505]/10 rounded-3xl text-center text-[#2C0505]/40 text-sm font-medium">
                 Tap a white box above to select your table
               </div>
            )}
          </div>
        </div>
      )}

      {/* =======================================================
          VIEW 2: PRE-ORDER MENU
      ======================================================= */}
      {step === 'MENU' && (
        <div className="animate-slide-up font-body">
          
          {/* Categories */}
          <div className="mt-6 px-6 mb-6">
            <h2 className="font-display font-bold text-2xl text-[#2C0505] mb-2">Pre-Order Favorites</h2>
            <p className="text-sm text-[#2C0505]/60 mb-4">Food will be ready exactly at {selectedTime}.</p>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {MENU_CATEGORIES.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
                    activeCategory === cat 
                    ? 'bg-[#2C0505] text-[#FDFBF7] border-[#2C0505] shadow-lg' 
                    : 'bg-white text-[#2C0505]/60 border-transparent shadow-sm hover:bg-[#FDFBF7] hover:border-[#2C0505]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Snap Cards */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-8 pt-2 no-scrollbar items-center">
            {MENU_ITEMS
              .filter(item => activeCategory === "All" || item.category === activeCategory)
              .map((item) => (
              <div key={item.id} className="min-w-[80vw] md:min-w-[350px] snap-center relative group">
                <div className="h-[400px] w-full bg-white rounded-[2.5rem] overflow-hidden relative shadow-lg group-hover:shadow-xl transition-all duration-500 border border-[#2C0505]/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C0505] via-[#2C0505]/30 to-transparent"></div>
                  
                  <div className="absolute top-5 left-5 right-5 flex justify-between">
                    <span className="bg-[#FDFBF7]/20 backdrop-blur-md text-[#FDFBF7] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#FDFBF7]/20">{item.category}</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-[#FDFBF7]">
                    <h3 className="text-2xl font-display font-medium italic leading-none mb-3">{item.name}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                         <p className="text-[10px] text-[#FDFBF7]/60 uppercase tracking-widest font-bold mb-0.5">Price</p>
                         <p className="text-xl font-bold">KES {item.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => handleAddToCart(item)} className="h-12 w-12 bg-[#FDFBF7] text-[#2C0505] rounded-full flex items-center justify-center hover:bg-[#800020] hover:text-[#FDFBF7] transition-colors shadow-lg active:scale-90">
                        <Plus size={20} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="min-w-[4vw] snap-center"></div>
          </div>
        </div>
      )}

      {/* =======================================================
          DYNAMIC BOTTOM ACTION BAR
      ======================================================= */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7] to-transparent z-30">
        
        {step === 'TABLE' ? (
          <button 
            onClick={handleContinue}
            className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
              selectedSeat ? 'bg-[#2C0505] text-[#FDFBF7] hover:bg-black' : 'bg-[#2C0505]/10 text-[#2C0505]/40'
            }`}
          >
            Continue to Menu <ChevronRight size={20} />
          </button>
        ) : (
          <div className="flex gap-3">
             <div className="flex-1 bg-white p-4 rounded-2xl shadow-lg border border-[#2C0505]/5 flex justify-between items-center">
               <div className="flex flex-col">
                 <span className="text-[10px] text-[#2C0505]/40 uppercase tracking-widest font-bold">Total</span>
                 <span className="font-bold text-xl text-[#2C0505]">KES {cartTotal.toLocaleString()}</span>
               </div>
               <span className="bg-[#2C0505]/5 text-[#2C0505] px-3 py-1 rounded-lg text-xs font-bold">{cart.length} items</span>
             </div>
             
             <button 
                onClick={handleContinue}
                className="flex-[2] bg-[#800020] text-[#FDFBF7] rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl hover:bg-[#2C0505] active:scale-95 transition-all"
             >
               Confirm Booking
             </button>
          </div>
        )}
      </div>
    </div>
  );
}