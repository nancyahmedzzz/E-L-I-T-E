// Luxury Perfume Data
const products = [
    {
        id: 1,
        name: "Sauvage",
        brand: "Dior",
        price: 180,
        rating: 4.8,
        image: "https://www.sephora.com/productimages/sku/s1739317-main-zoom.jpg",
        description: "A radically fresh composition, raw and noble all at once. Inspired by wide-open spaces and an ozone blue sky spanning a rocky landscape."
    },
    {
        id: 2,
        name: "No. 5",
        brand: "Chanel",
        price: 250,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
        description: "The classic, legendary fragrance. A highly complex blend of aldehydes and florals - a timeless abstract bouquet."
    },
    {
        id: 3,
        name: "Black Opium",
        brand: "YSL",
        price: 150,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800",
        description: "A captivating floral gourmand scent, twisted with an overdose of black coffee, for a shot of adrenaline and absolute elegance."
    },
    {
        id: 4,
        name: "Black Orchid",
        brand: "Tom Ford",
        price: 215,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
        description: "A luxurious and sensual fragrance of rich, dark accords and an alluring potion of black orchids and spice."
    },
    {
        id: 5,
        name: "Baccarat Rouge 540",
        brand: "Maison Francis Kurkdjian",
        price: 325,
        rating: 5.0,
        image: "https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Luminous and sophisticated, it lays on the skin like an amber, floral, and woody breeze. A true poetic alchemy."
    },
    {
        id: 6,
        name: "Aventus",
        brand: "Creed",
        price: 495,
        rating: 4.8,
        image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Celebrating strength, vision and success, inspired by the dramatic life of war, peace, and romance."
    },
    {
        id: 7,
        name: "Oud Wood",
        brand: "Tom Ford",
        price: 295,
        rating: 4.8,
        image: "oud_wood.png",
        description: "Rare. Exotic. Distinctive. One of the most rare, precious, and expensive ingredients in a perfumer's arsenal."
    },
    {
        id: 8,
        name: "Gypsy Water",
        brand: "Byredo",
        price: 205,
        rating: 4.7,
        image: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "An ode to the beauty of Romani culture, its unique customs, intimate beliefs and distinguished way of living."
    },
    {
        id: 9,
        name: "Santal 33",
        brand: "Le Labo",
        price: 320,
        rating: 4.9,
        image: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "A perfume that touches the sensual universality of this icon... that would intoxicate a man as much as a woman."
    }
];

// App State
let cart = [];
let wishlist = new Set();
let activeFilter = 'all';

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if(!moonIcon || !sunIcon) return;
    if (theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

// Custom Cursor
const cursor = document.getElementById('cursor');
if (cursor) {
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const hoverTargets = document.querySelectorAll('.hover-target, button, a, input');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 1000);
        executeObservers();
    }, 1800);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Search Drawer Logic
const searchToggle = document.getElementById('search-toggle');
const searchDrawer = document.getElementById('search-drawer');
const closeSearch = document.getElementById('close-search');
const liveSearchInput = document.getElementById('live-search');

searchToggle.addEventListener('click', () => {
    searchDrawer.classList.toggle('active');
    if (searchDrawer.classList.contains('active')) liveSearchInput.focus();
});
closeSearch.addEventListener('click', () => searchDrawer.classList.remove('active'));

liveSearchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    renderGrid(term, activeFilter);
});

// Cart Drawer & Modals Global Variables
const overlay = document.getElementById('overlay');
const cartDrawer = document.getElementById('cart-drawer');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

const fsModal = document.getElementById('fs-modal');
const closeFsBtn = document.getElementById('close-modal');

// Drawer Interactions
function toggleCart() {
    cartDrawer.classList.toggle('active');
    overlay.classList.toggle('active');
}
cartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
overlay.addEventListener('click', () => {
    cartDrawer.classList.remove('active');
    overlay.classList.remove('active');
});

// Render Grid
const productGrid = document.getElementById('product-grid');
const noProductsMsg = document.getElementById('no-products');

function renderGrid(searchTerm = "", filterBrand = "all") {
    productGrid.innerHTML = '';
    
    let filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.brand.toLowerCase().includes(searchTerm);
        const matchesBrand = filterBrand === 'all' || p.brand.includes(filterBrand);
        return matchesSearch && matchesBrand;
    });

    if (filtered.length === 0) {
        noProductsMsg.style.display = 'block';
    } else {
        noProductsMsg.style.display = 'none';
        filtered.forEach((product, index) => {
            const itemRender = document.createElement('div');
            itemRender.className = `product-item`;
            
            // Add slight delay to staggered animation
            setTimeout(() => itemRender.classList.add('visible'), index * 150);

            itemRender.innerHTML = `
                <div class="p-img-box">
                    <img src="${product.image}" loading="lazy" alt="${product.name}">
                    <div class="p-overlay">
                        <button class="quick-view-trigger hover-target" data-id="${product.id}">Discover</button>
                    </div>
                </div>
                <div class="p-info">
                    <div>
                        <span class="p-brand">${product.brand}</span>
                        <h3 class="p-title">${product.name}</h3>
                        <p class="p-desc">${product.description}</p>
                    </div>
                    <div class="p-price">$${product.price}</div>
                </div>
            `;
            productGrid.appendChild(itemRender);
        });

        attachDynamicEvents();
    }
}

// Attach Events (Filters & Dynamic Buttons)
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        activeFilter = e.target.dataset.filter;
        renderGrid(liveSearchInput.value.toLowerCase(), activeFilter);
    });
});

function attachDynamicEvents() {
    document.querySelectorAll('.quick-view-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openQuickView(parseInt(e.target.dataset.id));
        });
    });

    // 3D Tilt Effect for cards
    document.querySelectorAll('.product-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Quick View Modal
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalBrand = document.getElementById('modal-brand');
const modalRating = document.getElementById('modal-rating');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const modalAdd = document.getElementById('modal-add');
const modalWishlist = document.getElementById('modal-wishlist');

function openQuickView(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    modalImg.src = p.image;
    modalName.innerText = p.name;
    modalBrand.innerText = p.brand;
    modalRating.innerText = '★'.repeat(Math.round(p.rating));
    modalDesc.innerText = p.description;
    modalPrice.innerText = `$${p.price}`;
    
    modalAdd.dataset.id = p.id;
    modalWishlist.dataset.id = p.id;
    
    if (wishlist.has(p.id)) modalWishlist.classList.add('active');
    else modalWishlist.classList.remove('active');

    fsModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent bg scroll
}

closeFsBtn.addEventListener('click', () => {
    fsModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cart & Wishlist Logic
modalAdd.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
    e.target.innerText = 'Added';
    setTimeout(() => { e.target.innerText = 'Add to Cart'; fsModal.classList.remove('active'); document.body.style.overflow='auto'; toggleCart(); }, 600);
});

modalWishlist.addEventListener('click', (e) => {
    const id = parseInt(e.currentTarget.dataset.id);
    if (wishlist.has(id)) {
        wishlist.delete(id);
        e.currentTarget.classList.remove('active');
    } else {
        wishlist.add(id);
        e.currentTarget.classList.add('active');
    }
    document.getElementById('wishlist-count').innerText = wishlist.size;
});

function addToCart(id) {
    const p = products.find(prod => prod.id === id);
    const exist = cart.find(item => item.id === id);
    if (exist) exist.quantity++;
    else cart.push({ ...p, quantity: 1 });
    updateCartUI();
}

function updateCartUI() {
    const tItems = cart.reduce((sum, i) => sum + i.quantity, 0);
    cartCount.innerText = tItems;
    
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color:#6A605B;font-style:italic;">Your selection is empty.</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'c-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="c-img">
                <div class="c-info">
                    <div class="c-title">${item.name}</div>
                    <div class="p-brand" style="font-size:0.6rem;">${item.brand}</div>
                    <div class="c-price">$${item.price} x ${item.quantity}</div>
                    <button class="c-remove hover-target" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
        
        document.querySelectorAll('.c-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                cart = cart.filter(i => i.id !== parseInt(e.target.dataset.id));
                updateCartUI();
            });
        });
    }
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Intersection Observer for Scroll Reveals
function executeObservers() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => observer.observe(el));
}

// Initialize
renderGrid();

// Carousel Navigation
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        const item = productGrid.querySelector('.product-item');
        const scrollAmount = item ? (item.offsetWidth + 20) * 2 : 300;
        productGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        const item = productGrid.querySelector('.product-item');
        const scrollAmount = item ? (item.offsetWidth + 20) * 2 : 300;
        productGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Background Canvas Animation
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        particles = [];
        const numParticles = Math.floor(width / 15);
        for(let i=0; i<numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5 - 0.2, // Move slightly upward
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        
        // Match particle color to theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if(p.x < 0) p.x = width;
            if(p.x > width) p.x = 0;
            if(p.y < 0) p.y = height;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? `rgba(200, 171, 136, ${p.alpha})` : `rgba(106, 96, 91, ${p.alpha})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateCanvas);
    }
    
    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateCanvas();
}
