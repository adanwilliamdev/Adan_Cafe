export type Category = 'coffees' | 'teas' | 'sweets'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  icon: string
  category: Category
}

export interface CartItem extends Product {
  quantity: number
}

export interface ProductsByCategory {
  coffees: Product[]
  teas: Product[]
  sweets: Product[]
}
