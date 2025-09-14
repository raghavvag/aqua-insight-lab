import { useEffect, useRef } from 'react';
import oceanGlobe from '@/assets/ocean-globe.jpg';

const OceanGlobe = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeRef.current || !markersRef.current) return;

    // Create pulsing markers
    const markerPositions = [
      { x: '30%', y: '40%', delay: 0 },
      { x: '70%', y: '35%', delay: 300 },
      { x: '25%', y: '65%', delay: 600 },
      { x: '75%', y: '60%', delay: 900 },
      { x: '50%', y: '25%', delay: 1200 },
    ];

    const markersContainer = markersRef.current;
    markersContainer.innerHTML = '';

    markerPositions.forEach((pos, index) => {
      const marker = document.createElement('div');
      marker.className = 'marker animate-pulse-glow';
      marker.style.left = pos.x;
      marker.style.top = pos.y;
      marker.style.animationDelay = `${pos.delay}ms`;
      markersContainer.appendChild(marker);
    });
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Globe Background */}
        <div 
          ref={globeRef}
          className="w-full h-full rounded-full bg-cover bg-center shadow-ocean animate-float animate-ocean-wave"
          style={{ 
            backgroundImage: `url(${oceanGlobe})`,
            filter: 'drop-shadow(0 0 30px hsl(195 100% 60% / 0.4))'
          }}
        />
        
        {/* Pulsing Markers */}
        <div 
          ref={markersRef}
          className="absolute inset-0"
        />
        
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-accent/20 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default OceanGlobe;