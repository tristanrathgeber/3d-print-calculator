import jsPDF from 'jspdf';
import type { CostBreakdown, Material } from '../types';

export const exportToPDF = (
  breakdown: CostBreakdown,
  material: Material,
  infill: number,
  layerHeight: number,
  printSpeed: number,
  markup: number
) => {
  const doc = new jsPDF();
  const accent = [34, 211, 238]; // cyan
  const dark = [15, 23, 42];
  const muted = [100, 116, 139];
  const border = [30, 41, 59];

  // Header bar
  doc.setFillColor(accent[0], accent[1], accent[2]);
  doc.rect(0, 0, 210, 8, 'F');

  // Title
  doc.setFontSize(22);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('3D Print Cost Quote', 20, 28);

  // Date
  doc.setFontSize(9);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text(`Generated: ${new Date().toLocaleDateString('de-DE')}`, 20, 36);

  // Divider
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.setLineWidth(0.3);
  doc.line(20, 40, 190, 40);

  // Print Details
  doc.setFontSize(13);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('Print Details', 20, 50);

  doc.setFontSize(10);
  let y = 58;

  const detail = (label: string, value: string) => {
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text(label, 24, y);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text(value, 100, y);
    y += 7;
  };

  detail('Material:', material.name);
  detail('Infill:', `${infill}%`);
  detail('Layer Height:', `${layerHeight} mm`);
  detail('Print Speed:', `${printSpeed} mm/s`);
  detail('Markup:', `${markup}%`);
  detail('Print Time:', `${breakdown.printTime.toFixed(2)} hours`);
  detail('Material Used:', `${breakdown.materialWeight.toFixed(2)} g`);
  detail('Material Volume:', `${breakdown.materialVolume.toFixed(2)} cm\u00B3`);

  // Cost Breakdown
  y += 5;
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.line(20, y, 190, y);
  y += 10;

  doc.setFontSize(13);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('Cost Breakdown', 20, y);
  y += 10;

  const costLine = (label: string, amount: number, color?: number[]) => {
    doc.setFontSize(10);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text(label, 24, y);
    const c = color || dark;
    doc.setTextColor(c[0], c[1], c[2]);
    doc.text(`${amount.toFixed(2)} \u20AC`, 160, y, { align: 'right' });
    y += 7;
  };

  costLine('Material Cost', breakdown.materialCost);
  costLine('Electricity', breakdown.electricityCost);
  costLine('Machine Depreciation', breakdown.machineDepreciation);
  costLine('Failure Surcharge', breakdown.failureSurcharge);

  // Subtotal line
  doc.setDrawColor(border[0], border[1], border[2]);
  doc.line(24, y, 160, y);
  y += 6;
  costLine('Subtotal', breakdown.subtotal);
  costLine(`Markup (${markup}%)`, breakdown.markup);

  // Total
  doc.setDrawColor(accent[0], accent[1], accent[2]);
  doc.setLineWidth(0.8);
  doc.line(24, y, 160, y);
  y += 8;

  doc.setFontSize(14);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('Total per piece:', 24, y);
  doc.setTextColor(accent[0], accent[1], accent[2]);
  doc.text(`${breakdown.total.toFixed(2)} \u20AC`, 160, y, { align: 'right' });

  // Footer accent bar
  doc.setFillColor(accent[0], accent[1], accent[2]);
  doc.rect(0, 289, 210, 8, 'F');

  doc.setFontSize(8);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('rathgeber.com', 105, 285, { align: 'center' });

  // Save
  doc.save(`3d-print-quote-${Date.now()}.pdf`);
};
