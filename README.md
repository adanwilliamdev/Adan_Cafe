# ☕ Adan Café

[![Vercel](https://img.shields.io/badge/deploy-Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)](https://adan-cafe-zhuw.vercel.app/)
[![GitHub](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

> ☕ Um menu digital moderno e elegante para uma cafeteria specialty, desenvolvido com foco em experiência do usuário, responsividade e interações fluidas.

## 🌐 Demonstração

**Projeto online:**
👉 [adan-cafe-zhuw.vercel.app](https://adan-cafe-zhuw.vercel.app/)

## ✨ Funcionalidades

### 🎨 Design & Experiência

* 🪟 **Glassmorphism** nos cards e carrinho
* 🌙 **Tema Claro/Escuro** com persistência no navegador
* ✨ **Micro-interações** e animações fluidas
* 🔤 **Tipografia elegante** com Inter + Playfair Display
* 📱 **Design responsivo** para desktop, tablet e mobile
* 🎯 Interface focada em simplicidade e experiência do usuário

### 🛒 Menu e Carrinho

* ☕ **Cafés Especiais**
* 🍵 **Chás Artesanais**
* 🍰 **Doces Finos**
* 🃏 Cards interativos para cada produto
* ➕ Adição rápida de produtos ao carrinho
* 💧 Efeito **Ripple** nos botões
* 🛒 Carrinho lateral com resumo dos pedidos
* 🔔 Notificações Toast para ações do usuário
* 🔢 Contador dinâmico de itens

### 🔊 Recursos Técnicos

* 🎵 **Web Audio API** para sons de interação
* 📜 **Smooth Scroll** para navegação entre seções
* 💾 **LocalStorage** para persistência do tema
* ⚡ JavaScript Vanilla sem frameworks pesados
* ♿ HTML semântico visando acessibilidade
* 🔍 Estrutura preparada para boas práticas de SEO

## 🛠️ Tecnologias

### Frontend

| Tecnologia        | Utilização                         |
| ----------------- | ---------------------------------- |
| **HTML5**         | Estrutura semântica                |
| **CSS3**          | Layout, animações e responsividade |
| **JavaScript**    | Lógica e interações                |
| **Web Audio API** | Sons das interações                |
| **LocalStorage**  | Persistência do tema               |

### Bibliotecas & Recursos

* **[Google Fonts](https://fonts.google.com/)**
  Inter + Playfair Display

* **[Font Awesome](https://fontawesome.com/)**
  Ícones da interface

* **[Web Audio API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Audio_API)**
  Sons sintéticos para interações

### Deploy

* **[Vercel](https://vercel.com/)** - Hospedagem e deploy contínuo

## 📂 Estrutura do Projeto

```text
AdanCafe/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── main.js
├── assets/
│   ├── icons/
│   └── images/
├── LICENSE
└── README.md
```

## 🚀 Executando Localmente

### Pré-requisitos

* Navegador moderno
* VS Code ou outro editor
* Extensão **Live Server** recomendada

### 1. Clone o projeto

```bash
git clone https://github.com/adanwilliamdev/adan-cafe.git
```

### 2. Entre no diretório

```bash
cd adan-cafe
```

### 3. Abra no VS Code

```bash
code .
```

### 4. Execute

Abra o arquivo `index.html` utilizando o **Live Server**.

Também é possível abrir o `index.html` diretamente no navegador.

## 📱 Responsividade

| Dispositivo |       Breakpoint | Layout            |
| ----------- | ---------------: | ----------------- |
| 🖥️ Desktop |       `> 1024px` | Grid completo     |
| 💻 Tablet   | `768px - 1024px` | Grid de 2 colunas |
| 📱 Mobile   |        `< 768px` | Coluna única      |

## 🎨 Paleta de Cores

| Cor               | Hexadecimal | Aplicação             |
| ----------------- | ----------- | --------------------- |
| ☕ Café            | `#6F4E37`   | Cor principal         |
| 🟤 Café Claro     | `#8B6B4F`   | Elementos secundários |
| 🍮 Caramelo       | `#C8956C`   | Destaques e badges    |
| 🟫 Caramelo Claro | `#DDB892`   | Hover e bordas        |
| 🤍 Off-white      | `#FAF8F5`   | Fundo claro           |
| 🖤 Marrom Escuro  | `#2C1810`   | Textos                |

## 🔧 Personalização

### ➕ Adicionando Produtos

Os produtos podem ser adicionados ou alterados no arquivo:

```text
js/data.js
```

Exemplo:

```javascript
{
    id: 'c7',
    name: 'Nome do Produto',
    description: 'Descrição curta do produto',
    price: 19.90,
    icon: '☕'
}
```

### 🎨 Alterando as Cores

As principais cores da aplicação estão definidas no arquivo:

```text
css/style.css
```

Exemplo:

```css
:root {
    --color-primary: #6F4E37;
    --color-secondary: #C8956C;
}
```

O tema escuro utiliza:

```css
[data-theme="dark"]
```

## ⚡ Performance

O projeto foi desenvolvido buscando manter uma aplicação leve e rápida:

* ⚡ JavaScript Vanilla
* 📦 Sem frameworks pesados
* 🚀 Carregamento rápido
* 🪶 Código enxuto
* 🔤 Google Fonts com `display: swap`
* 💾 Persistência local sem necessidade de backend

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Faça um Fork do projeto
2. Crie uma nova branch:

```bash
git checkout -b feature/nova-funcionalidade
```

3. Faça suas alterações
4. Commit:

```bash
git commit -m "Adiciona nova funcionalidade"
```

5. Envie para o GitHub:

```bash
git push origin feature/nova-funcionalidade
```

6. Abra um Pull Request

## 📄 Licença

Este projeto está disponível sob a licença **MIT**.

Consulte o arquivo [LICENSE](LICENSE) para mais informações.

## 👤 Autor

### Adan William

**Java Full Stack Developer in Progress | Analyst of TI | ADS Student**

* 💻 GitHub: [@adanwilliamdev](https://github.com/adanwilliamdev)
* ☕ Projeto: [Adan Café](https://adan-cafe-zhuw.vercel.app/)

## 🙏 Agradecimentos

* ☕ Inspiração em cafeterias specialty
* 🎨 Design moderno e minimalista
* 🔤 [Google Fonts](https://fonts.google.com/)
* 🎯 [Font Awesome](https://fontawesome.com/)
* ▲ [Vercel](https://vercel.com/)

## 🌐 Links

| Recurso       | Link                                                            |
| ------------- | --------------------------------------------------------------- |
| ☕ **Demo**    | [adan-cafe-zhuw.vercel.app](https://adan-cafe-zhuw.vercel.app/) |
| 💻 **GitHub** | [adanwilliamdev](https://github.com/adanwilliamdev)             |
| ▲ **Vercel**  | [vercel.com](https://vercel.com/)                               |

---

⭐ **Gostou do projeto? Deixe uma estrela no GitHub!**

☕ *Adan Café. Código, café e boas ideias.*
