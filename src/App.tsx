import { useState } from 'react'
import { CartDrawer } from './components/Cart/CartDrawer'
import { CheckoutForm } from './components/CheckoutForm/CheckoutForm'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Menu } from './components/Menu/Menu'
import { useToast } from './components/Toast/ToastProvider'
import type { Product } from './types'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const { showToast } = useToast()

  function handleAddToCart(product: Product) {
    showToast(`Item adicionado! ${product.icon} ${product.name}`)
  }

  function handleCheckoutStart() {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  function handleCheckoutSuccess() {
    showToast('✅ Pedido finalizado com sucesso!')
  }

  return (
    <>
      <Header onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Menu onAddToCart={handleAddToCart} />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckoutStart}
      />
      <CheckoutForm
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  )
}

export default App
