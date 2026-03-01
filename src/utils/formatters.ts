import type { Currency } from '../types';
import { CURRENCY_SYMBOLS } from '../types';

export const formatCurrency = (amount: number, currency: Currency): string => {
  const symbol = CURRENCY_SYMBOLS[currency];
  if (currency === 'EUR') {
    return `${amount.toFixed(2)} ${symbol}`;
  }
  return `${symbol}${amount.toFixed(2)}`;
};

export const formatWeight = (grams: number): string => {
  if (grams >= 1000) return `${(grams / 1000).toFixed(2)} kg`;
  return `${grams.toFixed(1)} g`;
};

export const formatTime = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

export const formatVolume = (cm3: number): string => {
  if (cm3 >= 1000) return `${(cm3 / 1000).toFixed(2)} L`;
  return `${cm3.toFixed(2)} cm³`;
};
