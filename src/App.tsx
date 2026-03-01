import { useState, useCallback, useEffect } from 'react';
import { DarkModeToggle } from './components/DarkModeToggle';
import { Hero } from './components/Hero';
import { FileUpload } from './components/FileUpload';
import { STLViewer } from './components/STLViewer';
import { ManualInput } from './components/ManualInput';
import { CostCalculator } from './components/CostCalculator';
import { ResultsDisplay } from './components/ResultsDisplay';
import { QuantityTable } from './components/QuantityTable';
import { MaterialCompare } from './components/MaterialCompare';
import { Footer } from './components/Footer';
import { parseSTL } from './utils/stlParser';
import { loadSettings, saveSettings } from './utils/storage';
import { formatVolume } from './utils/formatters';
import type { STLData, CostBreakdown, Material, AppSettings, CalculatorInputs, PrinterProfile } from './types';

function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [mode, setMode] = useState<'stl' | 'manual'>('stl');
  const [stlData, setStlData] = useState<STLData | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdown | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist settings whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await parseSTL(file);
      setStlData(data);
      setVolume(data.volume);
    } catch (err) {
      console.error('Error parsing STL:', err);
      setError('Error parsing STL file. Please ensure it\'s a valid STL file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualVolumeCalculate = useCallback((calculatedVolume: number) => {
    setVolume(calculatedVolume);
  }, []);

  const handleCostCalculate = useCallback((
    breakdown: CostBreakdown,
    material: Material,
    infill: number,
    layerHeight: number,
    printSpeed: number,
    markup: number,
    qty: number,
    printerUsed: PrinterProfile
  ) => {
    setCostBreakdown(breakdown);
    setQuantity(qty);
    setCalculatorInputs({
      volume,
      material,
      infill,
      layerHeight,
      printSpeed,
      markup,
      printer: printerUsed,
      quantity: qty,
    });
  }, [volume]);

  const handleModeSwitch = (newMode: 'stl' | 'manual') => {
    setMode(newMode);
    setVolume(0);
    setCostBreakdown(null);
    setCalculatorInputs(null);
    setError(null);
    if (newMode === 'manual') {
      setStlData(null);
    }
  };

  const handleCurrencyToggle = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      currency: prev.currency === 'EUR' ? 'USD' : 'EUR',
    }));
  }, []);

  const currency = settings.currency;

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--color-bg)' }}>
      {/* Grid background */}
      <div className="fixed inset-0 bg-grid bg-grid-fade pointer-events-none" />

      <DarkModeToggle />

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        <Hero />

        <div className="mt-12">
          {/* Mode Switcher */}
          <div className="flex justify-center gap-3 mb-8 animate-in animate-in-delay-1">
            <button
              onClick={() => handleModeSwitch('stl')}
              className={mode === 'stl' ? 'btn-ghost active' : 'btn-ghost'}
            >
              Upload STL
            </button>
            <button
              onClick={() => handleModeSwitch('manual')}
              className={mode === 'manual' ? 'btn-ghost active' : 'btn-ghost'}
            >
              Manual Input
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-8 mx-auto max-w-2xl card animate-in"
              style={{ borderColor: 'var(--color-danger)', borderLeftWidth: '3px' }}>
              <div className="flex items-center justify-between">
                <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem' }}>{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-xs font-mono font-semibold px-2 py-1 rounded"
                  style={{ color: 'var(--color-danger)', opacity: 0.7 }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Input */}
            <div className="space-y-6">
              {mode === 'stl' ? (
                <>
                  <div className="card animate-in animate-in-delay-1">
                    <p className="section-label">Model Upload</p>
                    <FileUpload onFileSelect={handleFileSelect} />
                    {isLoading && (
                      <div className="mt-4 text-center">
                        <div className="inline-block w-8 h-8 rounded-full border-2 border-transparent animate-spin"
                          style={{ borderTopColor: 'var(--color-accent)', borderRightColor: 'var(--color-accent)' }} />
                        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>Parsing STL...</p>
                      </div>
                    )}
                  </div>

                  {stlData && (
                    <div className="card animate-in animate-in-delay-2">
                      <p className="section-label">3D Preview</p>
                      <STLViewer stlData={stlData} />
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="stat-block">
                          <span className="stat-value text-lg">{formatVolume(stlData.volume)}</span>
                          <span className="stat-label">Volume</span>
                        </div>
                        <div className="stat-block">
                          <span className="stat-value text-lg" style={{ color: 'var(--color-text)' }}>
                            {stlData.dimensions.x.toFixed(1)} × {stlData.dimensions.y.toFixed(1)} × {stlData.dimensions.z.toFixed(1)}
                          </span>
                          <span className="stat-label">Dimensions (mm)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="card animate-in animate-in-delay-1">
                  <p className="section-label">Manual Dimensions</p>
                  <ManualInput onVolumeCalculate={handleManualVolumeCalculate} />
                  {volume > 0 && (
                    <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)' }}>
                      <span className="data-label">Calculated Volume</span>
                      <p className="data-value text-2xl" style={{ color: 'var(--color-accent)' }}>
                        {formatVolume(volume)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Print Settings */}
              {volume > 0 && (
                <div className="card animate-in animate-in-delay-2">
                  <p className="section-label">Print Settings</p>
                  <CostCalculator volume={volume} settings={settings} onCalculate={handleCostCalculate} />
                </div>
              )}
            </div>

            {/* Right Column: Results */}
            <div className="space-y-6">
              {volume > 0 && costBreakdown && calculatorInputs && (
                <>
                  <ResultsDisplay
                    breakdown={costBreakdown}
                    material={calculatorInputs.material}
                    infill={calculatorInputs.infill}
                    layerHeight={calculatorInputs.layerHeight}
                    printSpeed={calculatorInputs.printSpeed}
                    markup={calculatorInputs.markup}
                    quantity={quantity}
                    currency={currency}
                  />

                  <QuantityTable inputs={calculatorInputs} currency={currency} />

                  <MaterialCompare baseInputs={calculatorInputs} currency={currency} />
                </>
              )}
            </div>
          </div>
        </div>

        <Footer currency={currency} onCurrencyToggle={handleCurrencyToggle} />
      </div>
    </div>
  );
}

export default App;
