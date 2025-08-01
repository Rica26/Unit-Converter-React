"use client";

import React, { useState, useEffect } from "react";

export default function UnitSelector({
  selectedCategory,
  onChange,
}: {
  selectedCategory: string;
  onChange: (category: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchedCategories = ["Distancia", "Temperatura", "Peso", "Moeda"];
    setCategories(fetchedCategories);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px 0" }}>
      <label style={{ color: "white", fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
        Escolhe o que queres medir
      </label>
      <select
        style={{
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #efbf04",
          color: "white",
          backgroundColor: "#0047ab",
          fontSize: "15px",
          padding: "8px",
          fontWeight: "bold",
        }}
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
