// components/LogoUpload.tsx
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LogoUpload({ currentLogo, onUpload }: {
  currentLogo: string;
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      let { error } = await supabase.storage
        .from('user-logos')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('user-logos')
        .getPublicUrl(filePath);

      onUpload(publicUrl);
    } catch (error) {
      console.error('Error uploading logo:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Logo/Imagen de perfil
      </label>
      {currentLogo && (
        <img 
          src={currentLogo} 
          alt="Logo actual" 
          className="w-20 h-20 rounded-full mb-2 object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
      />
      {uploading && <p className="text-xs text-gray-500 mt-1">Subiendo imagen...</p>}
    </div>
  );
}