import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Waves } from 'lucide-react';

interface ChartData {
  type: 'temperature-depth' | 'salinity-depth' | 'time-series';
  values: any[];
}

interface ChartVisualizationProps {
  data?: ChartData;
  selectedFloat?: string | null;
}

export const ChartVisualization = ({ data, selectedFloat }: ChartVisualizationProps) => {
  const [activeTab, setActiveTab] = useState('temperature');

  // Sample data for demonstration
  const sampleTemperatureDepth = Array.from({length: 30}, (_, i) => ({
    depth: i * 50,
    temperature: 25 - (i * 0.6) + Math.sin(i * 0.3) * 2 + Math.random() * 1
  }));

  const sampleSalinityDepth = Array.from({length: 30}, (_, i) => ({
    depth: i * 50,
    salinity: 35 + Math.sin(i * 0.2) * 0.5 + Math.random() * 0.3
  }));

  const sampleTimeSeries = Array.from({length: 60}, (_, i) => ({
    date: new Date(2023, 0, i + 1),
    temperature: 22 + Math.sin(i * 0.1) * 4 + Math.random() * 2,
    salinity: 34.5 + Math.sin(i * 0.15) * 0.8 + Math.random() * 0.4
  }));

  const renderTemperatureDepthPlot = () => {
    const plotData = data?.type === 'temperature-depth' ? data.values : sampleTemperatureDepth;
    
    return (
      <Plot
        data={[
          {
            x: plotData.map(d => d.temperature),
            y: plotData.map(d => -d.depth), // Negative for depth
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#ef4444', size: 6 },
            line: { color: '#ef4444', width: 3 },
            name: 'Temperature Profile',
          },
        ]}
        layout={{
          title: { 
            text: selectedFloat ? `Temperature Profile - Float ${selectedFloat}` : 'Temperature Profile',
            font: { color: 'white' }
          },
          xaxis: { 
            title: 'Temperature (°C)',
            color: 'white',
            gridcolor: 'rgba(255,255,255,0.2)'
          },
          yaxis: { 
            title: 'Depth (m)',
            color: 'white',
            gridcolor: 'rgba(255,255,255,0.2)'
          },
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',
          font: { color: 'white' },
          margin: { t: 60, r: 20, b: 50, l: 60 }
        }}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true, displayModeBar: false }}
      />
    );
  };

  const renderSalinityDepthPlot = () => {
    const plotData = data?.type === 'salinity-depth' ? data.values : sampleSalinityDepth;
    
    return (
      <Plot
        data={[
          {
            x: plotData.map(d => d.salinity),
            y: plotData.map(d => -d.depth), // Negative for depth
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#3b82f6', size: 6 },
            line: { color: '#3b82f6', width: 3 },
            name: 'Salinity Profile',
          },
        ]}
        layout={{
          title: { 
            text: selectedFloat ? `Salinity Profile - Float ${selectedFloat}` : 'Salinity Profile',
            font: { color: 'white' }
          },
          xaxis: { 
            title: 'Salinity (PSU)',
            color: 'white',
            gridcolor: 'rgba(255,255,255,0.2)'
          },
          yaxis: { 
            title: 'Depth (m)',
            color: 'white',
            gridcolor: 'rgba(255,255,255,0.2)'
          },
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',
          font: { color: 'white' },
          margin: { t: 60, r: 20, b: 50, l: 60 }
        }}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true, displayModeBar: false }}
      />
    );
  };

  const renderTimeSeriesPlot = () => {
    const plotData = data?.type === 'time-series' ? data.values : sampleTimeSeries;
    
    return (
      <Plot
        data={[
          {
            x: plotData.map(d => d.date),
            y: plotData.map(d => d.temperature),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#f59e0b', size: 4 },
            line: { color: '#f59e0b', width: 2 },
            name: 'Temperature',
            yaxis: 'y',
          },
          {
            x: plotData.map(d => d.date),
            y: plotData.map(d => d.salinity),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#10b981', size: 4 },
            line: { color: '#10b981', width: 2 },
            name: 'Salinity',
            yaxis: 'y2',
          },
        ]}
        layout={{
          title: { 
            text: selectedFloat ? `Time Series - Float ${selectedFloat}` : 'Time Series Data',
            font: { color: 'white' }
          },
          xaxis: { 
            title: 'Date',
            color: 'white',
            gridcolor: 'rgba(255,255,255,0.2)'
          },
          yaxis: { 
            title: 'Temperature (°C)',
            color: '#f59e0b',
            gridcolor: 'rgba(255,255,255,0.2)'
          },
          yaxis2: {
            title: 'Salinity (PSU)',
            overlaying: 'y',
            side: 'right',
            color: '#10b981'
          },
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)',
          font: { color: 'white' },
          legend: { font: { color: 'white' } },
          margin: { t: 60, r: 60, b: 50, l: 60 }
        }}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true, displayModeBar: false }}
      />
    );
  };

  return (
    <div className="h-full bg-background/5 backdrop-blur-sm">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Data Visualization
        </h3>
        {selectedFloat && (
          <p className="text-white/70 text-sm">Showing data for Float {selectedFloat}</p>
        )}
      </div>

      <div className="p-4 h-[calc(100%-80px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10">
            <TabsTrigger value="temperature" className="text-white data-[state=active]:bg-white/20">
              <TrendingUp className="h-4 w-4 mr-2" />
              Temp vs Depth
            </TabsTrigger>
            <TabsTrigger value="salinity" className="text-white data-[state=active]:bg-white/20">
              <Waves className="h-4 w-4 mr-2" />
              Salinity vs Depth
            </TabsTrigger>
            <TabsTrigger value="timeseries" className="text-white data-[state=active]:bg-white/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Time Series
            </TabsTrigger>
          </TabsList>

          <TabsContent value="temperature" className="h-[calc(100%-60px)] mt-4">
            {renderTemperatureDepthPlot()}
          </TabsContent>

          <TabsContent value="salinity" className="h-[calc(100%-60px)] mt-4">
            {renderSalinityDepthPlot()}
          </TabsContent>

          <TabsContent value="timeseries" className="h-[calc(100%-60px)] mt-4">
            {renderTimeSeriesPlot()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};