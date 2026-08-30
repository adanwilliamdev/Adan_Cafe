import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { ToastProvider } from './components/Toast/ToastProvider.tsx'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  </StrictMode>
)
