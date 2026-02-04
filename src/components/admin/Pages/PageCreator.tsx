// src/components/admin/Pages/PageCreator.tsx

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Eye, 
  EyeOff, 
  Search, 
  Globe, 
  FileText, 
  AlertCircle,
  Trash2
} from 'lucide-react';

interface PageCreatorProps {
  pageId: string | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const PageCreator = ({ pageId, onSave, onCancel }: PageCreatorProps) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  // --- PAGE STATE ---
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<'draft' | 'active' | 'disabled'>('draft');
  
  // --- TOGGLE SETTINGS ---
  const [searchVisible, setSearchVisible] = useState(true);
  const [googleVisible, setGoogleVisible] = useState(true);

  // Auto-generate slug from title
  useEffect(() => {
    if (!pageId) {
      setSlug(title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
    }
  }, [title, pageId]);

  const handleFinalSave = () => {
    if (!title || !slug) return alert("Title and Slug are required!");
    
    onSave({
      title,
      slug,
      content,
      status,
      settings: {
        searchVisible,
        googleVisible
      }
    });
  };

  return (
    <div className="bg-white border-8 border-black p-8 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-8 border-black pb-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-black p-3 text-[#FFD700]">
            <FileText size={32} />
          </div>
          <h2 style={comicSansBold} className="text-4xl uppercase italic tracking-tighter">
            {pageId ? 'Edit Page' : 'New Page Creator'}
          </h2>
        </div>
        <button onClick={onCancel} className="hover:rotate-90 transition-transform p-2 border-4 border-black">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <label style={comicSansBold} className="block uppercase text-xs tracking-widest">Page Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ABOUT OUR JOURNEY"
              className="w-full p-5 border-4 border-black text-2xl font-black uppercase outline-none focus:bg-yellow-50"
            />
          </div>

          <div className="space-y-2">
            <label style={comicSansBold} className="block uppercase text-xs tracking-widest">URL Slug</label>
            <div className="flex items-center gap-2 font-mono text-sm bg-gray-100 p-4 border-2 border-dashed border-black">
              <span>yoursite.com/pages/</span>
              <input 
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent border-b-2 border-black outline-none font-bold flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label style={comicSansBold} className="block uppercase text-xs tracking-widest">Page Contents (HTML/Text)</label>
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full p-5 border-4 border-black font-mono text-sm outline-none focus:bg-gray-50 resize-none"
              placeholder="Start writing your page content here..."
            />
          </div>
        </div>

        {/* RIGHT COLUMN: SETTINGS & TOGGLES */}
        <div className="space-y-6">
          {/* STATUS BOX */}
          <div className="border-4 border-black p-6 bg-gray-50">
            <label style={comicSansBold} className="block uppercase text-xs tracking-widest mb-4">Publishing Status</label>
            <div className="flex flex-col gap-2">
              {(['draft', 'active', 'disabled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`p-3 border-2 font-black uppercase text-xs tracking-tighter transition-all ${
                    status === s ? 'bg-black text-[#FFD700] border-black' : 'bg-white border-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* VISIBILITY TOGGLES */}
          <div className="border-4 border-black p-6 space-y-6">
            <label style={comicSansBold} className="block uppercase text-xs tracking-widest mb-2 border-b-2 border-black pb-2">Visibility Settings</label>
            
            {/* SITE SEARCH TOGGLE */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search size={18} />
                <span className="text-[10px] font-black uppercase">Internal Search</span>
              </div>
              <button 
                onClick={() => setSearchVisible(!searchVisible)}
                className={`w-12 h-6 border-2 border-black relative transition-colors ${searchVisible ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0 w-5 h-full bg-black transition-all ${searchVisible ? 'right-0' : 'left-0'}`} />
              </button>
            </div>

            {/* GOOGLE TOGGLE */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe size={18} />
                <span className="text-[10px] font-black uppercase">Google Index</span>
              </div>
              <button 
                onClick={() => setGoogleVisible(!googleVisible)}
                className={`w-12 h-6 border-2 border-black relative transition-colors ${googleVisible ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0 w-5 h-full bg-black transition-all ${googleVisible ? 'right-0' : 'left-0'}`} />
              </button>
            </div>
          </div>

          {/* DANGER ZONE (If Editing) */}
          {pageId && (
            <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 border-2 border-dashed border-red-500 hover:bg-red-50 transition-all uppercase text-[10px] font-black">
              <Trash2 size={16} /> Delete Page Permanently
            </button>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-12 flex gap-4">
        <button 
          onClick={handleFinalSave}
          style={comicSansBold}
          className="flex-1 bg-black text-[#FFD700] py-6 border-4 border-black uppercase tracking-[0.2em] hover:bg-[#FFD700] hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
        >
          {pageId ? 'Update Page' : 'Deploy Page to Site'}
        </button>
      </div>
    </div>
  );
};
// ================= LABOUR VIEW =================
export const LabourPageForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [linkedCollections, setLinkedCollections] = useState<string[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await supabase.from("collections").select("*");
      if (data) setCollections(data);
    };
    fetchCollections();
  }, []);

  useEffect(() => { setSlug(title.toLowerCase().replace(/\s+/g, "-")); }, [title]);

  const handleSave = async () => {
    const payload: Page = {
      title, slug, content,
      linkedCollections, linkedCategories: [], menuLevel: undefined,
      seoTitle: "", seoDescription: "", status: "draft", searchable: true
    };
    await supabase.from("pages").insert([payload]);
    alert("Labour page saved!");
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Labour Page Creation</h2>
      <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-2 w-full"/>
      <textarea placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} className="border p-2 w-full"/>
      <select multiple value={linkedCollections} onChange={e=>setLinkedCollections(Array.from(e.target.selectedOptions, o=>o.value))} className="border p-2 w-full">
        {collections.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2">Save Page</button>
    </div>
  );
};

// ================= SUPERVISOR VIEW =================
export const SupervisorPageForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [linkedCollections, setLinkedCollections] = useState<string[]>([]);
  const [linkedCategories, setLinkedCategories] = useState<string[]>([]);
  const [menuLevel, setMenuLevel] = useState<string>("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [status, setStatus] = useState<Page["status"]>("draft");
  const [searchable, setSearchable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: colData } = await supabase.from("collections").select("*");
      if (colData) setCollections(colData);
      const { data: catData } = await supabase.from("categories").select("*");
      if (catData) setCategories(catData);
    };
    fetchData();
  }, []);

  useEffect(() => { setSlug(title.toLowerCase().replace(/\s+/g, "-")); }, [title]);

  const handleSave = async () => {
    const payload: Page = {
      title, slug, content, linkedCollections, linkedCategories,
      menuLevel, seoTitle, seoDescription, status, searchable
    };
    await supabase.from("pages").insert([payload]);
    alert("Supervisor page saved!");
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg">Supervisor Page Management</h2>
      <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} className="border p-2 w-full"/>
      <textarea placeholder="Content" value={content} onChange={(e)=>setContent(e.target.value)} className="border p-2 w-full"/>
      <select multiple value={linkedCollections} onChange={e=>setLinkedCollections(Array.from(e.target.selectedOptions, o=>o.value))} className="border p-2 w-full">
        {collections.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <select multiple value={linkedCategories} onChange={e=>setLinkedCategories(Array.from(e.target.selectedOptions, o=>o.value))} className="border p-2 w-full">
        {categories.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <select value={menuLevel} onChange={e=>setMenuLevel(e.target.value)} className="border p-2 w-full">
        <option value="">None</option>
        <option value="main">Main</option>
        <option value="sub">Sub</option>
        <option value="sub-sub">Sub-Sub</option>
      </select>
      <input placeholder="SEO Title" value={seoTitle} onChange={(e)=>setSeoTitle(e.target.value)} className="border p-2 w-full"/>
      <textarea placeholder="SEO Description" value={seoDescription} onChange={(e)=>setSeoDescription(e.target.value)} className="border p-2 w-full"/>
      <select value={status} onChange={(e)=>setStatus(e.target.value as Page["status"])} className="border p-2 w-full">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={searchable} onChange={e=>setSearchable(e.target.checked)}/> Searchable
      </label>
      <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2">Save</button>
    </div>
  );
};
