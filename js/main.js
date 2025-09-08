document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('main-header');
    const mobileMenu = document.getElementById('mobile-menu');
    const scrollThreshold = 50;

    // Función para manejar el estado visual del header
    const handleHeaderStyle = () => {
        if (!header) return;

        const isMenuOpen = mobileMenu && !mobileMenu.classList.contains('hidden');

        if (window.scrollY > scrollThreshold || isMenuOpen) {
            header.classList.add('bg-brand-bg/70', 'backdrop-blur-lg', 'border-b', 'border-brand-border');
        } else {
            header.classList.remove('bg-brand-bg/70', 'backdrop-blur-lg', 'border-b', 'border-brand-border');
        }
    };

    // 1. Lógica para el cambio de estilo del Header al hacer scroll
    if (header) {
        window.addEventListener('scroll', handleHeaderStyle);
        // Llama una vez al cargar para establecer el estado inicial
        handleHeaderStyle();
    }

    // 2. Lógica para el menú móvil (off-canvas)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');

    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            handleHeaderStyle(); // Asegura que el header tenga fondo al abrir el menú
        };

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            handleHeaderStyle(); // Re-evalúa el estilo del header al cerrar
        };

        mobileMenuButton.addEventListener('click', openMenu);
        closeMobileMenuButton.addEventListener('click', closeMenu);

        // Opcional: cerrar menú si se hace clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
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
