import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, PlaneGeometry } from 'three';

const OceanWaves3D = () => {
  const oceanRef = useRef<Mesh>(null);
  
  // Create a plane geometry for the ocean surface
  const geometry = useMemo(() => {
    const geo = new PlaneGeometry(20, 20, 100, 100);
    return geo;
  }, []);

  useFrame((state) => {
    if (oceanRef.current) {
      const time = state.clock.elapsedTime;
      const positions = oceanRef.current.geometry.attributes.position;
      
      // Create wave motion
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Multiple sine waves for realistic ocean motion
        const wave1 = Math.sin(x * 0.5 + time * 2) * 0.1;
        const wave2 = Math.sin(y * 0.3 + time * 1.5) * 0.15;
        const wave3 = Math.sin((x + y) * 0.2 + time * 1.8) * 0.08;
        
        positions.setZ(i, wave1 + wave2 + wave3);
      }
      
      positions.needsUpdate = true;
      oceanRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={oceanRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <primitive object={geometry} />
      <meshPhongMaterial 
        color="#006994"
        transparent
        opacity={0.8}
        shininess={100}
        wireframe={false}
      />
    </mesh>
  );
};

export default OceanWaves3D;