document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica para el cambio de estilo del Header al hacer scroll
    const header = document.getElementById('main-header');
    if (header) {
        const scrollThreshold = 50; // Píxeles para activar el cambio

        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                // Añade clases para el fondo con blur y borde
                header.classList.add('bg-brand-bg/70', 'backdrop-blur-lg', 'border-b', 'border-brand-border');
            } else {
                // Remueve las clases cuando está en la parte superior
                header.classList.remove('bg-brand-bg/70', 'backdrop-blur-lg', 'border-b', 'border-brand-border');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Llama una vez al cargar por si la página se recarga en una posición scrolleada
        handleScroll();
    }

    // 2. Lógica para el menú móvil (off-canvas)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        // Abrir menú
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Evita el scroll del body cuando el menú está abierto
        });

        // Cerrar menú
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = ''; // Restaura el scroll del body
        });

        // Opcional: cerrar menú si se hace clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Inicialización de AOS (Animate On Scroll)
    // Se inicializa con valores por defecto. Se pueden añadir opciones si es necesario.
    // https://github.com/michalsnik/aos
    AOS.init({
        duration: 700, // Duración de la animación en ms
        once: true, // Si la animación debe ocurrir solo una vez
        offset: 50, // Distancia desde el borde para disparar la animación
    });

});
