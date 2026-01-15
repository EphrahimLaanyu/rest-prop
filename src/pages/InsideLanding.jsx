import React, { useState } from 'react';
import { 
  Bell, Plus, ChevronRight, X, Wallet, 
  Receipt, ChefHat, Utensils, Star, CheckCircle2, QrCode, UserPlus
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/Menu';

const SESSION_GUESTS = [
  { id: 1, name: "You", avatar: "bg-gray-900" },
  { id: 2, name: "Stacy", avatar: "bg-purple-600" },
];

export default function InsideLanding() {
  const [guests, setGuests] = useState(SESSION_GUESTS);
  const [activeCategory, setActiveCategory] = useState("All"); 
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [orderStatus, setOrderStatus] = useState('IDLE');
  const [billModalOpen, setBillModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false); 
  const [splitMode, setSplitMode] = useState('MY_ITEMS');

  // --- ACTIONS ---
  const handleAddToCart = (item) => {
    const newItem = { ...item, tempId: Date.now() };
    setCart([...cart, newItem]);
    if (navigator.vibrate) navigator.vibrate(50);
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3`}>
        <div className="bg-green-500 rounded-full p-1"><CheckCircle2 size={12}/></div>
        <span className="font-bold text-sm">Added {item.name}</span>
      </div>
    ));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const newOrders = cart.map(item => ({ ...item, orderedBy: 1, status: 'Ordered' }));
    setOrders([...orders, ...newOrders]);
    setCart([]); 
    setOrderStatus('SENT');
    setTimeout(() => setOrderStatus('PREPARING'), 3000);
    setTimeout(() => {
      setOrderStatus('SERVED');
      setTimeout(() => setOrderStatus('IDLE'), 5000); 
    }, 8000);
  };

  const handleCallWaiter = () => {
    toast.success("Concierge Notified. Coming to Table 08.", {
      icon: '🤵',
      style: { borderRadius: '12px', background: '#333', color: '#fff' }
    });
  };

  // --- CALCULATIONS ---
  const grandTotal = orders.reduce((sum, item) => sum + item.price, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const myItems = orders.filter(item => item.orderedBy === 1);
  const myTotal = myItems.reduce((sum, item) => sum + item.price, 0); 
  const splitEqualAmount = guests.length > 0 ? Math.ceil(grandTotal / guests.length) : grandTotal;

  // Helper to determine which items to show on receipt
  const receiptItems = splitMode === 'MY_ITEMS' ? myItems : orders;

  return (
    <div className="min-h-screen bg-[#F2F3F5] font-sans relative text-gray-800 overflow-x-hidden">
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Space+Mono:wght@400;700&display=swap');
          .font-display { font-family: 'Playfair Display', serif; }
          .font-body { font-family: 'DM Sans', sans-serif; }
          .font-mono { font-family: 'Space Mono', monospace; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .receipt-paper {
            background-image: radial-gradient(#F2F3F5 1px, transparent 0);
            background-size: 10px 10px;
          }
        `}
      </style>

      <Toaster position="top-center" />

      {/* HEADER */}
      <div className="pt-8 px-6 pb-4 flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 font-body">Current Session</p>
          <h1 className="text-4xl font-display font-bold text-gray-900 leading-none">Table 08<span className="text-green-500">.</span></h1>
        </div>
        <div className="flex items-center">
          <div className="flex -space-x-4 mr-3">
            {guests.map((g) => (
              <div key={g.id} className={`w-12 h-12 rounded-full border-4 border-[#F2F3F5] flex items-center justify-center text-white font-bold shadow-lg ${g.avatar} relative z-10`}>
                {g.name[0]}
              </div>
            ))}
          </div>
          <button onClick={() => setInviteModalOpen(true)} className="w-12 h-12 rounded-full bg-white text-black border border-gray-200 flex items-center justify-center shadow-md active:scale-90 transition-all z-0">
            <UserPlus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* SERVICE WIDGETS */}
      <div className="px-6 mt-4">
        {orderStatus !== 'IDLE' && (
          <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-xl mb-4 flex items-center justify-between animate-slide-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-green-400 animate-pulse">
                {orderStatus === 'SENT' ? <Receipt size={18}/> : orderStatus === 'PREPARING' ? <ChefHat size={18}/> : <Utensils size={18}/>}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Kitchen Update</h4>
                <p className="text-xs text-gray-400">
                  {orderStatus === 'SENT' ? 'Order Received' : orderStatus === 'PREPARING' ? 'Chef is cooking...' : 'Order Served!'}
                </p>
              </div>
            </div>
            <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
               <div className={`h-full bg-green-500 transition-all duration-1000 ${orderStatus === 'SENT' ? 'w-1/3' : orderStatus === 'PREPARING' ? 'w-2/3' : 'w-full'}`}/>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button onClick={handleCallWaiter} className="group h-32 bg-white rounded-[2rem] p-5 flex flex-col justify-between shadow-sm border border-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between w-full">
              <div className="p-2.5 bg-orange-50 text-orange-500 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors"><Bell size={20} /></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-left">
              <span className="block font-display font-bold text-lg text-gray-900">Concierge</span>
              <span className="text-xs text-gray-400 font-medium">Call for assistance</span>
            </div>
          </button>
          
          <button onClick={() => setBillModalOpen(true)} className="group h-32 bg-gray-900 rounded-[2rem] p-5 flex flex-col justify-between shadow-xl shadow-gray-300 hover:shadow-2xl hover:shadow-gray-400 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex justify-between w-full relative z-10">
              <div className="p-2.5 bg-white/10 text-white rounded-full backdrop-blur-md"><Wallet size={20} /></div>
            </div>
            <div className="text-left relative z-10">
              <span className="block font-display font-bold text-lg text-white">Pay Bill</span>
              <span className="text-xs text-gray-400 font-medium">KES {grandTotal > 0 ? grandTotal.toLocaleString() : '0.00'}</span>
            </div>
          </button>
        </div>
      </div>

      {/* MENU SECTION */}
      <div className="mt-10 pb-32 font-body">
        <div className="px-6 mb-6">
          <div className="flex justify-between items-end mb-4">
            <h2 className="font-display font-bold text-2xl text-gray-900">The Menu</h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Scroll ➜</span>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {MENU_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 border ${activeCategory === cat ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white text-gray-500 border-transparent shadow-sm'}`}>{cat}</button>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-8 pt-2 no-scrollbar items-center">
          {MENU_ITEMS.filter(item => activeCategory === "All" || item.category === activeCategory).map((item) => (
            <div key={item.id} className="min-w-[80vw] md:min-w-[350px] snap-center relative group">
              <div className="h-[460px] w-full bg-white rounded-[2.5rem] overflow-hidden relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] transition-all duration-500">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute top-5 left-5 right-5 flex justify-between">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{item.category}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl font-display font-medium italic leading-none mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between mt-6">
                    <div>
                       <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold mb-0.5">Price</p>
                       <p className="text-2xl font-bold">KES {item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => handleAddToCart(item)} className="h-14 w-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-lg active:scale-90">
                      <Plus size={24} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="min-w-[4vw] snap-center"></div>
        </div>
      </div>

      {/* FLOATING CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-50 animate-slide-up">
           <div className="bg-gray-900 text-white p-4 pr-3 rounded-2xl shadow-2xl flex justify-between items-center ring-4 ring-white/20 backdrop-blur-xl">
            <div className="flex items-center gap-4 pl-2">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold font-body">{cart.length}</div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
              </div>
              <div className="flex flex-col font-body">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Tab Total</span>
                <span className="font-bold text-lg">KES {cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={handlePlaceOrder} className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
              Order <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* INVITE MODAL */}
      {inviteModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm p-6">
           <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center shadow-2xl animate-scale-up relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>
             <h3 className="text-2xl font-display font-bold mb-2">Join Table 08</h3>
             <p className="text-gray-400 text-sm mb-8">Scan to join the ordering session</p>
             <div className="w-56 h-56 bg-gray-900 mx-auto rounded-3xl mb-8 flex items-center justify-center text-gray-500 relative group cursor-pointer shadow-inner">
               <QrCode size={120} className="text-white group-hover:scale-110 transition-transform duration-500"/>
             </div>
             <button onClick={() => setInviteModalOpen(false)} className="w-full py-4 bg-gray-100 rounded-2xl font-bold text-gray-900 hover:bg-gray-200">Close</button>
           </div>
        </div>
      )}

      {/* =======================================================
          RECEIPT MODAL (UPDATED)
      ======================================================= */}
      {billModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-end justify-center backdrop-blur-md p-4">
          <div className="bg-white w-full max-w-md rounded-t-[2rem] p-6 pb-8 animate-slide-up shadow-2xl relative h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold">Checkout</h2>
              <button onClick={() => setBillModalOpen(false)} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"><X size={20}/></button>
            </div>

            {/* Split Toggles */}
            <div className="bg-gray-100 p-1.5 rounded-2xl flex mb-6 flex-shrink-0">
              {[{id:'MY_ITEMS', label:'My Items'}, {id:'EQUAL', label:'Split Equal'}, {id:'HOST_ALL', label:'Pay All'}].map(mode => (
                <button key={mode.id} onClick={()=>setSplitMode(mode.id)} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all duration-300 ${splitMode===mode.id ? 'bg-white shadow-lg text-black scale-100' : 'text-gray-400 scale-95'}`}>{mode.label}</button>
              ))}
            </div>
            
            {/* THE RECEIPT PAPER */}
            <div className="receipt-paper bg-white border-2 border-dashed border-gray-200 rounded-xl p-6 flex-1 overflow-y-auto mb-6 relative">
              <div className="text-center mb-6">
                <p className="font-display font-bold text-xl tracking-tight">THE MODERN DINER</p>
                <p className="text-[10px] font-mono text-gray-400 uppercase">Table 08 • {new Date().toLocaleDateString()}</p>
              </div>

              {/* Items List */}
              <div className="space-y-3 font-mono text-sm mb-6">
                {orders.length === 0 ? (
                   <p className="text-center text-gray-400 italic py-4">No items ordered yet.</p>
                ) : (
                  receiptItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-gray-100 pb-2">
                      <span className="text-gray-600 line-clamp-1 w-2/3">{item.name}</span>
                      <span className="font-bold text-gray-900">{item.price}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Math Section */}
              <div className="pt-4 border-t-2 border-black border-dashed mt-auto">
                <div className="flex justify-between font-mono text-xs text-gray-500 mb-1">
                  <span>Subtotal</span>
                  <span>KES {(splitMode === 'MY_ITEMS' ? myTotal : grandTotal).toLocaleString()}</span>
                </div>
                {splitMode === 'EQUAL' && (
                  <div className="flex justify-between font-mono text-xs text-green-600 mb-1">
                     <span>Split ({guests.length} Guests)</span>
                     <span>÷ {guests.length}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-end mt-4">
                  <span className="font-display font-bold text-xl">TOTAL DUE</span>
                  <span className="font-mono font-bold text-2xl border-b-4 border-yellow-400">
                    KES {(splitMode === 'MY_ITEMS' ? myTotal : splitMode === 'EQUAL' ? splitEqualAmount : grandTotal).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Bottom Cut Decor */}
              <div className="absolute -bottom-2 left-0 right-0 h-4 bg-white" style={{clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)'}}></div>
            </div>

            <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black shadow-xl shadow-gray-400/50 flex items-center justify-center gap-2 flex-shrink-0">
              <Wallet size={20} /> Pay Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}