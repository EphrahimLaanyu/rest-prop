import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, QrCode, ArrowRight, UtensilsCrossed } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      {/* Hero Section */}
      <div className="p-8 pt-20 z-10">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
          <UtensilsCrossed size={32} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-2">The Modern<br/>Dining Experience.</h1>
        <p className="text-gray-400 text-lg">Seamless ordering, instant service.</p>
      </div>

      {/* Action Buttons Container */}
      <div className="bg-white rounded-t-3xl p-8 pb-12 z-10 animate-slide-up text-gray-900">
        <h3 className="font-bold text-gray-500 text-sm mb-6 uppercase tracking-wider">Choose your mode</h3>
        
        <div className="space-y-4">
          
          {/* OPTION A: OUTSIDE (Book a Table) */}
          <button 
            onClick={() => navigate('/reserve')}
            className="w-full group p-1 rounded-2xl border border-gray-200 hover:border-black transition-all duration-300"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                <MapPin size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-lg">Book a Table</h4>
                <p className="text-gray-500 text-sm">Reserve a spot & pre-order</p>
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-black" />
            </div>
          </button>

          {/* OPTION B: INSIDE (Scan QR) */}
          <button 
            onClick={() => navigate('/dining')}
            className="w-full group p-1 rounded-2xl bg-black text-white shadow-xl transform active:scale-95 transition-all"
          >
             <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                <QrCode size={20} className="text-green-400" />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-lg">I'm at the Restaurant</h4>
                <p className="text-gray-400 text-sm">Scan QR to start session</p>
              </div>
              <ArrowRight className="text-gray-500 group-hover:text-white" />
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}