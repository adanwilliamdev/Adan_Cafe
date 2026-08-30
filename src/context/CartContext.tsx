import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] }
    }
    case 'INCREMENT': {
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }
    }
    case 'DECREMENT': {
      return {
        items: state.items
          .map((item) =>
            item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      }
    }
    case 'REMOVE_ITEM': {
      return { items: state.items.filter((item) => item.id !== action.id) }
    }
    case 'CLEAR': {
      return { items: [] }
    }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product) => void
  incrementItem: (id: string) => void
  decrementItem: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    return {
      items: state.items,
      totalItems,
      totalPrice,
      addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
      incrementItem: (id) => dispatch({ type: 'INCREMENT', id }),
      decrementItem: (id) => dispatch({ type: 'DECREMENT', id }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { cartReducer }
export type { CartState, CartAction }
