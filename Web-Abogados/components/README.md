# Sistema de Navegación Estandarizado - Abogado Web

## Descripción

Este sistema proporciona una navegación y footer estandarizado para todas las páginas del sitio web del abogado Sergio Madriz Avendaño. Incluye:

- **Navbar superior uniforme** con logo, menú de navegación y versión móvil
- **Menú lateral deslizante** para dispositivos móviles con animaciones modernas
- **Footer completo** con información de contacto, redes sociales y enlaces rápidos
- **Diseño responsive** que se adapta a todos los tamaños de pantalla
- **Navegación accesible** con soporte para teclado y lectores de pantalla

## Estructura de Archivos

```
Web-Abogados/
├── components/
│   ├── navigation.css      # Estilos del sistema de navegación
│   ├── navigation.js       # JavaScript para funcionalidad del menú
│   ├── navbar.html         # HTML del navbar (componente)
│   ├── footer.html         # HTML del footer (componente)
│   └── base-template.html  # Template base para nuevas páginas
├── index.html              # Página principal
├── quien-soy.html          # Página actualizada con nuevo sistema
├── areas.html              # Página de áreas de práctica
├── ubicaciones.html        # Página de ubicaciones
├── contacto.html           # Página de contacto
└── Imagenes/              # Carpeta de imágenes
```

## Características del Sistema

### 🎨 Diseño Visual
- **Paleta de colores**: Azul oscuro (#1a2332), blanco (#ffffff), dorado (#c9a961)
- **Tipografía**: Inter (Google Fonts)
- **Estilo**: Moderno, profesional y elegante
- **Animaciones**: Transiciones suaves con CSS

### 📱 Menú Móvil
- **Tipo**: Menú lateral deslizante (off-canvas)
- **Activación**: Botón hamburguesa en la esquina superior derecha
- **Animación**: Desliza desde la derecha con overlay con blur
- **Cierre**: Click en overlay, botón X, o tecla Escape
- **Accesibilidad**: Navegación por teclado y atributos ARIA

### 🎯 Funcionalidades
- **Scroll dinámico**: Navbar cambia de apariencia al hacer scroll
- **Indicador de página activa**: Resalta automáticamente la página actual
- **Smooth scroll**: Desplazamiento suave para enlaces internos
- **Auto-cierre**: El menú móvil se cierra automáticamente al seleccionar un enlace

## Implementación

### 1. Para Actualizar Páginas Existentes

En cada página HTML, reemplaza el `<head>` con:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Título - Sergio Madriz Avendaño - Abogado</title>
    
    <!-- Estilos del sistema -->
    <link rel="stylesheet" href="components/navigation.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Estilos específicos de la página -->
    <style>
        /* Tus estilos personalizados aquí */
    </style>
</head>
```

### 2. Para el Navbar

Reemplaza tu navbar existente con:

```html
<!-- Navbar -->
<nav class="navbar" id="navbar">
    <div class="navbar-container">
        <!-- Logo -->
        <a href="index.html" class="navbar-logo">
            <div class="navbar-logo-icon">
                <i class="fas fa-balance-scale"></i>
            </div>
            <div class="navbar-logo-text">
                <span class="navbar-logo-name">Sergio Madriz</span>
                <span class="navbar-logo-title">Abogado & Notario</span>
            </div>
        </a>

        <!-- Menú Principal (Desktop) -->
        <ul class="navbar-menu">
            <li class="navbar-menu-item">
                <a href="index.html" class="navbar-menu-link">
                    <span>Inicio</span>
                </a>
            </li>
            <li class="navbar-menu-item">
                <a href="quien-soy.html" class="navbar-menu-link">
                    <span>Quién Soy</span>
                </a>
            </li>
            <li class="navbar-menu-item">
                <a href="areas.html" class="navbar-menu-link">
                    <span>Áreas</span>
                </a>
            </li>
            <li class="navbar-menu-item">
                <a href="ubicaciones.html" class="navbar-menu-link">
                    <span>Ubicaciones</span>
                </a>
            </li>
            <li class="navbar-menu-item">
                <a href="contacto.html" class="navbar-menu-link">
                    <span>Contacto</span>
                </a>
            </li>
        </ul>

        <!-- Botón de Menú Móvil -->
        <button class="navbar-toggle" aria-label="Abrir menú de navegación">
            <i class="fas fa-bars"></i>
        </button>
    </div>
</nav>

<!-- Menú Lateral Móvil -->
<div class="mobile-menu-overlay"></div>
<div class="mobile-menu">
    <div class="mobile-menu-header">
        <span class="mobile-menu-logo">Sergio Madriz</span>
        <button class="mobile-menu-close" aria-label="Cerrar menú">
            <i class="fas fa-times"></i>
        </button>
    </div>
    
    <nav class="mobile-menu-nav">
        <ul class="mobile-menu-list">
            <li class="mobile-menu-item">
                <a href="index.html" class="mobile-menu-link">
                    <i class="fas fa-home mobile-menu-icon"></i>
                    <span>Inicio</span>
                </a>
            </li>
            <li class="mobile-menu-item">
                <a href="quien-soy.html" class="mobile-menu-link">
                    <i class="fas fa-user-tie mobile-menu-icon"></i>
                    <span>Quién Soy</span>
                </a>
            </li>
            <li class="mobile-menu-item">
                <a href="areas.html" class="mobile-menu-link">
                    <i class="fas fa-briefcase mobile-menu-icon"></i>
                    <span>Áreas de Práctica</span>
                </a>
            </li>
            <li class="mobile-menu-item">
                <a href="ubicaciones.html" class="mobile-menu-link">
                    <i class="fas fa-map-marker-alt mobile-menu-icon"></i>
                    <span>Ubicaciones</span>
                </a>
            </li>
            <li class="mobile-menu-item">
                <a href="contacto.html" class="mobile-menu-link">
                    <i class="fas fa-envelope mobile-menu-icon"></i>
                    <span>Contacto</span>
                </a>
            </li>
        </ul>
    </nav>
</div>
```

### 3. Para el Footer

Reemplaza tu footer existente con el contenido del archivo `components/footer.html`.

### 4. Para los Scripts

Antes de cerrar el `</body>`, añade:

```html
<!-- Scripts -->
<script src="components/navigation.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
</script>
```

## Personalización

### Colores
Para cambiar los colores del sistema, modifica las variables CSS en `components/navigation.css`:

```css
:root {
    --primary-color: #1a2332;    /* Azul oscuro principal */
    --secondary-color: #2c3e50;  /* Azul secundario */
    --accent-color: #c9a961;     /* Dorado */
    --accent-light: #f4e9d1;     /* Dorado claro */
    --text-dark: #2c3e50;        /* Texto oscuro */
    --text-light: #7f8c8d;       /* Texto claro */
    --white: #ffffff;            /* Blanco */
    --light-bg: #f8fafc;         /* Fondo claro */
}
```

### Añadir Nuevas Páginas
1. Copia el archivo `components/base-template.html`
2. Reemplaza los placeholders `{{TITLE}}`, `{{CONTENT}}`, etc.
3. Añade la nueva página a los menús en navbar y footer

### Iconos
Para cambiar los iconos, reemplaza las clases de Font Awesome:
- `fas fa-home` - Inicio
- `fas fa-user-tie` - Quién Soy
- `fas fa-briefcase` - Áreas
- `fas fa-map-marker-alt` - Ubicaciones  
- `fas fa-envelope` - Contacto

## Soporte para Navegadores

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Internet Explorer**: No soportado

## Optimización

### Performance
- CSS minificado para producción
- Fuentes optimizadas con `font-display: swap`
- Imágenes con lazy loading
- Scripts defer/async donde sea posible

### SEO
- Meta tags optimizados
- Estructura semántica HTML5
- Enlaces internos bien estructurados
- Breadcrumbs implementados

### Accesibilidad
- Navegación por teclado
- Atributos ARIA
- Contraste de colores WCAG AA
- Texto alternativo para imágenes
- Focus visible en elementos interactivos

## Troubleshooting

### Problemas Comunes

1. **El menú móvil no se abre**
   - Verifica que `navigation.js` esté cargado
   - Revisa la consola del navegador para errores

2. **Estilos no se aplican**
   - Confirma que `navigation.css` esté enlazado correctamente
   - Verifica que no haya conflictos con otros CSS

3. **Navegación activa no funciona**
   - Asegúrate de que los nombres de archivos coincidan exactamente
   - Verifica que el JavaScript esté funcionando

### Depuración
- Abre las herramientas de desarrollo (F12)
- Revisa la consola para errores JavaScript
- Verifica que todos los archivos se carguen correctamente en la pestaña Network

## Actualizaciones

Para futuras actualizaciones:
1. Respalda tus archivos personalizados
2. Actualiza los archivos del sistema
3. Verifica que la personalización siga funcionando
4. Prueba en diferentes dispositivos

## Créditos

- **Desarrollado por**: GitHub Copilot
- **Iconos**: Font Awesome
- **Fuentes**: Google Fonts (Inter)
- **Animaciones**: AOS (Animate On Scroll)

---

¿Necesitas ayuda con la implementación? Crea un issue en el repositorio o contacta al desarrollador.
