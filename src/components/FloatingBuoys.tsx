import { useEffect, useRef } from 'react';
import argobuoy from '@/assets/argo-buoy.jpg';

const FloatingBuoys = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create multiple buoys at different positions
    const buoyPositions = [
      { x: '15%', y: '20%', delay: 0 },
      { x: '75%', y: '35%', delay: 500 },
      { x: '25%', y: '60%', delay: 1000 },
      { x: '85%', y: '75%', delay: 1500 },
      { x: '45%', y: '25%', delay: 2000 },
      { x: '65%', y: '80%', delay: 750 },
    ];

    const container = containerRef.current;
    
    // Clear existing buoys
    container.innerHTML = '';

    buoyPositions.forEach((pos, index) => {
      const buoy = document.createElement('div');
      buoy.className = 'absolute w-6 h-6 md:w-8 md:h-8 opacity-40 hover:opacity-80 transition-opacity duration-300 animate-float';
      buoy.style.left = pos.x;
      buoy.style.top = pos.y;
      buoy.style.backgroundImage = `url(${argobuoy})`;
      buoy.style.backgroundSize = 'contain';
      buoy.style.backgroundRepeat = 'no-repeat';
      buoy.style.backgroundPosition = 'center';
      buoy.style.filter = 'drop-shadow(0 0 10px hsl(195 100% 60% / 0.5))';
      buoy.style.animationDelay = `${pos.delay}ms`;
      container.appendChild(buoy);
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default FloatingBuoys;