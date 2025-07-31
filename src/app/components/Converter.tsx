import React, { useState, useMemo, useEffect } from "react";
import { categoryConfig, convertUnits } from "../helpers/logic";

export default function Converter({ selectedCategory }: { selectedCategory: string }) {
  const [moedasUnit, setMoedasUnit] = useState<string[]>([]);
  const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>({});
  const [inputUnit, setInputUnit] = useState<string>("");
  const [outputUnit, setOutputUnit] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    async function fetchCurrencyRates() {
      try {
        const res = await fetch("https://v6.exchangerate-api.com/v6/9bb14bf9ae90c441a61068da/latest/USD");
        const data = await res.json();
        if (data.result === "success") {
          setCurrencyRates(data.conversion_rates);
          setMoedasUnit(Object.keys(data.conversion_rates).sort());
        } else {
          console.error("Failed to fetch currency rates:", data);
        }
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      }
    }
    fetchCurrencyRates();
  }, []);

  function swapUnits() {
    setInputUnit((prev) => {
      setOutputUnit(prev);
      return outputUnit;
    });
    setOutputUnit((prev) => {
      setInputUnit(prev);
      return inputUnit;
    });
  }

  const units = useMemo(() => {
    if (selectedCategory === "Moeda") {
      return moedasUnit.length > 0 ? moedasUnit : ["Carregando..."];
    }
    return categoryConfig[selectedCategory as keyof typeof categoryConfig] || [];
  }, [selectedCategory, moedasUnit]);

  const outputValue = useMemo(() => {
    if (inputValue && inputUnit && outputUnit) {
      const numericInput = parseFloat(inputValue);
      if (!isNaN(numericInput)) {
        if (selectedCategory === "Moeda" && currencyRates) {
          return convertUnits(numericInput, inputUnit, outputUnit, selectedCategory, currencyRates).toString();
        } else {
          return convertUnits(numericInput, inputUnit, outputUnit, selectedCategory).toString();
        }
      }
    }
  }, [inputValue, inputUnit, outputUnit, selectedCategory, currencyRates]);

  useEffect(() => {
    if (units.length > 0) {
      setInputUnit(units[0]);
      setOutputUnit(units[1] || units[0]);
    }
  }, [units]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Valor a converter"
        />
        <select value={inputUnit} onChange={(e) => setInputUnit(e.target.value)}>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={swapUnits}>Swap</button>
      </div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <input
          type="text"
          value={outputValue ?? ""}
          placeholder="Valor convertido"
          disabled
        />
        <select value={outputUnit} onChange={(e) => setOutputUnit(e.target.value)}>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
