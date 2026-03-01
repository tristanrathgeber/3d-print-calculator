// ── Currency ──────────────────────────────────────────────
export type Currency = 'EUR' | 'USD';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: '€',
  USD: '$',
};

// ── Materials ────────────────────────────────────────────
export type MaterialCategory = 'standard' | 'engineering' | 'composite' | 'flexible' | 'specialty';

export interface Material {
  id: string;
  name: string;
  brand: string;
  category: MaterialCategory;
  pricePerKg: number; // in EUR
  density: number; // g/cm³
  color: string; // for UI accent
  url?: string; // affiliate / product link
}

export const MATERIAL_CATEGORY_LABELS: Record<MaterialCategory, string> = {
  standard: 'Standard',
  engineering: 'Engineering',
  composite: 'Composite / Filled',
  flexible: 'Flexible (TPU)',
  specialty: 'Specialty',
};

export const MATERIALS: Material[] = [
  // ─── Bambu Lab — Standard ─────────────────────────────
  { id: 'bambu-pla-basic',   name: 'PLA Basic',           brand: 'Bambu Lab', category: 'standard',    pricePerKg: 16,    density: 1.24, color: '#22d3ee', url: 'https://eu.store.bambulab.com/products/pla-basic-filament' },
  { id: 'bambu-pla-matte',   name: 'PLA Matte',           brand: 'Bambu Lab', category: 'standard',    pricePerKg: 18,    density: 1.24, color: '#06b6d4', url: 'https://eu.store.bambulab.com/products/pla-matte' },
  { id: 'bambu-pla-silk',    name: 'PLA Silk+',           brand: 'Bambu Lab', category: 'specialty',   pricePerKg: 22,    density: 1.24, color: '#fbbf24', url: 'https://eu.store.bambulab.com/products/pla-silk' },
  { id: 'bambu-pla-tough',   name: 'PLA Tough+',          brand: 'Bambu Lab', category: 'engineering', pricePerKg: 24,    density: 1.24, color: '#14b8a6', url: 'https://eu.store.bambulab.com/products/pla-tough' },
  { id: 'bambu-petg-hf',     name: 'PETG HF',             brand: 'Bambu Lab', category: 'standard',    pricePerKg: 16,    density: 1.27, color: '#10b981', url: 'https://eu.store.bambulab.com/products/petg-hf' },
  { id: 'bambu-petg-trans',  name: 'PETG Translucent',    brand: 'Bambu Lab', category: 'specialty',   pricePerKg: 18,    density: 1.27, color: '#34d399', url: 'https://eu.store.bambulab.com/products/petg-translucent' },
  { id: 'bambu-abs',         name: 'ABS',                 brand: 'Bambu Lab', category: 'standard',    pricePerKg: 16,    density: 1.04, color: '#f59e0b', url: 'https://eu.store.bambulab.com/products/abs' },
  { id: 'bambu-asa',         name: 'ASA',                 brand: 'Bambu Lab', category: 'engineering', pricePerKg: 25,    density: 1.07, color: '#f97316', url: 'https://eu.store.bambulab.com/products/asa' },
  { id: 'bambu-pc',          name: 'PC',                  brand: 'Bambu Lab', category: 'engineering', pricePerKg: 43,    density: 1.20, color: '#6366f1', url: 'https://eu.store.bambulab.com/products/pc' },
  // ─── Bambu Lab — Flexible ─────────────────────────────
  { id: 'bambu-tpu-95a',     name: 'TPU 95A HF',          brand: 'Bambu Lab', category: 'flexible',    pricePerKg: 35,    density: 1.22, color: '#8b5cf6', url: 'https://eu.store.bambulab.com/products/tpu-95a-hf' },
  { id: 'bambu-tpu-ams',     name: 'TPU for AMS',         brand: 'Bambu Lab', category: 'flexible',    pricePerKg: 36,    density: 1.21, color: '#a78bfa', url: 'https://eu.store.bambulab.com/products/tpu-for-ams' },
  // ─── Bambu Lab — Composite ────────────────────────────
  { id: 'bambu-pla-cf',      name: 'PLA-CF',              brand: 'Bambu Lab', category: 'composite',   pricePerKg: 27,    density: 1.29, color: '#475569', url: 'https://eu.store.bambulab.com/products/pla-cf' },
  { id: 'bambu-petg-cf',     name: 'PETG-CF',             brand: 'Bambu Lab', category: 'composite',   pricePerKg: 33,    density: 1.35, color: '#64748b', url: 'https://eu.store.bambulab.com/products/petg-cf' },
  { id: 'bambu-abs-gf',      name: 'ABS-GF',              brand: 'Bambu Lab', category: 'composite',   pricePerKg: 32,    density: 1.11, color: '#78716c', url: 'https://eu.store.bambulab.com/products/abs-gf' },
  { id: 'bambu-pa6-cf',      name: 'PA6-CF',              brand: 'Bambu Lab', category: 'composite',   pricePerKg: 45,    density: 1.15, color: '#57534e', url: 'https://eu.store.bambulab.com/products/pa6-cf' },
  { id: 'bambu-pa6-gf',      name: 'PA6-GF',              brand: 'Bambu Lab', category: 'composite',   pricePerKg: 63,    density: 1.22, color: '#a8a29e', url: 'https://eu.store.bambulab.com/products/pa6-gf' },
  { id: 'bambu-paht-cf',     name: 'PAHT-CF',             brand: 'Bambu Lab', category: 'composite',   pricePerKg: 54,    density: 1.22, color: '#44403c', url: 'https://eu.store.bambulab.com/products/paht-cf' },
  { id: 'bambu-pet-cf',      name: 'PET-CF',              brand: 'Bambu Lab', category: 'composite',   pricePerKg: 49,    density: 1.40, color: '#71717a', url: 'https://eu.store.bambulab.com/products/pet-cf' },
  { id: 'bambu-ppa-cf',      name: 'PPA-CF',              brand: 'Bambu Lab', category: 'composite',   pricePerKg: 156,   density: 1.21, color: '#52525b', url: 'https://eu.store.bambulab.com/products/ppa-cf' },
  { id: 'bambu-pps-cf',      name: 'PPS-CF',              brand: 'Bambu Lab', category: 'composite',   pricePerKg: 134,   density: 1.45, color: '#3f3f46', url: 'https://eu.store.bambulab.com/products/pps-cf' },
  // ─── Bambu Lab — Specialty ────────────────────────────
  { id: 'bambu-pla-wood',    name: 'PLA Wood',            brand: 'Bambu Lab', category: 'specialty',   pricePerKg: 28,    density: 1.17, color: '#a16207', url: 'https://eu.store.bambulab.com/products/pla-wood' },
  { id: 'bambu-pla-sparkle', name: 'PLA Sparkle',         brand: 'Bambu Lab', category: 'specialty',   pricePerKg: 28,    density: 1.24, color: '#d4d4d8', url: 'https://eu.store.bambulab.com/products/pla-sparkle' },
  { id: 'bambu-pla-marble',  name: 'PLA Marble',          brand: 'Bambu Lab', category: 'specialty',   pricePerKg: 28,    density: 1.24, color: '#e7e5e4', url: 'https://eu.store.bambulab.com/products/pla-marble' },
  { id: 'bambu-pla-aero',    name: 'PLA Aero',            brand: 'Bambu Lab', category: 'specialty',   pricePerKg: 48,    density: 0.49, color: '#38bdf8', url: 'https://eu.store.bambulab.com/products/pla-aero' },

  // ─── Generic / Third Party ────────────────────────────
  { id: 'gen-pla',           name: 'PLA',                 brand: 'Generic',   category: 'standard',    pricePerKg: 20,    density: 1.24, color: '#22d3ee' },
  { id: 'gen-abs',           name: 'ABS',                 brand: 'Generic',   category: 'standard',    pricePerKg: 22,    density: 1.04, color: '#f59e0b' },
  { id: 'gen-petg',          name: 'PETG',                brand: 'Generic',   category: 'standard',    pricePerKg: 23,    density: 1.27, color: '#10b981' },
  { id: 'gen-tpu',           name: 'TPU 95A',             brand: 'Generic',   category: 'flexible',    pricePerKg: 30,    density: 1.21, color: '#8b5cf6' },
  { id: 'gen-nylon',         name: 'Nylon / PA',          brand: 'Generic',   category: 'engineering', pricePerKg: 40,    density: 1.14, color: '#ec4899' },
  { id: 'gen-asa',           name: 'ASA',                 brand: 'Generic',   category: 'engineering', pricePerKg: 25,    density: 1.07, color: '#f97316' },
  { id: 'gen-pc',            name: 'Polycarbonate',       brand: 'Generic',   category: 'engineering', pricePerKg: 45,    density: 1.20, color: '#6366f1' },
  { id: 'gen-pla-cf',        name: 'PLA-CF',              brand: 'Generic',   category: 'composite',   pricePerKg: 30,    density: 1.29, color: '#475569' },
  { id: 'gen-petg-cf',       name: 'PETG-CF',             brand: 'Generic',   category: 'composite',   pricePerKg: 35,    density: 1.35, color: '#64748b' },
  { id: 'gen-pa-cf',         name: 'PA-CF',               brand: 'Generic',   category: 'composite',   pricePerKg: 50,    density: 1.15, color: '#57534e' },

  // ─── Resin ────────────────────────────────────────────
  { id: 'resin-std',         name: 'Resin (Standard)',    brand: 'Generic',   category: 'standard',    pricePerKg: 35,    density: 1.12, color: '#a855f7' },
  { id: 'resin-abs-like',    name: 'Resin (ABS-like)',    brand: 'Generic',   category: 'engineering', pricePerKg: 45,    density: 1.12, color: '#c084fc' },
  { id: 'resin-flex',        name: 'Resin (Flexible)',    brand: 'Generic',   category: 'flexible',    pricePerKg: 50,    density: 1.10, color: '#d8b4fe' },
];

// ── Printer Profile ──────────────────────────────────────
export interface PrinterProfile {
  id: string;
  name: string;
  brand: string;
  purchasePrice: number;
  lifespanHours: number;
  powerConsumption: number; // Watts (average during print)
  electricityCostPerKwh: number;
  bedPrepTime: number; // minutes
  failureRate: number; // percentage 0-100
  url?: string; // affiliate / product link
}

export const DEFAULT_PRINTER: PrinterProfile = {
  id: 'default',
  name: 'Standard FDM',
  brand: 'Generic',
  purchasePrice: 300,
  lifespanHours: 3000,
  powerConsumption: 150,
  electricityCostPerKwh: 0.30,
  bedPrepTime: 10,
  failureRate: 5,
};

export const PRINTER_PRESETS: PrinterProfile[] = [
  // ─── Generic ──────────────────────────────────────────
  { ...DEFAULT_PRINTER },

  // ─── Bambu Lab ────────────────────────────────────────
  { id: 'bambu-a1-mini',  name: 'A1 mini',         brand: 'Bambu Lab',  purchasePrice: 300,  lifespanHours: 3500, powerConsumption: 70,   electricityCostPerKwh: 0.30, bedPrepTime: 2, failureRate: 3, url: 'https://eu.store.bambulab.com/products/a1-mini' },
  { id: 'bambu-a1',       name: 'A1',              brand: 'Bambu Lab',  purchasePrice: 450,  lifespanHours: 4000, powerConsumption: 150,  electricityCostPerKwh: 0.30, bedPrepTime: 2, failureRate: 2, url: 'https://eu.store.bambulab.com/products/a1' },
  { id: 'bambu-p1s',      name: 'P1S',             brand: 'Bambu Lab',  purchasePrice: 700,  lifespanHours: 4500, powerConsumption: 100,  electricityCostPerKwh: 0.30, bedPrepTime: 3, failureRate: 2, url: 'https://eu.store.bambulab.com/products/p1s' },
  { id: 'bambu-x1c',      name: 'X1 Carbon',       brand: 'Bambu Lab',  purchasePrice: 1200, lifespanHours: 5000, powerConsumption: 135,  electricityCostPerKwh: 0.30, bedPrepTime: 2, failureRate: 1, url: 'https://eu.store.bambulab.com/products/x1-carbon' },

  // ─── Prusa ────────────────────────────────────────────
  { id: 'prusa-mini',     name: 'MINI+',           brand: 'Prusa',      purchasePrice: 430,  lifespanHours: 4000, powerConsumption: 80,   electricityCostPerKwh: 0.30, bedPrepTime: 5, failureRate: 3, url: 'https://www.prusa3d.com/product/original-prusa-mini/' },
  { id: 'prusa-mk3s',     name: 'MK3S+',           brand: 'Prusa',      purchasePrice: 800,  lifespanHours: 6000, powerConsumption: 120,  electricityCostPerKwh: 0.30, bedPrepTime: 5, failureRate: 2, url: 'https://www.prusa3d.com/product/original-prusa-i3-mk3s-3d-printer/' },
  { id: 'prusa-mk4s',     name: 'MK4S',            brand: 'Prusa',      purchasePrice: 1100, lifespanHours: 6000, powerConsumption: 100,  electricityCostPerKwh: 0.30, bedPrepTime: 4, failureRate: 2, url: 'https://www.prusa3d.com/product/original-prusa-mk4s-3d-printer/' },
  { id: 'prusa-xl',       name: 'XL (Single)',      brand: 'Prusa',      purchasePrice: 2000, lifespanHours: 6000, powerConsumption: 200,  electricityCostPerKwh: 0.30, bedPrepTime: 5, failureRate: 2, url: 'https://www.prusa3d.com/product/original-prusa-xl/' },

  // ─── Creality ─────────────────────────────────────────
  { id: 'cr-ender3-v3se', name: 'Ender 3 V3 SE',   brand: 'Creality',   purchasePrice: 200,  lifespanHours: 2500, powerConsumption: 130,  electricityCostPerKwh: 0.30, bedPrepTime: 10, failureRate: 8, url: 'https://store.creality.com/products/ender-3-v3-se' },
  { id: 'cr-ender3-v3ke', name: 'Ender 3 V3 KE',   brand: 'Creality',   purchasePrice: 260,  lifespanHours: 2500, powerConsumption: 130,  electricityCostPerKwh: 0.30, bedPrepTime: 8,  failureRate: 7, url: 'https://store.creality.com/products/ender-3-v3-ke' },
  { id: 'cr-ender3-v2',   name: 'Ender 3 V2',      brand: 'Creality',   purchasePrice: 250,  lifespanHours: 3000, powerConsumption: 270,  electricityCostPerKwh: 0.30, bedPrepTime: 10, failureRate: 8 },
  { id: 'cr-k1',          name: 'K1',               brand: 'Creality',   purchasePrice: 400,  lifespanHours: 3000, powerConsumption: 350,  electricityCostPerKwh: 0.30, bedPrepTime: 3,  failureRate: 5, url: 'https://store.creality.com/products/k1-3d-printer' },
  { id: 'cr-k1c',         name: 'K1C',              brand: 'Creality',   purchasePrice: 500,  lifespanHours: 3500, powerConsumption: 350,  electricityCostPerKwh: 0.30, bedPrepTime: 3,  failureRate: 4, url: 'https://store.creality.com/products/k1c-3d-printer' },
  { id: 'cr-k1max',       name: 'K1 Max',           brand: 'Creality',   purchasePrice: 700,  lifespanHours: 3500, powerConsumption: 500,  electricityCostPerKwh: 0.30, bedPrepTime: 4,  failureRate: 4, url: 'https://store.creality.com/products/creality-k1-max-3d-printer' },

  // ─── Anycubic ─────────────────────────────────────────
  { id: 'ac-kobra2',      name: 'Kobra 2',          brand: 'Anycubic',   purchasePrice: 250,  lifespanHours: 2500, powerConsumption: 120,  electricityCostPerKwh: 0.30, bedPrepTime: 8, failureRate: 7, url: 'https://store.anycubic.com/products/kobra-2' },
  { id: 'ac-kobra2max',   name: 'Kobra 2 Max',      brand: 'Anycubic',   purchasePrice: 450,  lifespanHours: 3000, powerConsumption: 200,  electricityCostPerKwh: 0.30, bedPrepTime: 8, failureRate: 6 },

  // ─── Elegoo ───────────────────────────────────────────
  { id: 'el-neptune4pro',  name: 'Neptune 4 Pro',   brand: 'Elegoo',     purchasePrice: 300,  lifespanHours: 2500, powerConsumption: 120,  electricityCostPerKwh: 0.30, bedPrepTime: 5, failureRate: 5, url: 'https://www.elegoo.com/products/neptune-4-pro-fdm-3d-printer' },
  { id: 'el-neptune4plus', name: 'Neptune 4 Plus',  brand: 'Elegoo',     purchasePrice: 400,  lifespanHours: 3000, powerConsumption: 200,  electricityCostPerKwh: 0.30, bedPrepTime: 5, failureRate: 5 },

  // ─── Artillery ────────────────────────────────────────
  { id: 'art-sw-x3pro',   name: 'Sidewinder X3 Pro', brand: 'Artillery', purchasePrice: 350,  lifespanHours: 3000, powerConsumption: 150,  electricityCostPerKwh: 0.30, bedPrepTime: 6, failureRate: 5 },

  // ─── Voron (DIY) ──────────────────────────────────────
  { id: 'voron-2.4',      name: 'Voron 2.4 (DIY)',  brand: 'Voron',      purchasePrice: 700,  lifespanHours: 5000, powerConsumption: 400,  electricityCostPerKwh: 0.30, bedPrepTime: 3, failureRate: 3 },
  { id: 'voron-trident',  name: 'Trident (DIY)',    brand: 'Voron',      purchasePrice: 600,  lifespanHours: 5000, powerConsumption: 350,  electricityCostPerKwh: 0.30, bedPrepTime: 3, failureRate: 3 },
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
