import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ProductCard } from '../../src/components/ProductCard/ProductCard'
import type { Product } from '../../src/types'

const product: Product = {
  id: 'c1',
  name: 'Espresso Cremoso',
  description: 'Café encorpado com creme aveludado.',
  price: 12.9,
  icon: '☕',
  category: 'coffees',
}

describe('ProductCard', () => {
  it('renderiza nome, descrição e preço formatado', () => {
    render(<ProductCard product={product} onAdd={() => {}} />)

    expect(screen.getByText('Espresso Cremoso')).toBeInTheDocument()
    expect(screen.getByText(/Café encorpado/)).toBeInTheDocument()
    expect(screen.getByText(/R\$\s*12,90/)).toBeInTheDocument()
  })

  it('chama onAdd com o produto ao clicar no botão de adicionar', async () => {
    const onAdd = vi.fn()
    const user = userEvent.setup()
    render(<ProductCard product={product} onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: /adicionar espresso cremoso/i }))

    expect(onAdd).toHaveBeenCalledWith(product)
  })
})
