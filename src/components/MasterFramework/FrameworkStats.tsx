import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MasterFrameworkRecord } from '../../types/masterFramework';

interface FrameworkStatsProps {
  allData: {
    master: MasterFrameworkRecord[];
    tripwire: MasterFrameworkRecord[];
    alert: MasterFrameworkRecord[];
  };
}

export function FrameworkStats({ allData }: FrameworkStatsProps) {
  const stats = useMemo(() => {
    const combined = Object.values(allData).flat();
    
    // Domain distribution
    const domainStats = combined.reduce((acc, record) => {
      acc[record.domain] = (acc[record.domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Frequency distribution
    const frequencyStats = combined.reduce((acc, record) => {
      acc[record.frequency] = (acc[record.frequency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Status distribution
    const statusStats = combined.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // CIP Standards coverage
    const cipStats = combined.reduce((acc, record) => {
      acc[record.cipStandards] = (acc[record.cipStandards] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { domainStats, frequencyStats, statusStats, cipStats };
  }, [allData]);

  const domainChartData = Object.entries(stats.domainStats).map(([name, value]) => ({ name, value }));
  const frequencyChartData = Object.entries(stats.frequencyStats).map(([name, value]) => ({ name, value }));
  const statusChartData = Object.entries(stats.statusStats).map(([name, value]) => ({ name, value }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Domain Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={domainChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequency Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={frequencyChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {frequencyChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(stats.statusStats).map(([status, count]) => {
              const total = Object.values(stats.statusStats).reduce((sum, val) => sum + val, 0);
              const percentage = Math.round((count / total) * 100);
              
              return (
                <div key={status} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{status}</Badge>
                      <span className="text-sm text-gray-600">{count} records</span>
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CIP Standards Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(stats.cipStats).map(([standard, count]) => (
              <div key={standard} className="flex justify-between items-center">
                <Badge variant="outline">{standard}</Badge>
                <span className="text-sm font-medium">{count} controls</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}