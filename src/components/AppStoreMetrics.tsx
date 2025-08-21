import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Download, Star, DollarSign } from "lucide-react";

export function AppStoreMetrics() {
  const metrics = [
    {
      title: "Total Downloads",
      value: "12,500",
      change: "+15%",
      icon: Download,
      trend: "up"
    },
    {
      title: "Active Users",
      value: "8,200",
      change: "+8%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      trend: "up"
    },
    {
      title: "Revenue",
      value: "$45,600",
      change: "+22%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  const storePerformance = [
    {
      store: "iOS App Store",
      downloads: 7500,
      rating: 4.9,
      revenue: 28000,
      color: "bg-blue-500"
    },
    {
      store: "Google Play",
      downloads: 5000,
      rating: 4.7,
      revenue: 17600,
      color: "bg-green-500"
    }
  ];

  const conversionFunnel = [
    { stage: "Store Visits", value: 50000, percentage: 100 },
    { stage: "Product Views", value: 25000, percentage: 50 },
    { stage: "Downloads", value: 12500, percentage: 25 },
    { stage: "Purchases", value: 2500, percentage: 5 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="mt-2">
                  <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Store Performance</CardTitle>
            <CardDescription>Downloads and revenue by platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {storePerformance.map((store, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{store.store}</span>
                  <Badge variant="outline">{store.rating}★</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Downloads: {store.downloads.toLocaleString()}</span>
                    <span>Revenue: ${store.revenue.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(store.downloads / 12500) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from discovery to purchase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{stage.stage}</span>
                  <span className="text-sm text-muted-foreground">
                    {stage.value.toLocaleString()} ({stage.percentage}%)
                  </span>
                </div>
                <Progress value={stage.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}