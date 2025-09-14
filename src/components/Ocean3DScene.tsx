import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import Earth3D from './Earth3D';
import OceanWaves3D from './OceanWaves3D';

const Ocean3DScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas className="w-full h-full">
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1}
            color="#ffffff"
          />
          <pointLight 
            position={[-10, -10, -10]} 
            intensity={0.5}
            color="#87CEEB"
          />
          
          {/* Camera */}
          <PerspectiveCamera 
            makeDefault 
            position={[0, 3, 8]} 
            fov={60}
          />
          
          {/* Ocean Controls - subtle auto-rotation only */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          {/* 3D Elements */}
          <Earth3D />
          <OceanWaves3D />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Ocean3DScene;