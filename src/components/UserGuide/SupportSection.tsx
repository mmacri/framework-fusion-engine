import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Network } from "lucide-react";

export function SupportSection() {
  return (
    <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <Shield className="h-12 w-12 text-green-600 mx-auto" />
          <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Framework Fusion provides everything you need for comprehensive compliance management. 
            Start with the Master Framework to understand control relationships, then use assessments 
            and reporting to maintain your compliance posture.
          </p>
          <div className="flex gap-3 justify-center">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowRight className="h-4 w-4 mr-2" />
              Start with Master Framework
            </Button>
            <Button variant="outline">
              <Network className="h-4 w-4 mr-2" />
              View Control Mappings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}