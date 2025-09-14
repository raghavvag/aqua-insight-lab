import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Earth3D = () => {
  const earthRef = useRef<Mesh>(null);
  
  // Load Earth texture (we'll use a procedural approach since we don't have texture files)
  
  useFrame((state) => {
    if (earthRef.current) {
      // Gentle rotation
      earthRef.current.rotation.y += 0.002;
      // Gentle floating motion
      earthRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={earthRef} position={[0, 2, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhongMaterial 
        color="#4A90E2"
        shininess={100}
        transparent
        opacity={0.9}
      />
      {/* Atmosphere glow */}
      <mesh scale={1.05}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.1} 
        />
      </mesh>
    </mesh>
  );
};

export default Earth3D;