document.addEventListener('DOMContentLoaded', function () {
    const nextButton = document.querySelector('.slider-next');
    const prevButton = document.querySelector('.slider-prev');
    const slide = document.querySelector('.slide');

    if (nextButton && prevButton && slide) {
        nextButton.addEventListener('click', () => {
            const items = slide.children;
            slide.appendChild(items[0]);
        });

        prevButton.addEventListener('click', () => {
            const items = slide.children;
            slide.prepend(items[items.length - 1]);
        });
    } else {
        console.error('No se encontraron los elementos del slider (botones o contenedor .slide).');
    }
});