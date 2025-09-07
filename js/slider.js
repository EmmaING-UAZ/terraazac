/**
 * Slider 3D de Tarjetas de Servicios
 *
 * Este script maneja la lógica para un carrusel 3D interactivo.
 * Permite la navegación a través de botones y gestos de swipe.
 * La animación se basa en la asignación de clases CSS que definen
 * la posición y el estado de cada tarjeta en el espacio 3D.
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const slide = document.querySelector('.slide');
    if (!slide) {
        console.error("El contenedor '.slide' no fue encontrado. El slider no puede inicializarse.");
        return;
    }

    const items = document.querySelectorAll('.item');
    const nextButton = document.querySelector('.slider-next');
    const prevButton = document.querySelector('.slider-prev');

    // Verificación de que todos los elementos necesarios existen
    if (items.length === 0 || !nextButton || !prevButton) {
        console.error("Faltan elementos esenciales para el slider (items, botones de navegación).");
        return;
    }

    // --- ESTADO DEL SLIDER ---
    let activeIndex = 0; // Índice de la tarjeta activa
    const totalItems = items.length;
    let touchStartX = 0; // Posición inicial del toque para swipe
    let touchEndX = 0;   // Posición final del toque para swipe

    /**
     * Función principal para actualizar las clases de las tarjetas.
     * Esta función es el corazón del slider. Asigna clases ('active', 'prev', 'next', etc.)
     * a cada tarjeta basándose en el índice activo actual.
     * El CSS se encarga de animar las transiciones entre estos estados.
     */
    function updateClasses() {
        items.forEach((item, i) => {
            // Limpiamos todas las clases de estado anteriores
            item.classList.remove('active', 'prev', 'next', 'prev-2', 'next-2', 'hide');

            // Calculamos la diferencia de índices para saber la posición relativa
            let diff = i - activeIndex;

            // Manejo del bucle infinito (wrapping)
            if (diff < -totalItems / 2) diff += totalItems;
            if (diff > totalItems / 2) diff -= totalItems;

            // Asignación de clases según la posición relativa
            switch (diff) {
                case 0:
                    item.classList.add('active');
                    break;
                case 1:
                    item.classList.add('next');
                    break;
                case 2:
                    item.classList.add('next-2');
                    break;
                case -1:
                    item.classList.add('prev');
                    break;
                case -2:
                    item.classList.add('prev-2');
                    break;
                default:
                    item.classList.add('hide'); // Las demás tarjetas se ocultan
                    break;
            }
        });
    }

    /**
     * Mueve el slider a la siguiente tarjeta.
     * Incrementa el índice activo y lo reinicia si llega al final (bucle).
     */
    function moveToNext() {
        activeIndex = (activeIndex + 1) % totalItems;
        updateClasses();
    }

    /**
     * Mueve el slider a la tarjeta anterior.
     * Decrementa el índice activo y lo ajusta si es menor que cero (bucle).
     */
    function moveToPrev() {
        activeIndex = (activeIndex - 1 + totalItems) % totalItems;
        updateClasses();
    }

    // --- EVENT LISTENERS PARA BOTONES ---
    nextButton.addEventListener('click', moveToNext);
    prevButton.addEventListener('click', moveToPrev);

    // --- LÓGICA PARA SWIPE EN PANTALLAS TÁCTILES ---

    // Registra la posición inicial del dedo
    slide.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true }); // passive: true para mejorar el rendimiento del scroll

    // Registra la posición final y decide la acción
    slide.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    /**
     * Analiza el gesto de swipe y mueve el slider.
     * Si el deslizamiento es suficientemente largo, se mueve a la tarjeta
     * siguiente o anterior.
     */
    function handleSwipe() {
        const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe

        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe hacia la izquierda (dedo se mueve de derecha a izquierda)
            moveToNext();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe hacia la derecha (dedo se mueve de izquierda a derecha)
            moveToPrev();
        }
    }

    // --- INICIALIZACIÓN ---
    // Llamamos a la función una vez al cargar para establecer el estado inicial.
    updateClasses();
});