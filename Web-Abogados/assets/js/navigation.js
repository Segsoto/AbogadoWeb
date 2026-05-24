// ===== SISTEMA DE NAVEGACIÓN ESTANDARIZADO =====

class NavigationSystem {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.mobileMenuToggle = document.querySelector('.navbar-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
        this.mobileMenuClose = document.querySelector('.mobile-menu-close');
        this.currentPage = this.getCurrentPage();
        
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setActiveMenuItem();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
    }

    // Detectar la página actual
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }

    // Efecto de scroll en navbar
    setupScrollEffect() {
        if (!this.navbar) return;

        let lastScrollY = window.scrollY;
        let isScrolling = false;

        const handleScroll = () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    // Agregar clase scrolled cuando se hace scroll
                    if (currentScrollY > 50) {
                        this.navbar.classList.add('scrolled');
                    } else {
                        this.navbar.classList.remove('scrolled');
                    }

                    // Ocultar/mostrar navbar en scroll (opcional)
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        this.navbar.style.transform = 'translateY(-100%)';
                    } else {
                        this.navbar.style.transform = 'translateY(0)';
                    }

                    lastScrollY = currentScrollY;
                    isScrolling = false;
                });
            }
            isScrolling = true;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Configurar menú móvil
    setupMobileMenu() {
        if (!this.mobileMenuToggle || !this.mobileMenu) return;

        // Abrir menú móvil
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.openMobileMenu();
        });

        // Cerrar menú móvil
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeMobileMenu();
            });
        }

        // Cerrar al hacer click en overlay
        if (this.mobileMenuOverlay) {
            this.mobileMenuOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Cerrar al hacer click en un enlace
        const mobileMenuLinks = this.mobileMenu.querySelectorAll('.mobile-menu-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu.classList.contains('open')) {
                this.closeMobileMenu();
            }
        });
    }

    // Abrir menú móvil
    openMobileMenu() {
        this.mobileMenu.classList.add('open');
        this.mobileMenuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Focus en el primer enlace del menú
        const firstLink = this.mobileMenu.querySelector('.mobile-menu-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 300);
        }
    }

    // Cerrar menú móvil
    closeMobileMenu() {
        this.mobileMenu.classList.remove('open');
        this.mobileMenuOverlay.classList.remove('open');
        document.body.style.overflow = '';
        
        // Devolver focus al botón de menú
        this.mobileMenuToggle.focus();
    }

    // Marcar elemento activo del menú
    setActiveMenuItem() {
        const menuLinks = document.querySelectorAll('.navbar-menu-link, .mobile-menu-link');
        
        menuLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkPage = href.replace('.html', '').replace('./', '');
                if (linkPage === this.currentPage || 
                    (linkPage === 'index' && this.currentPage === '') ||
                    (linkPage === '' && this.currentPage === 'index')) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Configurar navegación por teclado
    setupKeyboardNavigation() {
        const menuLinks = document.querySelectorAll('.navbar-menu-link');
        
        menuLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = e.key === 'ArrowRight' ? 
                        (index + 1) % menuLinks.length : 
                        (index - 1 + menuLinks.length) % menuLinks.length;
                    menuLinks[nextIndex].focus();
                }
            });
        });
    }

    // Configurar accesibilidad
    setupAccessibility() {
        // Agregar atributos ARIA
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
            this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }

        if (this.mobileMenu) {
            this.mobileMenu.setAttribute('aria-label', 'Menú de navegación principal');
        }

        // Actualizar aria-expanded
        this.mobileMenuToggle?.addEventListener('click', () => {
            const isOpen = this.mobileMenu.classList.contains('open');
            this.mobileMenuToggle.setAttribute('aria-expanded', isOpen.toString());
        });
    }

    // Método público para cerrar el menú
    close() {
        this.closeMobileMenu();
    }

    // Método público para abrir el menú
    open() {
        this.openMobileMenu();
    }
}

// Inicializar el sistema de navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.navigationSystem = new NavigationSystem();
});

// Utilidades adicionales
const NavigationUtils = {
    // Smooth scroll para enlaces internos
    initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Ajustar por navbar fijo
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Resaltar sección actual en scroll
    highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-menu-link[href^="#"]');
        
        if (sections.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
};

// Inicializar utilidades adicionales
document.addEventListener('DOMContentLoaded', () => {
    NavigationUtils.initSmoothScroll();
    NavigationUtils.highlightCurrentSection();
});
