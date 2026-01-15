import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your pages
import Landing from './pages/Landing';
import InsideLanding from './pages/InsideLanding';       // The "Inside" Service Dashboard
import OutsideReservation from './pages/OutsideReservation'; // The "Outside" Table Map

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* The Entry Point */}
        <Route path="/" element={<Landing />} />

        {/* OUTSIDE FLOW: Visual Table Booking */}
        <Route path="/reserve" element={<OutsideReservation />} />

        {/* INSIDE FLOW: Service, Ordering & Bill Splitting */}
        {/* We assume clicking "Scan QR" on the landing page redirects here */}
        <Route path="/dining" element={<InsideLanding />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;