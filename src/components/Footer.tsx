import type { Currency } from '../types';

interface FooterProps {
  currency: Currency;
  onCurrencyToggle: () => void;
}

export const Footer = ({ currency, onCurrencyToggle }: FooterProps) => {
  return (
    <footer className="py-6 mt-16" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span>
          Built by{' '}
          <a href="https://rathgeber.com" target="_blank" rel="noopener noreferrer"
            className="font-semibold hover:underline" style={{ color: 'var(--color-accent)' }}>
            rathgeber.com
          </a>
        </span>
        <div className="flex items-center gap-3">
          <button onClick={onCurrencyToggle}
            className="font-mono font-bold px-2 py-1 rounded hover:opacity-80 transition-opacity"
            style={{ color: 'var(--color-accent)', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
            {currency}
          </button>
        </div>
      </div>
    </footer>
  );
};
