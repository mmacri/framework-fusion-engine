
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  console.log('Index page rendering');
  console.log('Current location:', window.location.href);
  
  return (
    <div className="min-h-screen w-full bg-background">
      <Dashboard />
    </div>
  );
};

export default Index;
