import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PropertyContextProvider from './context/propertyContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <PropertyContextProvider>
    <App />
  </PropertyContextProvider>,
)
