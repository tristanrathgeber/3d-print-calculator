import type { ManualInputShape } from '../types';

export const calculateShapeVolume = (shape: ManualInputShape): number => {
  const { type, dimensions } = shape;
  
  switch (type) {
    case 'box':
      if (dimensions.length && dimensions.width && dimensions.height) {
        return dimensions.length * dimensions.width * dimensions.height;
      }
      return 0;
      
    case 'cylinder':
      if (dimensions.radius && dimensions.height) {
        return Math.PI * Math.pow(dimensions.radius, 2) * dimensions.height;
      }
      return 0;
      
    case 'sphere':
      if (dimensions.radius) {
        return (4 / 3) * Math.PI * Math.pow(dimensions.radius, 3);
      }
      return 0;
      
    default:
      return 0;
  }
};

export const getShapeLabel = (type: ManualInputShape['type']): string => {
  const labels = {
    box: 'Box / Rectangular Prism',
    cylinder: 'Cylinder',
    sphere: 'Sphere',
  };
  return labels[type];
};
