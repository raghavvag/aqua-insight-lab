import { Button } from '@/components/ui/button';
import { Download, FileText, Database, File } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  selectedFloat?: string | null;
}

export const ExportOptions = ({ selectedFloat }: ExportOptionsProps) => {
  const { toast } = useToast();

  const handleExport = (format: 'csv' | 'netcdf' | 'ascii') => {
    // Simulate export functionality
    toast({
      title: "Export Started",
      description: `Exporting ${selectedFloat ? `Float ${selectedFloat}` : 'current data'} in ${format.toUpperCase()} format...`,
    });

    // In a real implementation, this would call:
    // GET /export/{id}?format={format}
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Data exported successfully as ${format.toUpperCase()} file.`,
      });
    }, 2000);
  };

  return (
    <div className="p-4 bg-background/5 backdrop-blur-sm">
      <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Download className="h-4 w-4" />
        Export Data
      </h3>
      
      {selectedFloat && (
        <p className="text-white/70 text-sm mb-4">
          Export data for Float {selectedFloat}
        </p>
      )}

      <div className="space-y-2">
        <Button
          onClick={() => handleExport('csv')}
          variant="outline"
          size="sm"
          className="w-full justify-start text-white border-white/20 hover:bg-white/10"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export CSV
        </Button>

        <Button
          onClick={() => handleExport('netcdf')}
          variant="outline"
          size="sm"
          className="w-full justify-start text-white border-white/20 hover:bg-white/10"
        >
          <Database className="h-4 w-4 mr-2" />
          Export NetCDF
        </Button>

        <Button
          onClick={() => handleExport('ascii')}
          variant="outline"
          size="sm"
          className="w-full justify-start text-white border-white/20 hover:bg-white/10"
        >
          <File className="h-4 w-4 mr-2" />
          Export ASCII
        </Button>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-white/50 text-xs">
          Export formats support full data including metadata, profiles, and trajectories.
        </p>
      </div>
    </div>
  );
};