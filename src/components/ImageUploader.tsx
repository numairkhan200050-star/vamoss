import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Loader2 } from 'lucide-react';

interface Props {
  onUploadSuccess: (url: string) => void;
  label: string;
  bucketName?: string; // Optional, defaults to 'hero-slider'
}

export const ImageUploader = ({ onUploadSuccess, label, bucketName = 'hero-slider' }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      // Upload to Supabase bucket
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Generate signed URL for private bucket (valid for 1 hour)
      const { data: signedUrlData, error: signedUrlError } =
        await supabase.storage.from(bucketName).createSignedUrl(filePath, 3600);

      if (signedUrlError || !signedUrlData.signedUrl) throw signedUrlError;

      setPreview(signedUrlData.signedUrl);
      onUploadSuccess(signedUrlData.signedUrl);
    } catch (error) {
      console.error(error);
      alert('Error uploading image!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-gray-400">{label}</label>
      <div className="relative group w-full h-32 border-2 border-dashed border-black rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center transition-all hover:bg-gray-100">
        {preview ? (
          <img src={preview} className="w-full h-full object-cover" alt="Preview" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            {uploading ? <Loader2 className="animate-spin text-black" /> : <Upload className="text-gray-400" />}
            <span className="text-[10px] font-bold uppercase text-gray-400">
              {uploading ? 'Uploading...' : 'Select Image'}
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};
