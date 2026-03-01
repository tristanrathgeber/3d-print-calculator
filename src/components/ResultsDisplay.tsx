import { Download, Copy } from 'lucide-react';
import type { CostBreakdown, Material, Currency } from '../types';
import { formatCurrency, formatWeight, formatTime } from '../utils/formatters';
import { getQuantityDiscount } from '../utils/costCalculator';
import { exportToPDF } from '../utils/pdfExport';

interface ResultsDisplayProps {
  breakdown: CostBreakdown;
  material: Material;
  infill: number;
  layerHeight: number;
  printSpeed: number;
  markup: number;
  quantity: number;
  currency: Currency;
}

export const ResultsDisplay = ({
  breakdown, material, infill, layerHeight, printSpeed, markup, quantity, currency,
}: ResultsDisplayProps) => {
  const discount = getQuantityDiscount(quantity);
  const totalAll = breakdown.total * quantity;

  const handleShare = async () => {
    const text = `3D Print Quote\nMaterial: ${material.name}\nPer piece: ${formatCurrency(breakdown.total, currency)}\nQuantity: ${quantity}\nTotal: ${formatCurrency(totalAll, currency)}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  };

  const handleExportPDF = () => {
    exportToPDF(breakdown, material, infill, layerHeight, printSpeed, markup);
  };

  return (
    <div className="space-y-4 animate-in">
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card" style={{ padding: '1rem' }}>
          <div className="stat-block">
            <span className="stat-value">{formatTime(breakdown.printTime)}</span>
            <span className="stat-label">Print Time</span>
          </div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <div className="stat-block">
            <span className="stat-value">{formatWeight(breakdown.materialWeight)}</span>
            <span className="stat-label">Material</span>
          </div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <div className="stat-block">
            <span className="stat-value" style={{ color: 'var(--color-success)' }}>{discount}%</span>
            <span className="stat-label">Discount</span>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="card">
        <p className="section-label">Cost Breakdown</p>

        <div className="cost-row">
          <span className="cost-label">Material ({material.name})</span>
          <span className="cost-value">{formatCurrency(breakdown.materialCost, currency)}</span>
        </div>
        <div className="cost-row">
          <span className="cost-label">Electricity</span>
          <span className="cost-value">{formatCurrency(breakdown.electricityCost, currency)}</span>
        </div>
        <div className="cost-row">
          <span className="cost-label">Machine Depreciation</span>
          <span className="cost-value">{formatCurrency(breakdown.machineDepreciation, currency)}</span>
        </div>
        <div className="cost-row">
          <span className="cost-label">Failure Surcharge ({((breakdown.failureSurcharge / (breakdown.subtotal - breakdown.failureSurcharge)) * 100).toFixed(0)}%)</span>
          <span className="cost-value">{formatCurrency(breakdown.failureSurcharge, currency)}</span>
        </div>
        <div className="cost-row">
          <span className="cost-label">Subtotal</span>
          <span className="cost-value">{formatCurrency(breakdown.subtotal, currency)}</span>
        </div>
        {discount > 0 && (
          <div className="cost-row">
            <span className="cost-label" style={{ color: 'var(--color-success)' }}>Quantity Discount (−{discount}%)</span>
            <span className="cost-value" style={{ color: 'var(--color-success)' }}>−{formatCurrency(breakdown.subtotal * discount / 100, currency)}</span>
          </div>
        )}
        <div className="cost-row">
          <span className="cost-label">Markup ({markup}%)</span>
          <span className="cost-value">{formatCurrency(breakdown.markup, currency)}</span>
        </div>

        <div className="cost-total">
          <span className="cost-label">Per Piece</span>
          <span className="cost-value">{formatCurrency(breakdown.total, currency)}</span>
        </div>

        {quantity > 1 && (
          <div className="flex justify-between items-center pt-2">
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              {quantity}× Total
            </span>
            <span className="font-mono font-bold text-xl" style={{ color: 'var(--color-warning)' }}>
              {formatCurrency(totalAll, currency)}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button onClick={handleExportPDF} className="btn-accent flex-1 flex items-center justify-center gap-2">
          <Download className="w-4 h-4" /> PDF
        </button>
        <button onClick={handleShare} className="btn-ghost flex-1 flex items-center justify-center gap-2">
          <Copy className="w-4 h-4" /> Copy Quote
        </button>
      </div>
    </div>
  );
};
