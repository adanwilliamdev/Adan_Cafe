# ☕ Adan Café

Cafeteria especializada em experiências sensoriais únicas — cafés especiais, chás
artesanais e doces finos. Aplicação de e-commerce simples (catálogo + carrinho +
checkout) migrada de HTML/CSS/JS puro para uma stack de front-end moderna.

## Stack

| Camada         | Escolha                                             |
| -------------- | ---------------------------------------------------- |
| Build          | Vite                                                   |
| Linguagem      | TypeScript                                             |
| UI             | React 18/19 + componentes funcionais                   |
| Estado         | Context API + `useReducer` (carrinho centralizado)     |
| Estilo         | CSS Modules (reaproveitando as variáveis originais)    |
| Dados          | Mock via `fetch` a `public/products.json`              |
| Checkout       | React Hook Form + Zod                                  |
| Testes         | Vitest + Testing Library (unit/component) + Playwright (e2e) |
| Qualidade      | ESLint + Prettier + Husky (pre-commit)                 |
| CI/CD          | GitHub Actions (lint + test em PR) + deploy no Vercel   |
| Acessibilidade | Foco preso no modal do carrinho, navegação por teclado, contraste checado |
| Extra          | PWA leve (installable) via `vite-plugin-pwa`            |

## Como rodar

```bash
npm install
npm run dev
```

## Scripts disponíveis

```bash
npm run dev           # ambiente de desenvolvimento
npm run build          # build de produção (tsc + vite build)
npm run preview        # serve o build de produção localmente
npm run lint           # ESLint
npm run format          # Prettier (aplica formatação)
npm run format:check    # Prettier (apenas verifica)
npm run test             # testes unitários/componente (Vitest)
npm run test:watch       # Vitest em modo watch
npm run test:e2e         # testes end-to-end (Playwright)
```

Na primeira instalação, o Husky é configurado automaticamente (`prepare` script) e
passa a rodar lint + format nos arquivos staged antes de cada commit.

Para os testes e2e, é necessário baixar os browsers do Playwright uma vez:

```bash
npx playwright install --with-deps chromium
```

## Estrutura

```
src/
  components/    # um componente por pasta, com seu .module.css
  context/       # CartContext (Context API + useReducer)
  hooks/         # useProducts, useTheme, useFocusTrap
  types/         # Product, CartItem, Category
  styles/        # variáveis CSS globais (tema claro/escuro)
public/
  products.json  # catálogo mock, consumido via fetch
tests/
  unit/          # Vitest + Testing Library
  e2e/           # Playwright
```

## Acessibilidade

- Foco preso (focus trap) no drawer do carrinho e no modal de checkout, com
  fechamento via `Esc` e retorno do foco ao elemento que abriu o modal.
- Navegação completa por teclado nas abas do menu, botões e formulário.
- Contraste de cores mantido a partir da paleta original (temas claro/escuro).
- Animações respeitam `prefers-reduced-motion`.

## CI/CD

- `.github/workflows/ci.yml`: roda lint, checagem de tipos, testes unitários,
  build e testes e2e em todo PR/push para `main`.
- `.github/workflows/deploy.yml`: build e deploy automático no Vercel a cada
  push em `main`. Requer o secret `VERCEL_TOKEN` (e, dependendo da conta,
  `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` via `vercel link` local antes do primeiro
  deploy) configurado no repositório.

## PWA

O app é instalável (manifest + service worker via `vite-plugin-pwa`, modo
`autoUpdate`). Para gerar ícones definitivos, substitua os placeholders
referenciados em `vite.config.ts` (`pwa-192x192.png`, `pwa-512x512.png`) em
`public/`.
