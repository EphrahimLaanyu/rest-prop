import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// --- DUMMY DATA: THE FLOOR PLAN ---
// 0 = Walkway/Empty, 1 = Available Table, 2 = Booked Table, 3 = Kitchen/Wall
const FLOOR_GRID = [
  [3, 3, 3, 3, 3, 3, 0, 1], // Row 1 (Kitchen top left, Table top right)
  [3, 0, 0, 0, 0, 0, 0, 1], 
  [0, 1, 0, 2, 0, 1, 0, 0], // Row 3
  [0, 1, 0, 2, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0], // Main Walkway
  [1, 0, 1, 0, 1, 0, 2, 0], // Window Seats (Bottom)
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
  const [selectedTime, setSelectedTime] = useState("1:00 PM");
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (rowIndex, colIndex, status) => {
    if (status === 2 || status === 3) return; // Ignore booked or walls
    
    const seatId = `${rowIndex}-${colIndex}`;
    setSelectedSeat(selectedSeat === seatId ? null : seatId);
  };

  const handleConfirm = () => {
    if (!selectedSeat) {
      toast.error("Please select a table on the map.");
      return;
    }
    // Proceed to Pre-Order Menu
    toast.success("Table Locked! Proceeding to Menu...");
    // navigate('/remote/menu'); // Uncomment to link pages
  };

  const getSeatLabel = (r, c) => TABLE_DETAILS[`${r}-${c}`];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* HEADER */}
      <div className="bg-white p-6 shadow-sm mb-6">
        <h1 className="text-2xl font-bold">Book a Table</h1>
        <p className="text-gray-500 text-sm">Select your time & exact spot.</p>
      </div>

      {/* STEP 1: TIME SELECTOR (Feature 2.1) */}
      <div className="px-6 mb-8">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Clock size={16} /> Arrival Time
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                selectedTime === time 
                  ? 'bg-black text-white shadow-lg scale-105' 
                  : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2: VISUAL MAP (Feature 2.2) */}
      <div className="px-6">
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <MapPin size={16} /> Select Table
          </h3>
          {/* Legend */}
          <div className="flex gap-3 text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-white border border-gray-300"></div> Avail</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-gray-200"></div> Booked</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-black"></div> You</span>
          </div>
        </div>

        {/* The Grid Map Container */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 overflow-hidden relative">
          
          {/* Visual Decor: Windows/Entry */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-200 z-10 text-[8px] text-center text-blue-400 font-bold uppercase tracking-widest">
            Main Window View
          </div>

          <div className="grid grid-cols-8 gap-2 aspect-square">
            {FLOOR_GRID.map((row, rIndex) => (
              row.map((cell, cIndex) => {
                const seatId = `${rIndex}-${cIndex}`;
                const details = getSeatLabel(rIndex, cIndex);
                const isSelected = selectedSeat === seatId;

                // Render logic
                if (cell === 0) return <div key={`${rIndex}-${cIndex}`} />; // Walkway
                if (cell === 3) return <div key={`${rIndex}-${cIndex}`} className="bg-gray-100 rounded-sm" />; // Wall

                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(rIndex, cIndex, cell)}
                    disabled={cell === 2}
                    className={`
                      relative rounded-lg flex items-center justify-center transition-all duration-300
                      ${cell === 2 ? 'bg-gray-200 cursor-not-allowed opacity-50' : ''}
                      ${cell === 1 && !isSelected ? 'bg-white border-2 border-green-100 hover:border-green-400' : ''}
                      ${isSelected ? 'bg-black text-white shadow-xl scale-110 z-10' : ''}
                    `}
                  >
                    {/* Chair Graphic */}
                    <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-gray-300'}`}></div>
                  </button>
                );
              })
            ))}
          </div>
        </div>

        {/* Selected Table Context Card */}
        {selectedSeat ? (
          <div className="mt-4 p-4 bg-black text-white rounded-2xl animate-slide-up flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Selected Selection</p>
              <h4 className="font-bold text-lg">{TABLE_DETAILS[selectedSeat]?.name || "Standard Table"}</h4>
              <div className="flex gap-2 mt-1">
                {TABLE_DETAILS[selectedSeat]?.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-800 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{selectedTime}</p>
            </div>
          </div>
        ) : (
           <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-2xl text-center text-gray-400 text-sm">
             Tap a white box to preview the table
           </div>
        )}
      </div>

      {/* BOTTOM ACTION */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
        <button 
          onClick={handleConfirm}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
            selectedSeat ? 'bg-green-600 text-white shadow-lg hover:bg-green-700' : 'bg-gray-200 text-gray-400'
          }`}
        >
          Continue to Pre-Order <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}