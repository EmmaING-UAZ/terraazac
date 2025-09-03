document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const slide = document.querySelector('.slide');
    const items = document.querySelectorAll('.item');

    if (!nextButton || !prevButton || !slide || items.length === 0) {
        console.error('Slider elements not found');
        return;
    }

    let currentIndex = 0;

    function updateActiveItem() {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        const offset = -currentIndex * (items[0].offsetWidth + 20); // Ancho del item + margen
        slide.style.transform = `translateX(${offset}px)`;
    }

    function nextSlide() {
        const items = document.querySelectorAll('.item');
        slide.appendChild(items[0]);
        updateActiveItem();
    }

    function prevSlide() {
        const items = document.querySelectorAll('.item');
        slide.prepend(items[items.length - 1]);
        updateActiveItem();
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // --- Swipe Functionality for Mobile ---
    let startX = 0;
    let endX = 0;

    slide.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slide.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slide.addEventListener('touchend', () => {
        // Check if swipe is significant
        if (startX - endX > 50) {
            nextSlide();
        } else if (endX - startX > 50) {
            prevSlide();
        }
        // Reset values
        startX = 0;
        endX = 0;
    });

    // Initialize the slider
    updateActiveItem();
});
