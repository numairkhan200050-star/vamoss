import React from 'react';
import Footer from './components/Footer'; // Adjust path if your file is named differently

// This is your main Application entry point
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content Area 
          As we build more sections (Header, Hero, etc.), 
          we will place them here.
      */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-10">
          <h1 className="text-5xl font-black italic tracking-tighter mb-4">
            KEVIN11 <span className="text-[#FFD700]">STORE</span>
          </h1>
          <p className="text-gray-500 uppercase tracking-widest font-bold text-xs">
            Site Construction in Progress...
          </p>
        </div>
      </main>

      {/* The Footer we just designed */}
      <Footer />
    </div>
  );
}

export default App;
