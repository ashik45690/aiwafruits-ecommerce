import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './components/context/Authcontext'
import { CartProvider } from './components/context/Cartcontext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
    <App />
    </CartProvider>
    </AuthProvider>
    
  </StrictMode>,
)
