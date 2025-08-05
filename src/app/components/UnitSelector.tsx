"use client";

import React, { useState, useEffect } from "react";
import { categoryConfig } from "../helpers/logic";

export default function UnitSelector({
  selectedCategory,
  onChange,
}: {
  selectedCategory: string;
  onChange: (category: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchedCategories = Object.keys(categoryConfig);
    setCategories(fetchedCategories);
  }, []);

  return (
    <div className="unitSelectorContainer" style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px 0" }}>
      <label>
        Escolhe o que queres medir
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
