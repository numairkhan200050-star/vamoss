import React from 'react';

export const AdminDashboard = () => {
  // Temporary bypass session for dev
  // const [session, setSession] = useState<any>(null);
  // const [loading, setLoading] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 border-r-4 border-[#FFD700] flex flex-col">
        <h2 className="text-3xl font-black italic text-[#FFD700] mb-10">
          K11 HQ
        </h2>
        <nav className="space-y-2 flex-grow">
          <button className="w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] bg-[#FFD700] text-black">
            Orders
          </button>
          <button className="w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] hover:bg-zinc-900">
            Products
          </button>
          <button className="w-full flex items-center gap-3 p-4 font-black uppercase text-[10px] hover:bg-zinc-900">
            FOMO / General
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-2xl font-black">Admin Panel Test</h1>
      </main>
    </div>
  );
};
