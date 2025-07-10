
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error boundary for debugging
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  console.error('Error message:', e.message);
  console.error('Error stack:', e.error?.stack);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

console.log('Main.tsx loading...');
console.log('Environment variables:', {
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
  // Create a fallback div to show error
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;">Error: Root element not found. Please refresh the page.</div>';
} else {
  console.log('Root element found, creating React root...');
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('React app rendered successfully');
  } catch (error) {
    console.error('Failed to render React app:', error);
    rootElement.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;">Error loading application: ' + (error as Error).message + '</div>';
  }
}
