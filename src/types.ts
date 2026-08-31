export type Category = "cafe" | "cha" | "sobremesa";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  signature?: boolean;
  note?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
