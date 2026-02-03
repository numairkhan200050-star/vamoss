import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Link2, 
  Eye, 
  Save, 
  Power,
  MousePointerClick
} from 'lucide-react';

const AdminFomoSettings = () => {
  // Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // FOMO State Management
  const [isActive, setIsActive] = useState(true);
  const [fomoText, setFomoText] = useState("LIMITED TIME DEALS");
  const [targetDate, setTargetDate] = useState("");
  const [buttonText, setButtonText] = useState("SHOP NOW");
  const [linkType, setLinkType] = useState("collection");
  const [linkTarget, setLinkTarget] = useState("");

  const handleSave = () => {
    const finalData = {
      isActive,
      fomoText,
      targetDate: new Date(targetDate).getTime(),
      buttonText,
      linkType,
      linkTarget
    };
    console.log("Saving to Supabase:", finalData);
    alert("FOMO Engine Updated Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black flex items-center gap-3">
            <Zap className="text-[#FFD700] fill-[#FFD700]" /> FOMO SUPERVISOR
          </h2>
          <p style={comicSansRegular} className="text-gray-500">Create urgency and drive sales with countdown timers.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-black text-[#FFD700] border-2 border-[#FFD700] px-8 py-3 hover:bg-[#FFD700] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={comicSansBold}
        >
          <Save size={20} /> DEPLOY SETTINGS
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: MASTER CONTROL */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 style={comicSansBold} className="text-lg mb-6 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
              <Power size={18} className="text-red-500" /> STATUS
            </h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 border-2 border-dashed border-gray-300">
              <span style={comicSansBold} className="text-sm uppercase">Visible on Site?</span>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-14 h-8 rounded-full relative transition-colors ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isActive ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
          </section>

          <section className="bg-black text-white border-4 border-[#FFD700] p-6 shadow-[8px_8px_0px_0px_rgba(255,215,0,0.2)]">
            <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 text-[#FFD700]">
              <Clock size={18} /> COUNTDOWN
            </h3>
            <label style={comicSansBold} className="text-[10px] uppercase block mb-2 text-gray-400">Sale End Date & Time</label>
            <input 
              type="datetime-local" 
              className="w-full bg-gray-900 border border-gray-700 p-2 text-white outline-none focus:border-[#FFD700]"
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </section>
        </div>

        {/* RIGHT: CONTENT & LINKING */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 style={comicSansBold} className="text-lg mb-6 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
              <MousePointerClick size={18} className="text-[#FFD700]" /> BANNER CONTENT
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label style={comicSansBold} className="text-xs uppercase block mb-1">Headline Text</label>
                  <input 
                    value={fomoText}
                    onChange={(e) => setFomoText(e.target.value)}
                    className="w-full border-2 border-black p-3 outline-none focus:bg-yellow-50" 
                    placeholder="e.g. MEGA SALE"
                  />
                </div>
                <div>
                  <label style={comicSansBold} className="text-xs uppercase block mb-1">Button Label</label>
                  <input 
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full border-2 border-black p-3 outline-none focus:bg-yellow-50" 
                  />
                </div>
              </div>

              <div className="space-y-4 bg-gray-50 p-4 border-2 border-black">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 size={16} />
                  <span style={comicSansBold} className="text-xs uppercase">Target Destination</span>
                </div>
                <select 
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value)}
                  className="w-full border-2 border-black p-2 bg-white outline-none mb-3"
                  style={comicSansBold}
                >
                  <option value="collection">Collection</option>
                  <option value="category">Category</option>
                  <option value="page">Custom Page</option>
                </select>
                <input 
                  placeholder={`Enter ${linkType} ID or URL`}
                  value={linkTarget}
                  onChange={(e) => setLinkTarget(e.target.value)}
                  className="w-full border-b-2 border-black bg-transparent p-2 text-sm outline-none"
                />
                <p className="text-[10px] text-gray-400 italic font-sans mt-2">
                  Tip: Point this to your best-selling collection for max conversions.
                </p>
              </div>
            </div>

            {/* PREVIEW BOX */}
            <div className="mt-10 border-t-2 border-gray-100 pt-6">
              <div className="flex items-center gap-2 mb-4 text-gray-400">
                <Eye size={16} />
                <span style={comicSansBold} className="text-[10px] uppercase">Live Preview Snippet</span>
              </div>
              <div className="bg-gray-100 p-4 border-2 border-black flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] text-gray-500 font-bold uppercase">DON'T MISS OUT</span>
                  <span style={comicSansBold} className="text-sm">{fomoText}</span>
                </div>
                <div className="bg-black text-[#FFD700] px-4 py-1 text-xs font-bold border border-[#FFD700]">
                  {buttonText}
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default AdminFomoSettings;
