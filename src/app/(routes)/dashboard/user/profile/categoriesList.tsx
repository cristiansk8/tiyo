'use client';
import { useEffect, useState } from "react";
import getCategories, { Category } from "./getCategories";
import { Check, X } from "lucide-react";

export default function CategoryToggleList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
      // Opcional: Inicializar con algunas categorías seleccionadas
      // setSelectedCategories([data[0]?.id, data[1]?.id].filter(Boolean));
    };
    fetchCategories();
  }, []);

  const handleToggle = (id: number) => {
    setSelectedCategories(prev =>
      prev.includes(id)
        ? prev.filter(catId => catId !== id) // Desmarcar
        : [...prev, id] // Marcar
    );
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategories.includes(cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => handleToggle(cat.id)}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${isSelected
                  ? 'bg-green-100/50 border-2 border-green-300'
                  : 'bg-white border border-gray-200'
                } active:scale-[98%]`}
            >
              <span className={`font-medium text-sm ${isSelected ? 'text-green-800' : 'text-gray-700'
                }`}>
                {cat.name}
              </span>
              <div className={`w-5 h-5 flex items-center justify-center rounded-full ${isSelected
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500/20 text-red-500'
                }`}>
                {isSelected ? <Check size={12} /> : <X size={12} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}