import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, QrCode, ArrowRight, UtensilsCrossed, ChevronRight, Wine, ChevronDown, Star } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  // High-Res Italian Ambience
  const bgImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop";
  
  // UPDATED: Man Cooking (Redcharlie / Unsplash ID: t-7KEq9M0b0)
  const chefImage = "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden bg-[#2C0505]">
      
      {/* --- FONTS & GLOBAL STYLES --- */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
          .font-display { font-family: 'Playfair Display', serif; }
          .font-body { font-family: 'DM Sans', sans-serif; }
          
          /* Ivory & Burgundy Palette */
          .text-ivory { color: #FDFBF7; }
          .bg-ivory { background-color: #FDFBF7; }
          .bg-burgundy-glass { background-color: rgba(74, 4, 4, 0.65); }
          .border-ivory-20 { border-color: rgba(253, 251, 247, 0.2); }
          
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in-up 1s ease-out forwards; }
        `}
      </style>

      {/* --- FIXED BACKGROUND (Parallax Effect) --- */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('${bgImage}')` }}
        ></div>
        {/* Dark Burgundy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C0505] via-[#2C0505]/80 to-[#2C0505]/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* === SECTION 1: HERO & ACTIONS === */}
        <div className="min-h-screen flex flex-col justify-between pb-10">
          
          {/* Hero Header */}
          <div className="p-8 pt-24 text-center animate-fade-in">
            <div className="w-20 h-20 bg-[#FDFBF7]/5 rounded-full flex items-center justify-center mb-8 backdrop-blur-md border border-[#FDFBF7]/20 mx-auto shadow-2xl ring-1 ring-[#FDFBF7]/10">
              <UtensilsCrossed size={36} className="text-[#FDFBF7]" />
            </div>
            
            <h1 className="text-6xl font-display font-bold text-[#FDFBF7] mb-3 tracking-tight drop-shadow-2xl">
              Gusto <span className="italic font-normal text-[#FDFBF7]/90">Rosso</span>
            </h1>
            
            <p className="text-[#FDFBF7]/70 text-lg font-body max-w-[280px] mx-auto leading-relaxed tracking-wide">
              A Symphony of Italian Heritage & Modern Taste.
            </p>
          </div>

          {/* Action Card */}
          <div className="p-6">
            <div className="bg-burgundy-glass backdrop-blur-xl border border-ivory-20 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
              
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FDFBF7]/5 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex items-center justify-center gap-4 mb-8 opacity-60">
                <div className="h-[1px] w-8 bg-[#FDFBF7]"></div>
                <span className="font-body font-bold text-[#FDFBF7] text-[10px] uppercase tracking-[0.25em]">Benvenuto</span>
                <div className="h-[1px] w-8 bg-[#FDFBF7]"></div>
              </div>
              
              <div className="space-y-4 font-body">
                {/* Book Table Button */}
                <button 
                  onClick={() => navigate('/reserve')}
                  className="w-full group relative overflow-hidden rounded-2xl transition-all duration-300 active:scale-95"
                >
                  <div className="absolute inset-0 border border-[#FDFBF7]/30 rounded-2xl group-hover:bg-[#FDFBF7]/10 transition-all"></div>
                  <div className="relative flex items-center gap-4 p-5">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#FDFBF7] border border-[#FDFBF7]/20 group-hover:scale-110 transition-transform">
                      <MapPin size={22} />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-bold text-xl text-[#FDFBF7] mb-0.5 font-display">Reservations</h4>
                      <p className="text-[#FDFBF7]/60 text-xs uppercase tracking-wider">Book a table</p>
                    </div>
                    <ChevronRight size={20} className="text-[#FDFBF7]/40 group-hover:text-[#FDFBF7] group-hover:translate-x-1 transition-all" />
                  </div>
                </button>

                {/* Dine In Button */}
                <button 
                  onClick={() => navigate('/dining')}
                  className="w-full group rounded-2xl bg-[#FDFBF7] text-[#4A0404] shadow-lg shadow-black/20 transform active:scale-95 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  <div className="relative flex items-center gap-4 p-5">
                    <div className="w-12 h-12 bg-[#4A0404]/10 rounded-full flex items-center justify-center border border-[#4A0404]/10">
                      <QrCode size={22} className="text-[#4A0404]" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-bold text-xl text-[#800020] mb-0.5 font-display">Dine-In Order</h4>
                      <p className="text-[#4A0404]/70 text-xs font-bold uppercase tracking-wider">Scan QR Code</p>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#4A0404]/40 group-hover:text-[#4A0404] group-hover:translate-x-1 transition-all">
                      <ArrowRight size={24} strokeWidth={2.5} />
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Scroll Hint */}
            <div className="mt-8 flex justify-center animate-bounce opacity-50">
              <ChevronDown className="text-[#FDFBF7]" size={24} />
            </div>
          </div>
        </div>

        {/* === SECTION 2: THE ABOUT STORY === */}
        <div className="bg-[#FDFBF7] text-[#2C0505] rounded-t-[3rem] px-8 py-16 relative shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]">
          
          {/* Decor Line */}
          <div className="w-12 h-1 bg-[#2C0505]/10 rounded-full mx-auto mb-10"></div>

          <div className="max-w-lg mx-auto">
            <p className="text-center font-bold text-[#800020] uppercase tracking-widest text-xs mb-6">Our Heritage</p>
            
            <h2 className="text-4xl md:text-5xl font-display font-medium text-center leading-tight mb-8">
              "Cooking is an act of <span className="italic text-[#800020]">love</span>."
            </h2>

            <div className="font-body text-[#2C0505]/70 text-lg leading-relaxed space-y-6 text-center mb-12">
              <p>
                Founded in 2024, <strong>Gusto Rosso</strong> brings the authentic flavors of Tuscany to the heart of the city. We believe in slow food, deep wines, and the magic that happens when good people gather around a table.
              </p>
              <p>
                Every dish is crafted with locally sourced ingredients and centuries-old techniques passed down through generations of the Rossi family.
              </p>
            </div>

            {/* Chef Highlight Card */}
            <div className="bg-white rounded-[2rem] p-4 shadow-xl mb-12 transform rotate-1 hover:rotate-0 transition-transform duration-500">
               <div className="h-64 rounded-[1.5rem] overflow-hidden relative mb-6">
                 {/* Updated Chef Image */}
                 <img src={chefImage} alt="Head Chef" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                 <div className="absolute bottom-4 left-4 bg-[#FDFBF7]/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[#800020]">
                   Head Chef
                 </div>
               </div>
               <div className="px-2 text-center pb-4">
                 <h3 className="font-display text-2xl font-bold text-[#2C0505] mb-1">Giovanni Rossi</h3>
                 <p className="text-sm text-gray-500 italic">"We don't just serve food. We serve memories."</p>
               </div>
            </div>

            {/* Accolades */}
            <div className="flex justify-center gap-8 border-t border-[#2C0505]/10 pt-10">
              <div className="text-center">
                <Star className="w-6 h-6 text-[#800020] mx-auto mb-2 fill-[#800020]"/>
                <p className="font-display font-bold text-xl">4.9</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Rating</p>
              </div>
              <div className="w-[1px] bg-[#2C0505]/10"></div>
              <div className="text-center">
                <Wine className="w-6 h-6 text-[#800020] mx-auto mb-2"/>
                <p className="font-display font-bold text-xl">120+</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Wines</p>
              </div>
              <div className="w-[1px] bg-[#2C0505]/10"></div>
              <div className="text-center">
                <div className="w-6 h-6 text-[#800020] mx-auto mb-2 font-display font-bold italic">24</div>
                <p className="font-display font-bold text-xl">Est.</p>
                <p className="text-[10px] uppercase tracking-widest opacity-60">Year</p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#2C0505] text-[#FDFBF7]/40 py-8 text-center text-xs">
          <p>© 2024 Gusto Rosso Italian.</p>
          <p className="mt-1">Nairobi, Kenya</p>
        </div>

      </div>
    </div>
  );
}