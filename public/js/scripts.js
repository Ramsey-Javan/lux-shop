// Initialize Particles.js background
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles if element exists
    if (document.getElementById('particles-js')) {
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
    }

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
        } else {
            modeIcon.classList.remove('fa-sun');
            modeIcon.classList.add('fa-moon');
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

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

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
        
        // Initialize first slide
        showSlide(0);
        
        // Auto-rotate testimonials
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        }, 5000);
    }

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        // Set up categories
        const categories = {};
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (category) {
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push(item);
            }
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    item.style.display = 'none';
                    setTimeout(() => {
                        item.style.opacity = '0.5';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 300);
                    }, 10);
                });
                
                if (filterValue === 'all') {
                    galleryItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else if (categories[filterValue]) {
                    categories[filterValue].forEach(item => {
                        item.style.display = 'block';
                    });
                }
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
        // Add ripple effect to buttons
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                let ripples = document.createElement('span');
                ripples.className = 'ripple';
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

    // Shopping Cart
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartIcon = document.querySelector('.fa-shopping-bag')?.closest('a');

    if (cartIcon) {
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
        
        // Remove existing count if present
        const existingCount = cartIcon.querySelector('.cart-count');
        if (existingCount) existingCount.remove();
        
        if (cart.length > 0) {
            const cartCount = document.createElement('span');
            cartCount.className = 'cart-count';
            cartCount.textContent = cart.length;
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
                    image: itemCard.closest('.gallery-item').querySelector('.gallery-item-img').src,
                    category: itemCard.closest('.gallery-item').getAttribute('data-category')
                };
                addToCart(item);
            });
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Message sent successfully!');
            this.reset();
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('.newsletter-input');
            if (input.value) {
                showToast('Thank you for subscribing!');
                input.value = '';
            }
        });
    }

    // Add styles for toast notifications and cart count
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--accent);
            color: #000;
            padding: 15px 30px;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
            font-weight: 600;
            text-align: center;
            max-width: 90%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(dynamicStyles);
});