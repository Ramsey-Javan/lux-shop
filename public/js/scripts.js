// Initialize Particles.js background
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#d4af37"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#d4af37",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

particlesJS.load('particles-js', 'js/particles.json', function() {
    console.log('Particles.js loaded successfully');
});

// Dark/Light Mode Toggle
const modeToggle = document.getElementById('modeToggle');
if (modeToggle) {
    const body = document.body;
    const modeIcon = modeToggle.querySelector('i');
    
    // Check for saved theme preference or respect OS preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        modeIcon.classList.remove('fa-moon');
        modeIcon.classList.add('fa-sun');
    }
    
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
        }
    });
}

// Scroll Animations
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
if (animateOnScrollElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
}

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
if (slides.length > 0) {
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
}

// Filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Add a visual effect to show filtering
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.style.opacity = '0.5';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 300);
            });
        });
    });
}

// Floating animation for elements
const floatingElements = document.querySelectorAll('.floating');
if (floatingElements.length > 0) {
    floatingElements.forEach(el => {
        // Randomize animation duration and delay for natural effect
        const duration = 6 + Math.random() * 4;
        const delay = Math.random() * 2;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
    });
}

// Button effects
const buttons = document.querySelectorAll('.btn');
if (buttons.length > 0) {
    // Add hover effects to buttons
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);
            
            setTimeout(() => {
                if (ripples.parentNode === this) {
                    this.removeChild(ripples);
                }
            }, 1000);
        });
    });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered: ', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed: ', error);
            });
    });
}

// Shopping Cart
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
const cartIcon = document.querySelector('.fa-shopping-bag')?.closest('a');

if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'checkout.html';
    });
    
    updateCartCount();
}

function addToCart(item) {
    cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${item.name} added to cart`);
}

function updateCartCount() {
    if (!cartIcon) return;
    
    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartCount.textContent = cart.length;
    
    // Remove existing count if present
    const existingCount = cartIcon.querySelector('.cart-count');
    if (existingCount) existingCount.remove();
    
    if (cart.length > 0) {
        cartIcon.appendChild(cartCount);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode === document.body) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Initialize cart functionality
document.querySelectorAll('.btn-primary').forEach(button => {
    if (button.textContent.includes('Add to Cart')) {
        button.addEventListener('click', function() {
            const itemCard = this.closest('.gallery-item-back');
            if (!itemCard) return;
            
            const item = {
                name: itemCard.querySelector('.item-title').textContent,
                price: parseFloat(itemCard.querySelector('.item-price').textContent.replace('$', '').replace(',', '')),
                description: itemCard.querySelector('.item-description').textContent,
                image: itemCard.closest('.gallery-item').querySelector('.gallery-item-img').src
            };
            addToCart(item);
        });
    }
});

// Check if we're on the checkout page
if (window.location.pathname.includes('checkout.html')) {
    // Checkout page functionality
    function updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total');
        
        if (!cartItems || !subtotalEl || !totalEl) return;
        
        cartItems.innerHTML = '';
        
        let sum = 0;
        cart.forEach((item, index) => {
            sum += item.price;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <button class="cart-item-remove" data-index="${index}"><i class="fas fa-times"></i></button>
            `;
            cartItems.appendChild(itemElement);
        });
        
        const shipping = 15.00;
        subtotalEl.textContent = `$${sum.toFixed(2)}`;
        totalEl.textContent = `$${(sum + shipping).toFixed(2)}`;
        
        // Add remove item functionality
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                sessionStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                updateCartCount();
            });
        });
    }
    
    // Initialize checkout page
    if (cart.length > 0) {
        updateCartDisplay();
    }
    
    // Form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would process payment here
            // For this demo, we'll just show a success message
            showToast('Payment successful! Order confirmed.');
            
            // Clear cart after successful purchase
            setTimeout(() => {
                cart = [];
                sessionStorage.removeItem('cart');
                updateCartCount();
                window.location.href = 'index.html';
            }, 3000);
        });
    }
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Message sent successfully!');
        this.reset();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add styles for toast notifications
    const toastStyles = document.createElement('style');
    toastStyles.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--accent-light);
            color: #000;
            padding: 15px 30px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1000;
            opacity: 0;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        
        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        .cart-count {
            position: absolute;
            top: -8px;
            right: -8px;
            background: var(--accent-secondary);
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(toastStyles);
});