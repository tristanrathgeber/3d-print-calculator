import type { STLData } from '../types';

export const parseSTL = async (file: File): Promise<STLData> => {
  const arrayBuffer = await file.arrayBuffer();
  const dataView = new DataView(arrayBuffer);
  
  // Check if binary or ASCII STL
  const isBinary = dataView.byteLength > 84 && dataView.getUint32(80, true) * 50 + 84 === dataView.byteLength;
  
  if (isBinary) {
    return parseBinarySTL(arrayBuffer);
  } else {
    return parseASCIISTL(arrayBuffer);
  }
};

const parseBinarySTL = (arrayBuffer: ArrayBuffer): STLData => {
  const dataView = new DataView(arrayBuffer);
  const triangleCount = dataView.getUint32(80, true);
  
  const vertices: number[] = [];
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  
  for (let i = 0; i < triangleCount; i++) {
    const offset = 84 + i * 50;
    
    // Skip normal (12 bytes)
    // Read 3 vertices (9 floats)
    for (let j = 0; j < 3; j++) {
      const vertexOffset = offset + 12 + j * 12;
      const x = dataView.getFloat32(vertexOffset, true);
      const y = dataView.getFloat32(vertexOffset + 4, true);
      const z = dataView.getFloat32(vertexOffset + 8, true);
      
      vertices.push(x, y, z);
      
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      minZ = Math.min(minZ, z);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      maxZ = Math.max(maxZ, z);
    }
  }
  
  const volume = calculateVolume(vertices);
  const surfaceArea = calculateSurfaceArea(vertices);
  
  return {
    geometry: new Float32Array(vertices),
    volume: volume / 1000, // Convert mm³ to cm³
    dimensions: {
      x: maxX - minX,
      y: maxY - minY,
      z: maxZ - minZ,
    },
    surfaceArea: surfaceArea / 100, // Convert mm² to cm²
  };
};

const parseASCIISTL = (arrayBuffer: ArrayBuffer): STLData => {
  const text = new TextDecoder().decode(arrayBuffer);
  const vertices: number[] = [];
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  
  const vertexRegex = /vertex\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)\s+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)/g;
  let match;
  
  while ((match = vertexRegex.exec(text)) !== null) {
    const x = parseFloat(match[1]);
    const y = parseFloat(match[3]);
    const z = parseFloat(match[5]);
    
    vertices.push(x, y, z);
    
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }
  
  const volume = calculateVolume(vertices);
  const surfaceArea = calculateSurfaceArea(vertices);
  
  return {
    geometry: new Float32Array(vertices),
    volume: volume / 1000, // Convert mm³ to cm³
    dimensions: {
      x: maxX - minX,
      y: maxY - minY,
      z: maxZ - minZ,
    },
    surfaceArea: surfaceArea / 100, // Convert mm² to cm²
  };
};

// Calculate volume using signed volume of triangles
const calculateVolume = (vertices: number[]): number => {
  let volume = 0;
  
  for (let i = 0; i < vertices.length; i += 9) {
    const x1 = vertices[i];
    const y1 = vertices[i + 1];
    const z1 = vertices[i + 2];
    const x2 = vertices[i + 3];
    const y2 = vertices[i + 4];
    const z2 = vertices[i + 5];
    const x3 = vertices[i + 6];
    const y3 = vertices[i + 7];
    const z3 = vertices[i + 8];
    
    volume += (x1 * (y2 * z3 - y3 * z2) +
               x2 * (y3 * z1 - y1 * z3) +
               x3 * (y1 * z2 - y2 * z1)) / 6;
  }
  
  return Math.abs(volume);
};

// Calculate surface area
const calculateSurfaceArea = (vertices: number[]): number => {
  let area = 0;
  
  for (let i = 0; i < vertices.length; i += 9) {
    const x1 = vertices[i];
    const y1 = vertices[i + 1];
    const z1 = vertices[i + 2];
    const x2 = vertices[i + 3];
    const y2 = vertices[i + 4];
    const z2 = vertices[i + 5];
    const x3 = vertices[i + 6];
    const y3 = vertices[i + 7];
    const z3 = vertices[i + 8];
    
    // Calculate triangle area using cross product
    const ax = x2 - x1;
    const ay = y2 - y1;
    const az = z2 - z1;
    const bx = x3 - x1;
    const by = y3 - y1;
    const bz = z3 - z1;
    
    const cx = ay * bz - az * by;
    const cy = az * bx - ax * bz;
    const cz = ax * by - ay * bx;
    
    area += Math.sqrt(cx * cx + cy * cy + cz * cz) / 2;
  }
  
  return area;
};
