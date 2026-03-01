import type { AppSettings, CalculationRecord } from '../types';
import { DEFAULT_SETTINGS } from '../types';

const SETTINGS_KEY = '3dpc-settings';
const HISTORY_KEY = '3dpc-history';
const MAX_HISTORY = 50;

export const loadSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
  return { ...DEFAULT_SETTINGS };
};

export const saveSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save settings:', e);
  }
};

export const loadHistory = (): CalculationRecord[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load history:', e);
  }
  return [];
};

export const saveToHistory = (record: CalculationRecord): void => {
  try {
    const history = loadHistory();
    history.unshift(record);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn('Failed to save history:', e);
  }
};

export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};
