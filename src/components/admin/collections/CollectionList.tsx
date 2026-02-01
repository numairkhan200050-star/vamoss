import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import CollectionForm from './CollectionForm';

export default function CollectionList() {
  const [collections, setCollections] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  const fetchCollections = async () => {
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setCollections(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('collections').delete().eq('id', id);
    if (error) console.error(error);
    else fetchCollections();
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Collections</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => setEditing({})}
      >
        Add New Collection
      </button>

      {editing && (
        <CollectionForm
          collection={editing}
          onClose={() => setEditing(null)}
          onSave={fetchCollections}
        />
      )}

      <table className="w-full border mt-4">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map(c => (
            <tr key={c.id} className="border-b">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.slug}</td>
              <td className="p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => setEditing(c)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


