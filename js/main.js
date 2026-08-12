// ============================================
// MAIN APPLICATION
// ============================================

// --- State ---
let cart = [];
let currentCategory = 'coffees';

// --- DOM Elements ---
const menuGrid = document.getElementById('menuGrid');
const tabs = document.getElementById('tabs');
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const toastContainer = document.getElementById('toastContainer');
const themeToggle = document.getElementById('themeToggle');
const header = document.getElementById('header');
const typedElement = document.getElementById('typedText');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// --- Typing Animation ---
const phrases = [
    'Café <span class="highlight">Especial</span>',
    'Chá <span class="highlight">Artesanal</span>',
    'Doce <span class="highlight">Fino</span>'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
    const current = phrases[phraseIndex];
    const isComplete = !isDeleting && charIndex === current.length;
    const isDeleted = isDeleting && charIndex === 0;

    if (isComplete) {
        setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, 3000);
        return;
    }

    if (isDeleted) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        setTimeout(typeEffect, 500);
        return;
    }

    const display = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

    typedElement.innerHTML = display;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    const speed = isDeleting ? 50 : 100;
    typingTimeout = setTimeout(typeEffect, speed);
}

// Start typing animation
setTimeout(typeEffect, 1000);

// --- Theme Toggle ---
function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Initialize theme
setTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// --- Header scroll effect ---
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
        header.style.boxShadow = '0 4px 20px var(--color-shadow)';
    } else {
        header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

// --- Mobile Menu ---
let mobileMenuOpen = false;
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    nav.style.display = mobileMenuOpen ? 'flex' : 'none';
    if (mobileMenuOpen) {
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'var(--glass-bg)';
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.padding = 'var(--spacing-md)';
        nav.style.borderBottom = '1px solid var(--glass-border)';
        nav.style.flexDirection = 'column';
        nav.style.alignItems = 'center';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuOpen = false;
        nav.style.display = '';
    });
});

// --- Render Products ---
function renderProducts(category) {
    const items = products[category];
    if (!items) return;

    menuGrid.innerHTML = items.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.05}s">
            <div class="product-card__icon">${product.icon}</div>
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__footer">
                <span class="product-card__price">R$ ${product.price.toFixed(2)}</span>
                <button class="product-card__add" data-id="${product.id}" aria-label="Adicionar ${product.name}">
                    <span>+</span>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners to add buttons
    document.querySelectorAll('.product-card__add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.dataset.id;
            addToCart(id);
            createRipple(e);
        });
    });
}

// --- Ripple Effect ---
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// --- Tabs ---
function setupTabs() {
    const tabButtons = tabs.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts(currentCategory);

            // Smooth scroll to menu
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// --- Cart Functions ---
function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showToast(`Item adicionado! ${product.icon} ${product.name}`);
    playPingSound();
}

function removeFromCart(productId) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(i => i.id !== productId);
    }

    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartUI() {
    const count = getCartItemCount();
    cartCount.textContent = count;
    cartCount.classList.add('pop');
    setTimeout(() => cartCount.classList.remove('pop'), 300);

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart__empty">Seu carrinho está vazio <br/> ☕ Adicione seus favoritos!</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span class="cart-item__icon">${item.icon}</span>
                <div class="cart-item__info">
                    <div class="cart-item__name">${item.name}</div>
                    <div class="cart-item__price">R$ ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item__controls">
                    <button onclick="removeFromCart('${item.id}')" aria-label="Remover um item">−</button>
                    <span class="cart-item__qty">${item.quantity}</span>
                    <button onclick="addToCart('${item.id}')" aria-label="Adicionar mais um item">+</button>
                </div>
            </div>
        `).join('');
    }

    // Update total
    cartTotal.textContent = `R$ ${getCartTotal().toFixed(2)}`;
}

// --- Cart Sidebar ---
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Close cart with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});

// --- Checkout ---
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio! ☕');
        return;
    }

    const total = getCartTotal();
    const itemCount = getCartItemCount();
    showToast(`✅ Pedido finalizado! ${itemCount} item(s) - Total: R$ ${total.toFixed(2)}`);

    // Clear cart
    cart = [];
    updateCartUI();
    closeCart();
    playCheckoutSound();
});

// --- Toast System ---
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Sound Effects using Web Audio API ---
function playPingSound() {
    try {
        const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.value = 880;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
        // Silently fail if AudioContext is not available
    }
}

function playCheckoutSound() {
    try {
        const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

        // Play a pleasant chord
        const notes = [523.25, 659.25, 783.99]; // C, E, G
        notes.forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = freq;
            osc.type = 'sine';
            const startTime = audioCtx.currentTime + i * 0.1;
            gain.gain.setValueAtTime(0.12, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
            osc.start(startTime);
            osc.stop(startTime + 0.3);
        });
    } catch (e) {
        // Silently fail
    }
}

// --- Smooth Scroll for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// --- Nav link active state on scroll ---
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// --- Initialize ---
renderProducts('coffees');
setupTabs();

// --- Responsive: Fix menu display on resize ---
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenuOpen) {
        mobileMenuOpen = false;
        nav.style.display = '';
        nav.style.position = '';
        nav.style.top = '';
        nav.style.left = '';
        nav.style.right = '';
        nav.style.background = '';
        nav.style.backdropFilter = '';
        nav.style.padding = '';
        nav.style.borderBottom = '';
        nav.style.flexDirection = '';
        nav.style.alignItems = '';
    }
});

console.log('☕ Adan Café loaded successfully!');
