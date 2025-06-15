
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, FileText, BarChart3, AlertTriangle } from "lucide-react";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Controls",
      value: "2,409",
      description: "Across all frameworks",
      icon: Shield,
      color: "text-blue-500"
    },
    {
      title: "Framework Coverage",
      value: "5",
      description: "Major compliance frameworks",
      icon: FileText,
      color: "text-green-500"
    },
    {
      title: "Implementation",
      value: "85%",
      description: "Average coverage",
      icon: BarChart3,
      color: "text-purple-500"
    },
    {
      title: "Open Issues",
      value: "12",
      description: "Requiring attention",
      icon: AlertTriangle,
      color: "text-red-500"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Your compliance management platform overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Framework Implementation Status</CardTitle>
            <CardDescription>Current implementation progress by framework</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "NIST 800-53", progress: 85 },
              { name: "PCI-DSS", progress: 92 },
              { name: "HIPAA Security", progress: 78 },
              { name: "SOX ITGC", progress: 95 }
            ].map((framework) => (
              <div key={framework.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{framework.name}</span>
                  <span>{framework.progress}%</span>
                </div>
                <Progress value={framework.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "Updated NIST 800-53 control mappings",
                "Generated gap analysis report",
                "Added new PCI-DSS controls",
                "Reviewed HIPAA compliance status"
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
