// src/components/admin/AdminLayout.tsx
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Store,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Your signature Comic Sans styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
    { icon: <Package size={20} />, label: 'Products', path: '/admin/products' },
    { icon: <Users size={20} />, label: 'Customers', path: '/admin/customers' },
    { icon: <Settings size={20} />, label: 'Site Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR SUPERVISOR */}
      <aside 
        className={`${isCollapsed ? 'w-20' : 'w-64'} bg-black text-white transition-all duration-300 border-r-4 border-[#FFD700] flex flex-col`}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {!isCollapsed && <h2 style={comicSansBold} className="text-[#FFD700] text-2xl italic">ADMIN</h2>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-[#FFD700] hover:text-black transition-colors rounded"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Laborers */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-4 p-3 hover:bg-[#FFD700] hover:text-black transition-all group"
              style={comicSansBold}
            >
              <span className="text-[#FFD700] group-hover:text-black">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <button 
            style={comicSansRegular}
            className="w-full flex items-center gap-4 p-3 text-gray-400 hover:text-white transition-colors"
          >
            <Store size={20} />
            {!isCollapsed && <span>View Store</span>}
          </button>
          <button 
            style={comicSansRegular}
            className="w-full flex items-center gap-4 p-3 text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA (The Manager's Desk) */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white border-b-4 border-black flex items-center justify-between px-8">
          <h1 style={comicSansBold} className="text-xl uppercase tracking-tighter text-black">
            Kevin11 Command Center
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#FFD700] border-2 border-black rounded-full flex items-center justify-center font-bold">
              K11
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
