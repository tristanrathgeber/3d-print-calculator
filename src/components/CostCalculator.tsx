import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Zap, Clock, Wrench, AlertTriangle, DollarSign, Cpu, ExternalLink } from 'lucide-react';
import type { Material, CostBreakdown, PrinterProfile, AppSettings } from '../types';
import { MATERIALS, PRINTER_PRESETS, MATERIAL_CATEGORY_LABELS } from '../types';
import type { MaterialCategory } from '../types';
import { calculateCost } from '../utils/costCalculator';

interface CostCalculatorProps {
  volume: number;
  settings: AppSettings;
  onCalculate: (breakdown: CostBreakdown, material: Material, infill: number, layerHeight: number, printSpeed: number, markup: number, quantity: number, printer: PrinterProfile) => void;
}

export const CostCalculator = ({ volume, settings, onCalculate }: CostCalculatorProps) => {
  const [material, setMaterial] = useState<Material>(MATERIALS[0]);
  const [infill, setInfill] = useState(settings.defaultInfill);
  const [layerHeight, setLayerHeight] = useState(settings.defaultLayerHeight);
  const [printSpeed, setPrintSpeed] = useState(settings.defaultPrintSpeed);
  const [markup, setMarkup] = useState(settings.defaultMarkup);
  const [printer, setPrinter] = useState<PrinterProfile>(settings.printer);
  const [quantity, setQuantity] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Group printers by brand
  const printersByBrand = useMemo(() => {
    const groups: Record<string, PrinterProfile[]> = {};
    for (const p of PRINTER_PRESETS) {
      if (!groups[p.brand]) groups[p.brand] = [];
      groups[p.brand].push(p);
    }
    return groups;
  }, []);

  // Group materials by brand, then show category as suffix
  const materialsByBrand = useMemo(() => {
    const groups: Record<string, Material[]> = {};
    for (const m of MATERIALS) {
      if (!groups[m.brand]) groups[m.brand] = [];
      groups[m.brand].push(m);
    }
    return groups;
  }, []);

  // When a preset is selected, update all printer fields
  const handlePresetChange = (presetId: string) => {
    if (presetId === 'custom') {
      setPrinter((prev) => ({ ...prev, id: 'custom', name: 'Custom' }));
    } else {
      const preset = PRINTER_PRESETS.find((p) => p.id === presetId);
      if (preset) setPrinter({ ...preset });
    }
  };

  // Helper to update a single printer field
  const updatePrinter = (field: keyof PrinterProfile, value: number | string) => {
    setPrinter((prev) => ({
      ...prev,
      [field]: value,
      ...(field !== 'id' && field !== 'name' && field !== 'brand' && field !== 'url' && prev.id !== 'custom'
        ? { id: 'custom', name: `${prev.name} (Custom)` }
        : {}),
    }));
  };

  useEffect(() => {
    if (volume > 0) {
      const breakdown = calculateCost({
        volume, material, infill, layerHeight, printSpeed, markup, printer, quantity,
      });
      onCalculate(breakdown, material, infill, layerHeight, printSpeed, markup, quantity, printer);
    }
  }, [volume, material, infill, layerHeight, printSpeed, markup, printer, quantity, onCalculate]);

  return (
    <div className="space-y-5">
      {/* Printer Preset */}
      <div>
        <label className="data-label block mb-1.5">Printer</label>
        <div className="flex gap-2">
          <select
            value={PRINTER_PRESETS.some((p) => p.id === printer.id) ? printer.id : 'custom'}
            onChange={(e) => handlePresetChange(e.target.value)}
            className="select flex-1"
          >
            {Object.entries(printersByBrand).map(([brand, printers]) => (
              <optgroup key={brand} label={brand}>
                {printers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </optgroup>
            ))}
            {!PRINTER_PRESETS.some((p) => p.id === printer.id) && (
              <optgroup label="Custom">
                <option value="custom">{printer.name}</option>
              </optgroup>
            )}
          </select>
          {printer.url && (
            <a href={printer.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg transition-all duration-200 shrink-0"
              style={{
                width: '42px', border: '1px solid var(--color-border)',
                background: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)',
              }}
              title="View product"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Advanced Printer Settings Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
        style={{
          color: 'var(--color-text-muted)',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
        }}
      >
        <span className="flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5" />
          Printer &amp; Cost Parameters
        </span>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200"
          style={{ transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Advanced Settings Panel */}
      {showAdvanced && (
        <div
          className="rounded-lg p-4 space-y-4 animate-in"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
          }}
        >
          {/* Row 1: Electricity Cost + Power Consumption */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="data-label flex items-center gap-1 mb-1">
                <Zap className="w-3 h-3" style={{ color: 'var(--color-warning)' }} />
                Electricity Price
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={printer.electricityCostPerKwh}
                  onChange={(e) => updatePrinter('electricityCostPerKwh', Math.max(0, Number(e.target.value)))}
                  className="input"
                  min="0" max="2" step="0.01"
                />
                <span className="text-xs whitespace-nowrap font-mono" style={{ color: 'var(--color-text-muted)' }}>€/kWh</span>
              </div>
            </div>
            <div>
              <label className="data-label flex items-center gap-1 mb-1">
                <Cpu className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                Power Draw
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={printer.powerConsumption}
                  onChange={(e) => updatePrinter('powerConsumption', Math.max(0, Number(e.target.value)))}
                  className="input"
                  min="0" max="2000" step="10"
                />
                <span className="text-xs whitespace-nowrap font-mono" style={{ color: 'var(--color-text-muted)' }}>W</span>
              </div>
            </div>
          </div>

          {/* Row 2: Purchase Price + Lifespan */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="data-label flex items-center gap-1 mb-1">
                <DollarSign className="w-3 h-3" style={{ color: 'var(--color-success)' }} />
                Purchase Price
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={printer.purchasePrice}
                  onChange={(e) => updatePrinter('purchasePrice', Math.max(0, Number(e.target.value)))}
                  className="input"
                  min="0" max="50000" step="50"
                />
                <span className="text-xs whitespace-nowrap font-mono" style={{ color: 'var(--color-text-muted)' }}>€</span>
              </div>
            </div>
            <div>
              <label className="data-label flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3" style={{ color: 'var(--color-accent)' }} />
                Lifespan
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={printer.lifespanHours}
                  onChange={(e) => updatePrinter('lifespanHours', Math.max(100, Number(e.target.value)))}
                  className="input"
                  min="100" max="50000" step="100"
                />
                <span className="text-xs whitespace-nowrap font-mono" style={{ color: 'var(--color-text-muted)' }}>hrs</span>
              </div>
            </div>
          </div>

          {/* Row 3: Bed Prep + Failure Rate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="data-label flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3" style={{ color: 'var(--color-text-muted)' }} />
                Bed Prep Time
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={printer.bedPrepTime}
                  onChange={(e) => updatePrinter('bedPrepTime', Math.max(0, Number(e.target.value)))}
                  className="input"
                  min="0" max="60" step="1"
                />
                <span className="text-xs whitespace-nowrap font-mono" style={{ color: 'var(--color-text-muted)' }}>min</span>
              </div>
            </div>
            <div>
              <label className="data-label flex items-center gap-1 mb-1">
                <AlertTriangle className="w-3 h-3" style={{ color: 'var(--color-danger)' }} />
                Failure Rate
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={printer.failureRate}
                  onChange={(e) => updatePrinter('failureRate', Math.max(0, Math.min(100, Number(e.target.value))))}
                  className="input"
                  min="0" max="100" step="0.5"
                />
                <span className="text-xs whitespace-nowrap font-mono" style={{ color: 'var(--color-text-muted)' }}>%</span>
              </div>
            </div>
          </div>

          {/* Depreciation info */}
          <div className="pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex justify-between text-xs">
              <span style={{ color: 'var(--color-text-muted)' }}>Depreciation / hour</span>
              <span className="font-mono font-semibold" style={{ color: 'var(--color-accent)' }}>
                {(printer.purchasePrice / printer.lifespanHours).toFixed(3)} €/h
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Material */}
      <div>
        <label className="data-label block mb-1.5">Material</label>
        <div className="flex gap-2">
          <select
            value={material.id}
            onChange={(e) => setMaterial(MATERIALS.find(m => m.id === e.target.value) || MATERIALS[0])}
            className="select flex-1"
          >
            {Object.entries(materialsByBrand).map(([brand, mats]) => (
              <optgroup key={brand} label={brand}>
                {mats.map((mat) => (
                  <option key={mat.id} value={mat.id}>
                    {mat.name} — {mat.pricePerKg} €/kg · {MATERIAL_CATEGORY_LABELS[mat.category as MaterialCategory]}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          {material.url && (
            <a href={material.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg transition-all duration-200 shrink-0"
              style={{
                width: '42px', border: '1px solid var(--color-border)',
                background: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)',
              }}
              title="View product"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        {/* Material tag */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="badge text-[10px]" style={{ background: `${material.color}22`, color: material.color, border: `1px solid ${material.color}44` }}>
            {material.brand}
          </span>
          <span className="badge text-[10px]" style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
            {MATERIAL_CATEGORY_LABELS[material.category]}
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
            {material.density} g/cm³
          </span>
        </div>
      </div>

      {/* Infill */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="data-label">Infill</label>
          <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>{infill}%</span>
        </div>
        <input
          type="range" min="5" max="100" value={infill}
          onChange={(e) => setInfill(Number(e.target.value))}
          className="range-slider"
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          <span>5%</span><span>100%</span>
        </div>
      </div>

      {/* Layer Height */}
      <div>
        <label className="data-label block mb-1.5">Layer Height</label>
        <div className="grid grid-cols-4 gap-2">
          {[0.1, 0.16, 0.2, 0.28].map((h) => (
            <button key={h} onClick={() => setLayerHeight(h)}
              className={layerHeight === h ? 'btn-ghost active text-sm' : 'btn-ghost text-sm'}
              style={{ padding: '0.5rem' }}>
              {h}mm
            </button>
          ))}
        </div>
      </div>

      {/* Print Speed */}
      <div>
        <label className="data-label block mb-1.5">Print Speed</label>
        <div className="flex items-center gap-2">
          <input type="number" value={printSpeed}
            onChange={(e) => setPrintSpeed(Number(e.target.value))}
            className="input" min="10" max="300" />
          <span className="text-sm whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>mm/s</span>
        </div>
      </div>

      {/* Markup */}
      <div>
        <div className="flex justify-between mb-1.5">
          <label className="data-label">Markup / Profit</label>
          <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-success, #10b981)' }}>{markup}%</span>
        </div>
        <input
          type="range" min="0" max="300" value={markup}
          onChange={(e) => setMarkup(Number(e.target.value))}
          className="range-slider"
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          <span>0%</span><span>300%</span>
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="data-label block mb-1.5">Quantity</label>
        <div className="flex items-center gap-2">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="btn-ghost" style={{ padding: '0.5rem 0.75rem' }}>−</button>
          <input type="number" value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="input text-center" style={{ width: '80px' }} min="1" />
          <button onClick={() => setQuantity(quantity + 1)} className="btn-ghost" style={{ padding: '0.5rem 0.75rem' }}>+</button>
          {quantity >= 5 && (
            <span className="badge" style={{ background: 'rgba(34,211,238,0.1)', color: 'var(--color-accent)' }}>
              Bulk
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
