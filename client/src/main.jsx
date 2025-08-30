
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VehicleProvider } from "./context/VehicleContext";
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
   
    <BrowserRouter>
      <VehicleProvider>  
        <App />
      </VehicleProvider>
    </BrowserRouter>
 
)
