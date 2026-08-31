import type { Product } from "../types";

export const products: Product[] = [
  // Café
  {
    id: "cafe-espresso",
    name: "Espresso duplo",
    description: "Blend de torra média, notas de caramelo e castanha.",
    price: 8,
    category: "cafe",
  },
  {
    id: "cafe-coado",
    name: "Coado V60",
    description: "Café de origem única, preparo lento, filtrado na hora.",
    price: 12,
    category: "cafe",
    signature: true,
    note: "Escolha do dia",
  },
  {
    id: "cafe-cappuccino",
    name: "Cappuccino",
    description: "Espresso, leite vaporizado e uma camada firme de espuma.",
    price: 11,
    category: "cafe",
  },
  {
    id: "cafe-gelado",
    name: "Cold brew",
    description: "Extração a frio por 16 horas, servido sobre gelo.",
    price: 13,
    category: "cafe",
  },
  {
    id: "cafe-mocha",
    name: "Mocha",
    description: "Espresso, chocolate meio amargo e leite vaporizado.",
    price: 13,
    category: "cafe",
  },

  // Chá
  {
    id: "cha-verde",
    name: "Chá verde sencha",
    description: "Folhas japonesas, infusão curta, sabor herbáceo e leve.",
    price: 9,
    category: "cha",
  },
  {
    id: "cha-camomila",
    name: "Camomila com mel",
    description: "Flores secas, infusão de 5 minutos, adoçado com mel silvestre.",
    price: 8,
    category: "cha",
  },
  {
    id: "cha-chai",
    name: "Chai latte",
    description: "Especiarias tostadas na hora, leite vaporizado.",
    price: 12,
    category: "cha",
    signature: true,
    note: "Especiarias moídas na hora",
  },
  {
    id: "cha-mate",
    name: "Mate gelado",
    description: "Erva-mate tostada, limão siciliano e hortelã fresca.",
    price: 10,
    category: "cha",
  },

  // Sobremesas
  {
    id: "sobremesa-bolo-cenoura",
    name: "Bolo de cenoura",
    description: "Cobertura de chocolate meio amargo, fatia generosa.",
    price: 14,
    category: "sobremesa",
  },
  {
    id: "sobremesa-cheesecake",
    name: "Cheesecake de frutas vermelhas",
    description: "Base amanteigada, calda de frutas vermelhas frescas.",
    price: 18,
    category: "sobremesa",
    signature: true,
    note: "Feito na casa",
  },
  {
    id: "sobremesa-brownie",
    name: "Brownie de chocolate",
    description: "Textura densa, nozes tostadas, servido morno.",
    price: 12,
    category: "sobremesa",
  },
  {
    id: "sobremesa-pao-de-mel",
    name: "Pão de mel",
    description: "Especiarias, cobertura de chocolate ao leite.",
    price: 9,
    category: "sobremesa",
  },
  {
    id: "sobremesa-torta-limao",
    name: "Torta de limão",
    description: "Massa amanteigada, creme de limão siciliano, merengue maçaricado.",
    price: 16,
    category: "sobremesa",
  },
];

export const categoryLabels: Record<Product["category"], string> = {
  cafe: "Café",
  cha: "Chá",
  sobremesa: "Sobremesas",
};
