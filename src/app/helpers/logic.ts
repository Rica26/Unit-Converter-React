export const categoryConfig = {
  Distancia: ['km', 'm', 'cm', 'mm', 'mi', 'yd', 'ft', 'in'],
  Temperatura: ['C', 'F', 'K'],
  Peso: ['kg', 'g', 'mg', 'lb', 'oz'],
  Moeda: [],
}

export function convertUnits(
  input: number,
  inputUnit: string,
  outputUnit: string,
  category: string,
  currencyRates?: { [key: string]: number },
): number {
  if (category === 'Distancia') {
    const conversionFactors: { [key: string]: number } = {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.34,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254,
    }
    return input * (conversionFactors[inputUnit] / conversionFactors[outputUnit])
  } else if (category === 'Temperatura') {
    if (inputUnit === 'C') {
      if (outputUnit === 'F') {
        return (input * 9) / 5 + 32
      } else if (outputUnit === 'K') {
        return input + 273.15
      }
    } else if (inputUnit === 'F') {
      if (outputUnit === 'C') {
        return ((input - 32) * 5) / 9
      } else if (outputUnit === 'K') {
        return ((input - 32) * 5) / 9 + 273.15
      }
    } else if (inputUnit === 'K') {
      if (outputUnit === 'C') {
        return input - 273.15
      } else if (outputUnit === 'F') {
        return ((input - 273.15) * 9) / 5 + 32
      }
    }
  } else if (category === 'Peso') {
    const conversionFactors: { [key: string]: number } = {
      kg: 1000,
      g: 1,
      mg: 0.001,
      lb: 453.592,
      oz: 28.3495,
    }
    return input * (conversionFactors[inputUnit] / conversionFactors[outputUnit])
  } else if (category === 'Moeda' && currencyRates) {
    const inputRate = currencyRates[inputUnit]
    const outputRate = currencyRates[outputUnit]
    if (inputRate && outputRate) {
      return (input * outputRate) / inputRate
    } else {
      console.error(`Currency rates for ${inputUnit} or ${outputUnit} not found.`)
    }
  }
  return input
}
