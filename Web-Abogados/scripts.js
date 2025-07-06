// scripts.js
// Manejo de animación y cierre de menú hamburguesa en móvil para Bootstrap

document.addEventListener('DOMContentLoaded', function () {
    // Cierra el menú al hacer click en un enlace (solo móvil)
    var mainMenu = document.getElementById('mainMenu');
    var toggler = document.querySelector('.navbar-toggler');
    if (mainMenu && toggler) {
        mainMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 800 && mainMenu.classList.contains('show')) {
                    toggler.click();
                }
            });
        });
    }
    // Opcional: Cierra el menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 800 && mainMenu && toggler) {
            if (mainMenu.classList.contains('show') && !mainMenu.contains(e.target) && !toggler.contains(e.target)) {
                toggler.click();
            }
        }
    });

    // Animaciones solo al hacer scroll (no en carga inicial)
    const animatedTexts = document.querySelectorAll('.area-card, .welcome-content h1, h1, h2, h3, h4, h5, h6, p, .areas-title, .blog-title, .welcome-text, .hero-content h1, .hero-content p, .contact-form-container h2, .form-group label');
    animatedTexts.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        el.dataset.animated = 'false';
    });

    function animateOnScroll() {
        animatedTexts.forEach((el, i) => {
            if (el.dataset.animated === 'true') return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.style.transition = 'opacity 0.7s cubic-bezier(.4,1.4,.7,1), transform 0.7s cubic-bezier(.4,1.4,.7,1)';
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
                el.dataset.animated = 'true';
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    // Llamar una vez por si ya hay elementos en viewport
    animateOnScroll();

    // Efecto hover para las tarjetas
    const areaCards = document.querySelectorAll('.area-card');
    areaCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.25s, transform 0.25s';
            card.style.boxShadow = '0 8px 32px rgba(30,80,158,0.18)';
            card.style.transform = 'translateY(-8px) scale(1.03)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
            card.style.transform = 'translateY(0)';
        });
    });

    // Pulse en títulos de sección al hacer scroll
    const sectionTitles = document.querySelectorAll('.areas-title, .blog-title, .contact-form-container h2');
    window.addEventListener('scroll', () => {
        sectionTitles.forEach(title => {
            const rect = title.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                title.style.animation = 'pulseTitle 1.2s cubic-bezier(.4,1.4,.7,1)';
                setTimeout(() => { title.style.animation = ''; }, 1200);
            }
        });
    });
});

// Animación keyframes para pulse
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulseTitle {
  0% { color: #1a2236; letter-spacing: 0px; }
  40% { color: #18aee4; letter-spacing: 2px; }
  100% { color: #1a2236; letter-spacing: 0px; }
}`;
document.head.appendChild(style);
