// ── Currency ──────────────────────────────────────────────
export type Currency = 'EUR' | 'USD';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
};

// ── Materials ────────────────────────────────────────────
export interface Material {
  id: string;
  name: string;
  pricePerKg: number; // in EUR
  density: number; // g/cm³
  color: string; // for UI accent
}

export const MATERIALS: Material[] = [
  { id: 'pla', name: 'PLA', pricePerKg: 22, density: 1.24, color: '#22d3ee' },
  { id: 'abs', name: 'ABS', pricePerKg: 25, density: 1.04, color: '#f59e0b' },
  { id: 'petg', name: 'PETG', pricePerKg: 26, density: 1.27, color: '#10b981' },
  { id: 'tpu', name: 'TPU', pricePerKg: 35, density: 1.21, color: '#8b5cf6' },
  { id: 'nylon', name: 'Nylon', pricePerKg: 45, density: 1.14, color: '#ec4899' },
  { id: 'asa', name: 'ASA', pricePerKg: 28, density: 1.07, color: '#f97316' },
  { id: 'pc', name: 'Polycarbonate', pricePerKg: 50, density: 1.20, color: '#6366f1' },
  { id: 'resin-std', name: 'Resin (Standard)', pricePerKg: 40, density: 1.15, color: '#a855f7' },
];

// ── Printer Profile ──────────────────────────────────────
export interface PrinterProfile {
  id: string;
  name: string;
  purchasePrice: number;
  lifespanHours: number;
  powerConsumption: number; // Watts
  electricityCostPerKwh: number;
  bedPrepTime: number; // minutes
  failureRate: number; // percentage 0-100
}

export const DEFAULT_PRINTER: PrinterProfile = {
  id: 'default',
  name: 'Standard FDM',
  purchasePrice: 300,
  lifespanHours: 3000,
  powerConsumption: 250,
  electricityCostPerKwh: 0.30,
  bedPrepTime: 10,
  failureRate: 5,
};

export const PRINTER_PRESETS: PrinterProfile[] = [
  { ...DEFAULT_PRINTER },
  { id: 'ender3', name: 'Ender 3 V2', purchasePrice: 250, lifespanHours: 3000, powerConsumption: 270, electricityCostPerKwh: 0.30, bedPrepTime: 10, failureRate: 8 },
  { id: 'prusa', name: 'Prusa MK4', purchasePrice: 800, lifespanHours: 5000, powerConsumption: 200, electricityCostPerKwh: 0.30, bedPrepTime: 5, failureRate: 3 },
  { id: 'bambu-p1s', name: 'Bambu Lab P1S', purchasePrice: 700, lifespanHours: 4000, powerConsumption: 350, electricityCostPerKwh: 0.30, bedPrepTime: 3, failureRate: 2 },
  { id: 'bambu-x1c', name: 'Bambu Lab X1C', purchasePrice: 1200, lifespanHours: 5000, powerConsumption: 350, electricityCostPerKwh: 0.30, bedPrepTime: 2, failureRate: 1 },
];

// ── STL Data ─────────────────────────────────────────────
export interface STLData {
  geometry: Float32Array;
  volume: number;
  dimensions: { x: number; y: number; z: number };
  surfaceArea: number;
}

// ── Cost Breakdown ───────────────────────────────────────
export interface CostBreakdown {
  materialCost: number;
  electricityCost: number;
  machineDepreciation: number;
  failureSurcharge: number;
  subtotal: number;
  markup: number;
  total: number;
  printTime: number;
  materialWeight: number;
  materialVolume: number;
}

// ── Calculator Inputs ────────────────────────────────────
export interface CalculatorInputs {
  volume: number;
  material: Material;
  infill: number;
  layerHeight: number;
  printSpeed: number;
  markup: number;
  printer: PrinterProfile;
  quantity: number;
}

// ── Manual Input ─────────────────────────────────────────
export interface ManualInputShape {
  type: 'box' | 'cylinder' | 'sphere';
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
    radius?: number;
  };
}

// ── Quantity Tiers ───────────────────────────────────────
export interface QuantityTier {
  minQty: number;
  discount: number;
}

export const QUANTITY_TIERS: QuantityTier[] = [
  { minQty: 1, discount: 0 },
  { minQty: 5, discount: 5 },
  { minQty: 10, discount: 10 },
  { minQty: 25, discount: 15 },
  { minQty: 50, discount: 20 },
  { minQty: 100, discount: 25 },
];

// ── Calculation History ──────────────────────────────────
export interface CalculationRecord {
  id: string;
  timestamp: number;
  materialName: string;
  volume: number;
  quantity: number;
  totalPerPiece: number;
  totalAll: number;
  currency: Currency;
}

// ── App Settings ─────────────────────────────────────────
export interface AppSettings {
  currency: Currency;
  printer: PrinterProfile;
  defaultInfill: number;
  defaultLayerHeight: number;
  defaultPrintSpeed: number;
  defaultMarkup: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  currency: 'EUR',
  printer: DEFAULT_PRINTER,
  defaultInfill: 20,
  defaultLayerHeight: 0.2,
  defaultPrintSpeed: 50,
  defaultMarkup: 50,
};
