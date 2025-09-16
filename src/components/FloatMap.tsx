import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.divIcon({
  html: `<div style="background-color: #0ea5e9; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

let SelectedIcon = L.divIcon({
  html: `<div style="background-color: #f59e0b; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.4); animation: pulse 2s infinite;"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface FloatData {
  id: string;
  lat: number;
  lng: number;
  name: string;
  temperature?: number;
  salinity?: number;
  depth?: number;
  trajectory?: { lat: number; lng: number }[];
}

interface FloatMapProps {
  floats: FloatData[];
  selectedFloat: string | null;
  onFloatSelect: (floatId: string) => void;
}

export const FloatMap = ({ floats, selectedFloat, onFloatSelect }: FloatMapProps) => {
  // Sample data if no floats provided
  const sampleFloats: FloatData[] = [
    { id: '2903123', lat: -10.5, lng: 105.2, name: 'Float 2903123', temperature: 28.5, salinity: 34.2, depth: 2000 },
    { id: '2903124', lat: -5.8, lng: 110.7, name: 'Float 2903124', temperature: 29.1, salinity: 34.8, depth: 1800 },
    { id: '2903125', lat: 0.2, lng: 115.3, name: 'Float 2903125', temperature: 30.2, salinity: 35.1, depth: 2200 },
    { id: '2903126', lat: 8.1, lng: 120.9, name: 'Float 2903126', temperature: 27.8, salinity: 33.9, depth: 1900 },
    { id: '2903127', lat: 15.6, lng: 125.4, name: 'Float 2903127', temperature: 26.5, salinity: 34.5, depth: 2100 },
    { id: '2903128', lat: -15.3, lng: 95.7, name: 'Float 2903128', temperature: 25.9, salinity: 34.0, depth: 1750 },
  ];

  const displayFloats = floats.length > 0 ? floats : sampleFloats;

  useEffect(() => {
    // Add custom CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-full relative">
      <div className="absolute top-4 left-4 z-[1000] bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <h3 className="text-white font-semibold mb-2">Ocean Float Map</h3>
        <p className="text-white/70 text-sm">Click markers to view float data</p>
        <p className="text-white/70 text-sm">Total floats: {displayFloats.length}</p>
      </div>

      <MapContainer
        center={[0, 110] as LatLngExpression}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="bg-gradient-to-b from-blue-900 to-blue-800"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {displayFloats.map((float) => (
          <Marker
            key={float.id}
            position={[float.lat, float.lng] as [number, number]}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h4 className="font-semibold text-lg mb-2">{float.name}</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">ID:</span> {float.id}</p>
                  <p><span className="font-medium">Position:</span> {float.lat.toFixed(2)}°, {float.lng.toFixed(2)}°</p>
                  {float.temperature && (
                    <p><span className="font-medium">Temperature:</span> {float.temperature}°C</p>
                  )}
                  {float.salinity && (
                    <p><span className="font-medium">Salinity:</span> {float.salinity} PSU</p>
                  )}
                  {float.depth && (
                    <p><span className="font-medium">Max Depth:</span> {float.depth}m</p>
                  )}
                </div>
                <button
                  onClick={() => onFloatSelect(float.id)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  View Profile
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Show trajectory for selected float */}
        {selectedFloat && displayFloats.find(f => f.id === selectedFloat)?.trajectory && (
          <Polyline
            positions={displayFloats.find(f => f.id === selectedFloat)!.trajectory!.map(p => [p.lat, p.lng] as [number, number])}
            pathOptions={{ color: "#f59e0b", weight: 3, opacity: 0.8 }}
          />
        )}
      </MapContainer>
    </div>
  );
};