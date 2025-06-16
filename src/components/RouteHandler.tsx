
import { useEffect } from "react";

interface RouteHandlerProps {
  onViewChange: (view: string) => void;
  onFrameworkChange?: (framework: string) => void;
}

export function RouteHandler({ onViewChange, onFrameworkChange }: RouteHandlerProps) {
  useEffect(() => {
    // Check localStorage for initial view
    const savedView = localStorage.getItem('ffView');
    const savedFramework = localStorage.getItem('ffFramework');
    
    if (savedView) {
      console.log('Setting initial view from localStorage:', savedView);
      onViewChange(savedView);
      localStorage.removeItem('ffView'); // Clean up after use
    }
    
    if (savedFramework && onFrameworkChange) {
      console.log('Setting initial framework from localStorage:', savedFramework);
      onFrameworkChange(savedFramework);
      localStorage.removeItem('ffFramework'); // Clean up after use
    }
  }, [onViewChange, onFrameworkChange]);

  return null; // This component doesn't render anything
}
