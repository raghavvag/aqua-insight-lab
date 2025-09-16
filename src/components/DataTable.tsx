import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpDown, Download } from 'lucide-react';

interface TableData {
  floatId: string;
  lat: string;
  lng: string;
  temperature: string;
  salinity: string;
  date: string;
  depth?: string;
}

interface DataTableProps {
  data?: TableData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof TableData>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Sample data if none provided
  const sampleData: TableData[] = [
    { floatId: '2903123', lat: '-10.50', lng: '105.20', temperature: '28.5', salinity: '34.2', date: '2023-03-15', depth: '2000' },
    { floatId: '2903124', lat: '-5.80', lng: '110.70', temperature: '29.1', salinity: '34.8', date: '2023-03-14', depth: '1800' },
    { floatId: '2903125', lat: '0.20', lng: '115.30', temperature: '30.2', salinity: '35.1', date: '2023-03-13', depth: '2200' },
    { floatId: '2903126', lat: '8.10', lng: '120.90', temperature: '27.8', salinity: '33.9', date: '2023-03-12', depth: '1900' },
    { floatId: '2903127', lat: '15.60', lng: '125.40', temperature: '26.5', salinity: '34.5', date: '2023-03-11', depth: '2100' },
    { floatId: '2903128', lat: '-15.30', lng: '95.70', temperature: '25.9', salinity: '34.0', date: '2023-03-10', depth: '1750' },
    { floatId: '2903129', lat: '-8.40', lng: '98.20', temperature: '27.2', salinity: '34.3', date: '2023-03-09', depth: '1950' },
    { floatId: '2903130', lat: '12.30', lng: '118.50', temperature: '28.8', salinity: '34.7', date: '2023-03-08', depth: '2050' },
  ];

  const displayData = data || sampleData;

  const filteredData = displayData.filter(row =>
    Object.values(row).some(value =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (field: keyof TableData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const exportToCsv = () => {
    const csvContent = [
      ['Float ID', 'Latitude', 'Longitude', 'Temperature (°C)', 'Salinity (PSU)', 'Date', 'Depth (m)'],
      ...sortedData.map(row => [row.floatId, row.lat, row.lng, row.temperature, row.salinity, row.date, row.depth || ''])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'float_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-background/5 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Float Data</h3>
          <Button
            size="sm"
            variant="outline"
            onClick={exportToCsv}
            className="text-white border-white/20 hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search float data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/20 hover:bg-white/5">
              <TableHead 
                className="text-white cursor-pointer hover:text-primary"
                onClick={() => handleSort('floatId')}
              >
                <div className="flex items-center gap-1">
                  Float ID
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead 
                className="text-white cursor-pointer hover:text-primary"
                onClick={() => handleSort('lat')}
              >
                <div className="flex items-center gap-1">
                  Latitude
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead 
                className="text-white cursor-pointer hover:text-primary"
                onClick={() => handleSort('lng')}
              >
                <div className="flex items-center gap-1">
                  Longitude
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead 
                className="text-white cursor-pointer hover:text-primary"
                onClick={() => handleSort('temperature')}
              >
                <div className="flex items-center gap-1">
                  Temp (°C)
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead 
                className="text-white cursor-pointer hover:text-primary"
                onClick={() => handleSort('salinity')}
              >
                <div className="flex items-center gap-1">
                  Salinity
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead 
                className="text-white cursor-pointer hover:text-primary"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  Date
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index} className="border-white/10 hover:bg-white/5">
                <TableCell className="text-white font-mono">{row.floatId}</TableCell>
                <TableCell className="text-white">{row.lat}°</TableCell>
                <TableCell className="text-white">{row.lng}°</TableCell>
                <TableCell className="text-white">{row.temperature}°C</TableCell>
                <TableCell className="text-white">{row.salinity} PSU</TableCell>
                <TableCell className="text-white">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sortedData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-white/70">No data found matching your search.</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <p className="text-white/70 text-sm">
          Showing {sortedData.length} of {displayData.length} records
        </p>
      </div>
    </div>
  );
};