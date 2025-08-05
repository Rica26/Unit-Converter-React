"use client";

import React, { useState } from "react";
import "./styles/global.css";
import UnitSelector from "./components/UnitSelector";
import Converter from "./components/Converter";
import { categoryConfig } from "./helpers/logic";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(categoryConfig)[0] || "Distancia");

  return (
    <div className="mainContainer">
      <UnitSelector selectedCategory={selectedCategory} onChange={setSelectedCategory} />
      <div className="converterContainer">
        <Converter selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
