
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, FileText, AlertTriangle, CheckCircle } from "lucide-react";

const frameworkStats = [
  {
    name: "NIST 800-53",
    totalControls: 945,
    mappedControls: 834,
    coverage: 88,
    status: "Active",
    lastUpdated: "2024-05-15"
  },
  {
    name: "PCI-DSS",
    totalControls: 281,
    mappedControls: 267,
    coverage: 95,
    status: "Active",
    lastUpdated: "2024-04-20"
  },
  {
    name: "HIPAA Security",
    totalControls: 164,
    mappedControls: 149,
    coverage: 91,
    status: "Active",
    lastUpdated: "2024-03-10"
  },
  {
    name: "SOX ITGC",
    totalControls: 127,
    mappedControls: 98,
    coverage: 77,
    status: "In Progress",
    lastUpdated: "2024-06-01"
  },
  {
    name: "Adobe CCF",
    totalControls: 892,
    mappedControls: 892,
    coverage: 100,
    status: "Active",
    lastUpdated: "2024-06-10"
  }
];

const recentActivity = [
  {
    action: "Framework Updated",
    target: "NIST 800-53 Rev 5",
    timestamp: "2 hours ago",
    type: "update"
  },
  {
    action: "New Mapping",
    target: "PCI 8.2.1 → NIST AC-2",
    timestamp: "4 hours ago",
    type: "mapping"
  },
  {
    action: "Gap Identified",
    target: "HIPAA → SOX Coverage",
    timestamp: "6 hours ago",
    type: "gap"
  },
  {
    action: "Export Generated",
    target: "Cross-Framework Report",
    timestamp: "1 day ago",
    type: "export"
  }
];

export function DashboardOverview() {
  const totalControls = frameworkStats.reduce((sum, fw) => sum + fw.totalControls, 0);
  const totalMapped = frameworkStats.reduce((sum, fw) => sum + fw.mappedControls, 0);
  const overallCoverage = Math.round((totalMapped / totalControls) * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Compliance Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Control relationship mapping and framework analysis platform
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Controls</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalControls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all frameworks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mapped Controls</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMapped.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {overallCoverage}% coverage rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Frameworks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {frameworkStats.filter(fw => fw.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Out of {frameworkStats.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage Gaps</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalControls - totalMapped}</div>
            <p className="text-xs text-muted-foreground">Controls need mapping</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Framework Status */}
        <Card>
          <CardHeader>
            <CardTitle>Framework Status</CardTitle>
            <CardDescription>
              Coverage and mapping progress by framework
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {frameworkStats.map((framework) => (
              <div key={framework.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{framework.name}</span>
                    <Badge 
                      variant={framework.status === "Active" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {framework.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {framework.mappedControls}/{framework.totalControls}
                  </span>
                </div>
                <Progress value={framework.coverage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Last updated: {framework.lastUpdated}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and changes across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 last:pb-0 border-b last:border-0 border-border">
                  <div className="flex h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.target}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
