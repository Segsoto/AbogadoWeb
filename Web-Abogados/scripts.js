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
});
