"use client";

import React, { useState, useEffect } from "react";

export default function UnitSelector({ selectedCategory, onChange }: { selectedCategory: string, onChange: (category: string) => void }) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchedCategories = ['Distancia', 'Temperatura', 'Peso', 'Moeda'];
    setCategories(fetchedCategories);
  }, []);

  return (
    <select value={selectedCategory} onChange={(e) => onChange(e.target.value)}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );

}
