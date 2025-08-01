"use client";

import React, { useState } from "react";
import "./styles/global.css";
import UnitSelector from "./components/UnitSelector";
import Converter from "./components/Converter";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Distancia");

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        border: "1px solid gold",
        borderRadius: "12px"
      }}
    >
      <UnitSelector selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      <div style={{
        width: "100%",
        aspectRatio: "1/1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        
      }}>
        <Converter selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
