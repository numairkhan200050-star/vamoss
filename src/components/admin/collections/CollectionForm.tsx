import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Props {
  collection: any;
  onClose: () => void;
  onSave: () => void;
}

export default function CollectionForm({ collection, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');

  useEffect(() => {
    if (collection) {
      setName(collection.name || '');
      setSlug(collection.slug || '');
      setDescription(collection.description || '');
      setImageUrl(collection.image_url || '');
    }
  }, [collection]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (collection?.id) {
      // Update
      const { error } = await supabase
        .from('collections')
        .update({ name, slug, description, image_url })
        .eq('id', collection.id);
      if (error) console.error(error);
    } else {
      // Insert
      const { error } = await supabase
        .from('collections')
        .insert([{ name, slug, description, image_url }]);
      if (error) console.error(error);
    }
    onSave();
    onClose();
  };

  return (
    <div className="border p-4 rounded shadow bg-white mt-4">
      <h3 className="text-xl font-bold mb-2">{collection?.id ? 'Edit' : 'Add'} Collection</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="font-bold">Name</label>
          <input
            className="w-full border p-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="font-bold">Slug</label>
          <input
            className="w-full border p-2"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="font-bold">Description</label>
          <textarea
            className="w-full border p-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="font-bold">Image URL</label>
          <input
            className="w-full border p-2"
            value={image_url}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            Save
          </button>
          <button type="button" className="bg-gray-400 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


