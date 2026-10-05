document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Navigation Highlight ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        themeToggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
    } else {
        htmlElement.classList.remove('dark');
        themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="bi bi-moon-stars"></i>';
        }
    });

    // --- Mobile Menu ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    let isMenuOpen = false;

    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('-translate-y-full');
            mobileMenuBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
        } else {
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
            isMenuOpen = false;
        });
    });

    // --- Toast Notification & Add to Cart ---
    const toast = document.getElementById('toast');
    const cartBtns = document.querySelectorAll('.add-to-cart');
    let cartCount = 0;
    const cartBadge = document.querySelector('#cartBtn span');

    cartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Show toast
            toast.classList.remove('translate-x-full', 'opacity-0');
            
            // Update cart count
            cartCount++;
            cartBadge.textContent = cartCount;
            
            // Animate button temporarily
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-check2"></i> Added';
            btn.classList.add('bg-earthy', 'text-white');
            
            setTimeout(() => {
                toast.classList.add('translate-x-full', 'opacity-0');
            }, 3000);
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-earthy', 'text-white');
            }, 2000);
        });
    });

    // --- Cart Drawer ---
    const cartBtn = document.getElementById('cartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartPanel = document.getElementById('cartPanel');

    function openCart() {
        cartDrawer.classList.remove('pointer-events-none');
        cartOverlay.classList.remove('opacity-0');
        cartPanel.classList.remove('translate-x-full');
    }

    function closeCart() {
        cartOverlay.classList.add('opacity-0');
        cartPanel.classList.add('translate-x-full');
        setTimeout(() => {
            cartDrawer.classList.add('pointer-events-none');
        }, 300);
    }

    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // --- Auth Modal ---
    const authBtn = document.getElementById('authBtn');
    const mobileAuthBtn = document.getElementById('mobileAuthBtn');
    const closeAuthBtn = document.getElementById('closeAuthBtn');
    const authModal = document.getElementById('authModal');
    const authOverlay = document.getElementById('authOverlay');
    const authPanel = document.getElementById('authPanel');

    function openAuth() {
        authModal.classList.remove('hidden');
        // small delay for transition
        setTimeout(() => {
            authPanel.classList.remove('scale-95', 'opacity-0');
        }, 10);
    }

    function closeAuth() {
        authPanel.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            authModal.classList.add('hidden');
        }, 300);
    }

    authBtn.addEventListener('click', openAuth);
    mobileAuthBtn.addEventListener('click', () => {
        mobileMenu.classList.add('-translate-y-full');
        mobileMenuBtn.innerHTML = '<i class="bi bi-list"></i>';
        isMenuOpen = false;
        openAuth();
    });
    closeAuthBtn.addEventListener('click', closeAuth);
    authOverlay.addEventListener('click', closeAuth);

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const content = item.querySelector('.faq-content');
        
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
                otherItem.querySelector('.faq-content').classList.add('hidden');
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                content.classList.remove('hidden');
            }
        });
    });


    
});
