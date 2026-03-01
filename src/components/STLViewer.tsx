import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';
import type { STLData } from '../types';
import * as THREE from 'three';
import { useMemo, Component } from 'react';
import type { ReactNode } from 'react';

interface STLViewerProps {
  stlData: STLData;
}

// Error boundary to catch Three.js rendering errors
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ViewerErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-96 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
              Unable to render 3D preview
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              The model data may be invalid. Calculations still work.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const STLModel = ({ geometry }: { geometry: Float32Array }) => {
  const bufferGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(geometry, 3));
    geom.computeVertexNormals();
    geom.center();
    return geom;
  }, [geometry]);

  return (
    <mesh geometry={bufferGeometry}>
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.3}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const STLViewer = ({ stlData }: STLViewerProps) => {
  const maxDim = Math.max(
    stlData.dimensions.x,
    stlData.dimensions.y,
    stlData.dimensions.z
  );
  const camDistance = maxDim * 1.5 || 100;

  return (
    <ViewerErrorBoundary>
      <div className="w-full h-96 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <Canvas>
          <PerspectiveCamera makeDefault position={[camDistance, camDistance, camDistance]} />
          <OrbitControls enableDamping dampingFactor={0.05} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <STLModel geometry={stlData.geometry} />
          <Grid
            args={[200, 200]}
            cellSize={10}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={50}
            sectionThickness={1}
            sectionColor="#3b82f6"
            fadeDistance={400}
            fadeStrength={1}
            followCamera={false}
          />
        </Canvas>
      </div>
    </ViewerErrorBoundary>
  );
};
