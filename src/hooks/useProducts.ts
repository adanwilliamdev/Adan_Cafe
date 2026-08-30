import { useEffect, useState } from 'react'
import type { Product } from '../types'

interface UseProductsResult {
  products: Product[]
  loading: boolean
  error: string | null
}

/**
 * Busca o catálogo de produtos a partir de um "endpoint" mock (products.json),
 * simulando uma chamada de API real com estados de loading/error.
 */
export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/products.json', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Falha ao carregar o menu (status ${response.status})`)
        }

        const data = (await response.json()) as Product[]
        setProducts(data)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(
          err instanceof Error ? err.message : 'Não foi possível carregar o menu agora.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    return () => controller.abort()
  }, [])

  return { products, loading, error }
}
