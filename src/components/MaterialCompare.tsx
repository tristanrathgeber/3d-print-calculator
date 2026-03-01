import type { CalculatorInputs, Currency, Material } from '../types';
import { MATERIALS } from '../types';
import { calculateCost } from '../utils/costCalculator';
import { formatCurrency } from '../utils/formatters';

interface MaterialCompareProps {
  baseInputs: CalculatorInputs;
  currency: Currency;
}

export const MaterialCompare = ({ baseInputs, currency }: MaterialCompareProps) => {
  const results = MATERIALS.map((mat: Material) => {
    const breakdown = calculateCost({ ...baseInputs, material: mat });
    return { material: mat, total: breakdown.total, printTime: breakdown.printTime };
  }).sort((a, b) => a.total - b.total);

  const cheapest = results[0]?.total || 1;

  return (
    <div className="card animate-in animate-in-delay-3">
      <p className="section-label">Material Comparison</p>
      <div className="space-y-2">
        {results.map((r) => {
          const widthPct = Math.min(100, (r.total / (cheapest * 3)) * 100);
          const isActive = r.material.id === baseInputs.material.id;
          return (
            <div key={r.material.id} className={`flex items-center gap-3 py-1.5 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
              <span className="text-xs font-semibold w-20 truncate" style={{ color: r.material.color }}>
                {r.material.name}
              </span>
              <div className="flex-1 h-5 rounded-full overflow-hidden" style={{ background: 'var(--color-bg-elevated)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    background: isActive
                      ? `linear-gradient(90deg, ${r.material.color}, ${r.material.color}88)`
                      : `${r.material.color}44`,
                  }}
                />
              </div>
              <span className="font-mono text-xs font-semibold w-20 text-right" style={{ color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                {formatCurrency(r.total, currency)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
