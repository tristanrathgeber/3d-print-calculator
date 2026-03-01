import type { CalculatorInputs, CostBreakdown, QuantityTier } from '../types';
import { QUANTITY_TIERS } from '../types';

export const calculateCost = (inputs: CalculatorInputs): CostBreakdown => {
  const { volume, material, infill, layerHeight, printSpeed, markup, printer, quantity } = inputs;

  // Material volume accounting for infill + shell walls (~10% extra for walls)
  const shellFraction = 0.10;
  const materialVolume = volume * ((infill / 100) + shellFraction);

  // Material weight in grams
  const materialWeight = materialVolume * material.density;

  // Material cost
  const materialCost = (materialWeight / 1000) * material.pricePerKg;

  // Print time estimation (improved formula)
  const printHeight = Math.cbrt(volume) * 10; // rough height in mm
  const layerCount = printHeight / layerHeight;
  const perimeterTimeMin = layerCount * 1.5; // time for outer walls
  const infillTimeMin = (materialVolume / printSpeed) * 60; // infill extrusion
  const travelTimeMin = layerCount * 0.3; // non-print moves
  const bedPrepTimeMin = printer.bedPrepTime;
  const totalPrintTimeMin = bedPrepTimeMin + perimeterTimeMin + infillTimeMin + travelTimeMin;
  const printTimeHours = totalPrintTimeMin / 60;

  // Electricity cost
  const electricityCost = (printTimeHours * (printer.powerConsumption / 1000)) * printer.electricityCostPerKwh;

  // Machine depreciation per hour
  const depreciationPerHour = printer.purchasePrice / printer.lifespanHours;
  const machineDepreciation = printTimeHours * depreciationPerHour;

  // Failure rate surcharge
  const baseCost = materialCost + electricityCost + machineDepreciation;
  const failureSurcharge = baseCost * (printer.failureRate / 100);

  // Subtotal per piece
  const subtotal = baseCost + failureSurcharge;

  // Apply quantity discount
  const discount = getQuantityDiscount(quantity);
  const discountedSubtotal = subtotal * (1 - discount / 100);

  // Markup
  const markupAmount = discountedSubtotal * (markup / 100);

  // Total per piece
  const total = discountedSubtotal + markupAmount;

  return {
    materialCost,
    electricityCost,
    machineDepreciation,
    failureSurcharge,
    subtotal,
    markup: markupAmount,
    total,
    printTime: printTimeHours,
    materialWeight,
    materialVolume,
  };
};

export const getQuantityDiscount = (quantity: number): number => {
  let discount = 0;
  for (const tier of QUANTITY_TIERS) {
    if (quantity >= tier.minQty) {
      discount = tier.discount;
    }
  }
  return discount;
};

export const calculateBatchPricing = (
  inputs: CalculatorInputs
): { quantity: number; pricePerPiece: number; totalPrice: number; discount: number }[] => {
  return QUANTITY_TIERS.map((tier: QuantityTier) => {
    const batchInputs = { ...inputs, quantity: tier.minQty };
    const breakdown = calculateCost(batchInputs);
    return {
      quantity: tier.minQty,
      pricePerPiece: breakdown.total,
      totalPrice: breakdown.total * tier.minQty,
      discount: tier.discount,
    };
  });
};
