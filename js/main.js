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
    AOS.init({
        duration: 700,
        once: true,
        offset: 50,
    });

    // 4. Lógica para el botón de volver en páginas de servicio
    const backButton = document.getElementById('back-button');
    if (backButton) {
        const scrollThreshold = 50;

        const handleBackButtonScroll = () => {
            if (window.scrollY > scrollThreshold) {
                backButton.classList.add('opacity-0', 'transform', '-translate-y-12');
            } else {
                backButton.classList.remove('opacity-0', 'transform', '-translate-y-12');
            }
        };

        window.addEventListener('scroll', handleBackButtonScroll);
        handleBackButtonScroll();
    }

    // 5. Lógica para el botón de scroll-to-top
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        const scrollThreshold = 300;

        const handleScrollToTopButton = () => {
            if (window.scrollY > scrollThreshold) {
                scrollToTopButton.classList.remove('hidden');
                scrollToTopButton.classList.add('flex');
            } else {
                scrollToTopButton.classList.add('hidden');
                scrollToTopButton.classList.remove('flex');
            }
        };

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', handleScrollToTopButton);
        handleScrollToTopButton();
    }
});
