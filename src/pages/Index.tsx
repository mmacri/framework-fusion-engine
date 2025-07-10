
import { MainApp } from "@/components/MainApp";

const Index = () => {
  console.log('Index page rendering');
  console.log('Current location:', window.location.href);
  
  return (
    <div className="min-h-screen w-full bg-background">
      <MainApp />
    </div>
  );
};

export default Index;
