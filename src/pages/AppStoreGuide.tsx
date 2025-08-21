import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppStoreProcess } from "@/components/AppStoreProcess";
import { CapacitorQuickStart } from "@/components/CapacitorQuickStart";
import { AppStoreSubmission } from "@/components/AppStoreSubmission";
import { AppStoreOptimization } from "@/components/AppStoreOptimization";
import { Smartphone, Zap, Upload, TrendingUp } from "lucide-react";

export default function AppStoreGuide() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">App Store Distribution</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete guide to get your React app published on iOS App Store and Google Play Store
          </p>
        </div>

        <Tabs defaultValue="process" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="process" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Process
            </TabsTrigger>
            <TabsTrigger value="quickstart" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Quick Start
            </TabsTrigger>
            <TabsTrigger value="submission" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Submission
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Optimization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="mt-6">
            <AppStoreProcess />
          </TabsContent>

          <TabsContent value="quickstart" className="mt-6">
            <CapacitorQuickStart />
          </TabsContent>

          <TabsContent value="submission" className="mt-6">
            <AppStoreSubmission />
          </TabsContent>

          <TabsContent value="optimization" className="mt-6">
            <AppStoreOptimization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}