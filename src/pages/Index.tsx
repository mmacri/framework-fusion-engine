
import { MainApp } from "@/components/MainApp";

const Index = () => {
  console.log('Index page rendering');
  console.log('Current location:', window.location.href);
  
  try {
    return (
      <div className="min-h-screen w-full bg-background">
        <MainApp />
      </div>
    );
  } catch (error) {
    console.error('Error in Index page:', error);
    return (
      <div style={{ padding: '20px', color: 'red', fontFamily: 'Arial' }}>
        <h1>Page Load Error</h1>
        <p>Failed to load the main application: {(error as Error).message}</p>
        <p>Please refresh the page and try again.</p>
      </div>
    );
  }
};

export default Index;
