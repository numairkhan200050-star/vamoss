import React, { useState } from 'react';

type LinkType = 'page' | 'collection' | 'category' | 'fomo';

interface MenuItem {
  id: number;
  title: string;
  linkType: LinkType;
  linkTarget: string; // slug, collection id, page id
  subCategories?: MenuItem[];
}

export const AdminMenuSettings = () => {
  const [menu, setMenu] = useState<MenuItem[]>([
    {
      id: 1,
      title: "Men's Grooming",
      linkType: 'category',
      linkTarget: '',
      subCategories: [
        { id: 101, title: 'Gadgets', linkType: 'collection', linkTarget: '', subCategories: [] },
        { id: 102, title: 'Skincare', linkType: 'collection', linkTarget: '', subCategories: [] },
      ]
    },
    {
      id: 2,
      title: "Women's Wellness",
      linkType: 'category',
      linkTarget: '',
      subCategories: []
    }
  ]);

  const [fomoActive, setFomoActive] = useState(true);
  const [fomoLink, setFomoLink] = useState("/collections/deals");

  // Utility to update a menu item by id recursively
  const updateMenuItem = (id: number, key: keyof MenuItem, value: any, items = menu): MenuItem[] => {
    return items.map(item => {
      if (item.id === id) return { ...item, [key]: value };
      if (item.subCategories && item.subCategories.length > 0) {
        return { ...item, subCategories: updateMenuItem(id, key, value, item.subCategories) };
      }
      return item;
    });
  };

  const deleteMenuItem = (id: number, items = menu): MenuItem[] => {
    return items
      .filter(item => item.id !== id)
      .map(item => ({
        ...item,
        subCategories: item.subCategories ? deleteMenuItem(id, item.subCategories) : []
      }));
  };

  const addSubCategory = (parentId: number) => {
    const newId = Math.floor(Math.random() * 100000); // simple unique id
    const newSub: MenuItem = { id: newId, title: '', linkType: 'page', linkTarget: '', subCategories: [] };
    const updatedMenu = menu.map(item => {
      if (item.id === parentId) {
        return { ...item, subCategories: [...(item.subCategories || []), newSub] };
      }
      if (item.subCategories && item.subCategories.length > 0) {
        return { ...item, subCategories: updateMenuItem(parentId, 'subCategories', [...(item.subCategories || []), newSub], item.subCategories) };
      }
      return item;
    });
    setMenu(updatedMenu);
  };

  const saveMenu = () => {
    alert("Menu settings saved! (Connect to DB later)");
    console.log({ menu, fomoActive, fomoLink });
  };

  // Recursive render function
  const renderMenuItems = (items: MenuItem[], level = 0) => (
    <div className={`space-y-2 ml-${level * 4}`}>
      {items.map(item => (
        <div key={item.id} className="border p-3 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-bold">{item.title || 'New Item'}</h4>
            <button
              onClick={() => setMenu(deleteMenuItem(item.id))}
              className="text-red-500 font-bold"
            >Delete</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full"
              value={item.title}
              onChange={e => setMenu(updateMenuItem(item.id, 'title', e.target.value))}
            />

            <select
              className="border p-2 w-full"
              value={item.linkType}
              onChange={e => setMenu(updateMenuItem(item.id, 'linkType', e.target.value as LinkType))}
            >
              <option value="page">Page</option>
              <option value="collection">Collection</option>
              <option value="category">Category</option>
              <option value="fomo">Flash Sale (FOMO)</option>
            </select>

            <input
              type="text"
              placeholder="Link Target"
              className="border p-2 w-full"
              value={item.linkTarget}
              onChange={e => setMenu(updateMenuItem(item.id, 'linkTarget', e.target.value))}
            />
          </div>

          {item.linkType !== 'fomo' && (
            <button
              className="bg-green-500 text-white px-2 py-1 font-bold rounded mt-2"
              onClick={() => addSubCategory(item.id)}
            >
              Add Sub-Category
            </button>
          )}

          {item.subCategories && item.subCategories.length > 0 && (
            <div className="ml-4 mt-2">
              {renderMenuItems(item.subCategories, level + 1)}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black">Menu Management</h2>

      {/* FOMO Section */}
      <div className="border p-4 rounded-lg flex flex-col md:flex-row items-center gap-4">
        <label className="font-bold flex items-center gap-2">
          <input type="checkbox" checked={fomoActive} onChange={e => setFomoActive(e.target.checked)} />
          Flash Sale Active
        </label>
        <input
          type="text"
          className="border p-2 w-full md:w-64"
          placeholder="Flash Sale Link"
          value={fomoLink}
          onChange={e => setFomoLink(e.target.value)}
        />
      </div>

      {/* Menu Items */}
      {renderMenuItems(menu)}

      <button
        onClick={saveMenu}
        className="bg-black text-white px-6 py-2 font-black uppercase rounded"
      >
        Save Menu Settings
      </button>
    </div>
  );
};
