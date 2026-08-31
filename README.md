# Adan Café

Site de uma cafeteria fictícia, feito com React + Vite + TypeScript.

## Rodando o projeto

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Estrutura

- `src/App.tsx` — junta as seções e guarda o estado da sacola de compras.
- `src/components/Header.tsx` — cabeçalho fixo com navegação e ícone da sacola.
- `src/components/Hero.tsx` — abertura da página.
- `src/components/About.tsx` — seção "Sobre a casa".
- `src/components/Shop.tsx` — a loja, com abas para Café, Chá e Sobremesas.
- `src/components/ProductCard.tsx` — cartão de cada produto.
- `src/components/Cart.tsx` — sacola lateral com quantidade e total.
- `src/components/Footer.tsx` — rodapé com horário e contato.
- `src/data/products.ts` — lista de produtos (edite aqui para adicionar/remover itens).

## Personalizando

- Para adicionar um produto novo, edite `src/data/products.ts` seguindo o
  mesmo formato dos itens existentes.
- As cores e fontes ficam em `src/index.css`, nas variáveis no topo do
  arquivo (`--bg`, `--accent`, `--font-display`, etc).
