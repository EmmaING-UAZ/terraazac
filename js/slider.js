document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const slide = document.querySelector('.slide');

    if (!nextButton || !prevButton || !slide) {
        console.error('Slider elements not found. Make sure .next, .prev, and .slide classes exist.');
        return;
    }

    const nextSlide = () => {
        const items = document.querySelectorAll('.item');
        if (items.length > 1) {
            slide.appendChild(items[0]);
        }
    };

    const prevSlide = () => {
        const items = document.querySelectorAll('.item');
        if (items.length > 1) {
            slide.prepend(items[items.length - 1]);
        }
    };

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // --- Swipe Functionality for Mobile ---
    let startX = 0;
    let endX = 0;

    slide.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    slide.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });

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
});
