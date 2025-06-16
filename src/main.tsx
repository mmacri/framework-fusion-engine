
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loading...');
console.log('Environment variables:', {
  MODE: import.meta.env.MODE,
  PROD: import.meta.env.PROD,
  BASE_URL: import.meta.env.BASE_URL
});

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
} else {
  console.log('Root element found, creating React root...');
  createRoot(rootElement).render(<App />);
}
