// ============================================
// DATA - Products
// ============================================

const products = {
    coffees: [
        {
            id: 'c1',
            name: 'Espresso Cremoso',
            description: 'Café encorpado com creme aveludado e notas de chocolate amargo.',
            price: 12.90,
            icon: '☕'
        },
        {
            id: 'c2',
            name: 'Cappuccino Clássico',
            description: 'Espresso com espuma de leite cremosa e um toque de canela.',
            price: 15.90,
            icon: '☕'
        },
        {
            id: 'c3',
            name: 'Latte Art',
            description: 'Café suave com leite vaporizado e arte exclusiva no topo.',
            price: 17.90,
            icon: '🎨'
        },
        {
            id: 'c4',
            name: 'Mocha Especial',
            description: 'Café com calda de chocolate belga e chantilly caseiro.',
            price: 19.90,
            icon: '🍫'
        },
        {
            id: 'c5',
            name: 'Cold Brew',
            description: 'Extração a frio por 12h com notas frutadas e refrescantes.',
            price: 16.90,
            icon: '🧊'
        },
        {
            id: 'c6',
            name: 'Affogato',
            description: 'Espresso quente sobre sorvete de baunilha artesanal.',
            price: 22.90,
            icon: '🍦'
        }
    ],
    teas: [
        {
            id: 't1',
            name: 'Chá de Camomila',
            description: 'Flores de camomila orgânica com mel e limão siciliano.',
            price: 11.90,
            icon: '🌼'
        },
        {
            id: 't2',
            name: 'Matcha Latte',
            description: 'Chá verde matcha premium com leite vaporizado e espuma.',
            price: 18.90,
            icon: '🍵'
        },
        {
            id: 't3',
            name: 'Hibisco com Gengibre',
            description: 'Refrescante e termogênico com um toque picante.',
            price: 13.90,
            icon: '🌸'
        },
        {
            id: 't4',
            name: 'Chai Masala',
            description: 'Chá preto com especiarias indianas e leite cremoso.',
            price: 16.90,
            icon: '🌶️'
        },
        {
            id: 't5',
            name: 'Jasmim Flor',
            description: 'Chá verde perfumado com flores de jasmim orgânico.',
            price: 14.90,
            icon: '🌺'
        }
    ],
    sweets: [
        {
            id: 's1',
            name: 'Torta de Limão',
            description: 'Massa crocante com recheio cítrico e merengue italiano.',
            price: 18.90,
            icon: '🥧'
        },
        {
            id: 's2',
            name: 'Brownie Premium',
            description: 'Brownie de chocolate belga com nozes e calda quente.',
            price: 16.90,
            icon: '🍫'
        },
        {
            id: 's3',
            name: 'Macarons Franceses',
            description: '3 unidades de macarons com recheios variados (pistache, framboesa, chocolate).',
            price: 24.90,
            icon: '🍬'
        },
        {
            id: 's4',
            name: 'Petit Gateau',
            description: 'Bolo de chocolate com coração derretido e sorvete de creme.',
            price: 26.90,
            icon: '🍰'
        },
        {
            id: 's5',
            name: 'Tartelette de Frutas',
            description: 'Massa amanteigada com creme de baunilha e frutas frescas.',
            price: 22.90,
            icon: '🍓'
        }
    ]
};

// Helper to get all products
function getAllProducts() {
    return {
        ...products.coffees,
        ...products.teas,
        ...products.sweets
    };
}

// Helper to get product by ID
function getProductById(id) {
    const all = {
        ...products.coffees,
        ...products.teas,
        ...products.sweets
    };
    return all[id];
}
