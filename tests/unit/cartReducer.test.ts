import { describe, expect, it } from 'vitest'
import { cartReducer, type CartState } from '../../src/context/CartContext'
import type { Product } from '../../src/types'

const product: Product = {
  id: 'c1',
  name: 'Espresso Cremoso',
  description: 'Café encorpado',
  price: 12.9,
  icon: '☕',
  category: 'coffees',
}

const emptyState: CartState = { items: [] }

describe('cartReducer', () => {
  it('adiciona um novo item ao carrinho vazio', () => {
    const state = cartReducer(emptyState, { type: 'ADD_ITEM', product })
    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toMatchObject({ id: 'c1', quantity: 1 })
  })

  it('incrementa a quantidade ao adicionar um item já existente', () => {
    const stateWithItem: CartState = { items: [{ ...product, quantity: 1 }] }
    const state = cartReducer(stateWithItem, { type: 'ADD_ITEM', product })
    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
  })

  it('decrementa e remove o item quando a quantidade chega a zero', () => {
    const stateWithItem: CartState = { items: [{ ...product, quantity: 1 }] }
    const state = cartReducer(stateWithItem, { type: 'DECREMENT', id: 'c1' })
    expect(state.items).toHaveLength(0)
  })

  it('remove um item explicitamente', () => {
    const stateWithItem: CartState = { items: [{ ...product, quantity: 3 }] }
    const state = cartReducer(stateWithItem, { type: 'REMOVE_ITEM', id: 'c1' })
    expect(state.items).toHaveLength(0)
  })

  it('limpa o carrinho', () => {
    const stateWithItem: CartState = { items: [{ ...product, quantity: 3 }] }
    const state = cartReducer(stateWithItem, { type: 'CLEAR' })
    expect(state.items).toHaveLength(0)
  })
})
