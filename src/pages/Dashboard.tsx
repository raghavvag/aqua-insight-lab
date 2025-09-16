import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { FloatMap } from "@/components/FloatMap";
import { ChartVisualization } from "@/components/ChartVisualization";
import { DataTable } from "@/components/DataTable";
import { ExportOptions } from "@/components/ExportOptions";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedFloat, setSelectedFloat] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [mapData, setMapData] = useState<any[]>([]);

  const handleQueryResponse = (response: any) => {
    if (response.chartData) setChartData(response.chartData);
    if (response.tableData) setTableData(response.tableData);
    if (response.mapData) setMapData(response.mapData);
  };

  const handleFloatSelect = (floatId: string) => {
    setSelectedFloat(floatId);
    // TODO: Fetch float data from backend
  };

  return (
    <div className="min-h-screen bg-gradient-ocean">
      {/* Header */}
      <header className="bg-background/10 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Landing
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">FloatChat Dashboard</h1>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Chat & Filters */}
        <div className="w-1/3 bg-background/5 backdrop-blur-sm border-r border-white/10">
          <ChatInterface onQueryResponse={handleQueryResponse} />
        </div>

        {/* Right Panel - Visualizations */}
        <div className="flex-1 flex flex-col">
          {/* Map View */}
          <div className="h-1/2 border-b border-white/10">
            <FloatMap 
              floats={mapData} 
              selectedFloat={selectedFloat}
              onFloatSelect={handleFloatSelect}
            />
          </div>

          {/* Bottom Section - Charts and Table */}
          <div className="h-1/2 flex">
            {/* Charts */}
            <div className="w-2/3 border-r border-white/10">
              <ChartVisualization 
                data={chartData} 
                selectedFloat={selectedFloat}
              />
            </div>

            {/* Data Table & Export */}
            <div className="w-1/3 flex flex-col">
              <div className="flex-1">
                <DataTable data={tableData} />
              </div>
              <div className="border-t border-white/10">
                <ExportOptions selectedFloat={selectedFloat} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;