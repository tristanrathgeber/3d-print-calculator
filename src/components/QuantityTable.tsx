import type { CalculatorInputs, Currency } from '../types';
import { calculateBatchPricing } from '../utils/costCalculator';
import { formatCurrency } from '../utils/formatters';

interface QuantityTableProps {
  inputs: CalculatorInputs;
  currency: Currency;
}

export const QuantityTable = ({ inputs, currency }: QuantityTableProps) => {
  const tiers = calculateBatchPricing(inputs);

  return (
    <div className="card animate-in animate-in-delay-2">
      <p className="section-label">Batch Pricing</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ color: 'var(--color-text-muted)' }}>
              <th className="text-left py-2 font-medium">Qty</th>
              <th className="text-right py-2 font-medium">Discount</th>
              <th className="text-right py-2 font-medium">Per Piece</th>
              <th className="text-right py-2 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr key={tier.quantity}
                className={tier.quantity === inputs.quantity ? 'font-bold' : ''}
                style={{
                  borderTop: '1px solid var(--color-border)',
                  color: tier.quantity === inputs.quantity ? 'var(--color-accent)' : 'var(--color-text)',
                }}>
                <td className="py-2 font-mono">{tier.quantity}×</td>
                <td className="text-right py-2 font-mono" style={{ color: tier.discount > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                  {tier.discount > 0 ? `−${tier.discount}%` : '—'}
                </td>
                <td className="text-right py-2 font-mono">{formatCurrency(tier.pricePerPiece, currency)}</td>
                <td className="text-right py-2 font-mono">{formatCurrency(tier.totalPrice, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
