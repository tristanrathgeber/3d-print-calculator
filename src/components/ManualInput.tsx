import { useState } from 'react';
import { Box, Cylinder, Circle } from 'lucide-react';
import type { ManualInputShape } from '../types';
import { calculateShapeVolume } from '../utils/shapeCalculator';

interface ManualInputProps {
  onVolumeCalculate: (volume: number) => void;
}

export const ManualInput = ({ onVolumeCalculate }: ManualInputProps) => {
  const [shapeType, setShapeType] = useState<ManualInputShape['type']>('box');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '', radius: '' });

  const handleDimensionChange = (key: string, value: string) => {
    const newDimensions = { ...dimensions, [key]: value };
    setDimensions(newDimensions);
    const shape: ManualInputShape = {
      type: shapeType,
      dimensions: {
        length: parseFloat(newDimensions.length) || undefined,
        width: parseFloat(newDimensions.width) || undefined,
        height: parseFloat(newDimensions.height) || undefined,
        radius: parseFloat(newDimensions.radius) || undefined,
      },
    };
    const volume = calculateShapeVolume(shape);
    if (volume > 0) onVolumeCalculate(volume);
  };

  const handleShapeChange = (type: ManualInputShape['type']) => {
    setShapeType(type);
    setDimensions({ length: '', width: '', height: '', radius: '' });
  };

  const shapes = [
    { type: 'box' as const, icon: Box, label: 'Box' },
    { type: 'cylinder' as const, icon: Cylinder, label: 'Cylinder' },
    { type: 'sphere' as const, icon: Circle, label: 'Sphere' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {shapes.map(({ type, icon: Icon, label }) => (
          <button key={type} onClick={() => handleShapeChange(type)}
            className={shapeType === type ? 'btn-ghost active flex-1' : 'btn-ghost flex-1'}
            style={{ padding: '0.75rem' }}>
            <div className="flex flex-col items-center gap-1">
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shapeType === 'box' && (
          <>
            <div>
              <label className="data-label block mb-1">Length (cm)</label>
              <input type="number" value={dimensions.length}
                onChange={(e) => handleDimensionChange('length', e.target.value)}
                className="input" placeholder="0.0" min="0" step="0.1" />
            </div>
            <div>
              <label className="data-label block mb-1">Width (cm)</label>
              <input type="number" value={dimensions.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                className="input" placeholder="0.0" min="0" step="0.1" />
            </div>
            <div>
              <label className="data-label block mb-1">Height (cm)</label>
              <input type="number" value={dimensions.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
                className="input" placeholder="0.0" min="0" step="0.1" />
            </div>
          </>
        )}
        {shapeType === 'cylinder' && (
          <>
            <div>
              <label className="data-label block mb-1">Radius (cm)</label>
              <input type="number" value={dimensions.radius}
                onChange={(e) => handleDimensionChange('radius', e.target.value)}
                className="input" placeholder="0.0" min="0" step="0.1" />
            </div>
            <div>
              <label className="data-label block mb-1">Height (cm)</label>
              <input type="number" value={dimensions.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
                className="input" placeholder="0.0" min="0" step="0.1" />
            </div>
          </>
        )}
        {shapeType === 'sphere' && (
          <div>
            <label className="data-label block mb-1">Radius (cm)</label>
            <input type="number" value={dimensions.radius}
              onChange={(e) => handleDimensionChange('radius', e.target.value)}
              className="input" placeholder="0.0" min="0" step="0.1" />
          </div>
        )}
      </div>
    </div>
  );
};
