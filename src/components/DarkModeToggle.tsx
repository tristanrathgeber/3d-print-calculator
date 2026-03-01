import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export const DarkModeToggle = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('3dpc-theme');
    if (stored === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggle = () => {
    const newIsLight = !isLight;
    setIsLight(newIsLight);
    localStorage.setItem('3dpc-theme', newIsLight ? 'light' : 'dark');
    if (newIsLight) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-xl transition-all duration-200 hover:scale-110"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-accent)',
      }}
      aria-label="Toggle theme"
    >
      {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
    </button>
  );
};
